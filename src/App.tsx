import React, { useState, useEffect } from 'react';
import ShortLink from './components/ShortLink';
import LinkForm from './components/LinkForm';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './config/firebase';
import './assets/App.css';

const apiUrl = process.env.REACT_APP_API_URL;

const App: React.FC = () => {
  const [shortLink, setShortLink] = useState<string>('');
  const [redirectLink, setRedirectLink] = useState<string>('');

  const handleShortLinkGenerated = (link: string) => {
    setShortLink(link);
  };

  useEffect(() => {
    const fetchVideoUrl = async (shortID: string) => {
      const docRef = doc(db, 'links', `${shortID}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        try {
          const response = await fetch(`${apiUrl}/download?URL=${encodeURIComponent(data.videoLongLink)}`);
          if (response.ok) {
            const videoUrl = await response.json();
            // Start the download automatically
            const link = document.createElement('a');
            link.href = videoUrl.data.href;
            link.download = 'video.mp4';
            link.target = '_blank'; // Open in a new tab
            link.click();

            setRedirectLink(data.videoLongLink);
          } else {
            console.log('Failed to fetch video URL:', response.status);
          }
        } catch (error) {
          console.error('Error fetching video URL:', error);
        }
      } else {
        console.log('Document does not exist');
      }
    };

    const handlePathname = () => {
      const shortID = window.location.pathname.split('/').pop() || '';
      if (shortID) {
        fetchVideoUrl(shortID);
      }
    };

    handlePathname();
  }, []);

  useEffect(() => {
    if (redirectLink) {
      window.location.href = redirectLink;
    }
  }, [redirectLink]);

  return (
    <div className='container'>
      <LinkForm onShortLinkGenerated={handleShortLinkGenerated} />
      {shortLink && <ShortLink shortLink={shortLink} />}
    </div>
  );
};

export default App;
