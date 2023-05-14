import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

interface LinkFormProps {
  onShortLinkGenerated: (shortLink: string) => void;
}

const LinkForm: React.FC<LinkFormProps> = ({ onShortLinkGenerated }) => {
  const [videoLink, setVideoLink] = useState<string>('');

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoLink(event.target.value);
  };

  const generateShortLink = () => {
    if (validateVideoLink(videoLink)) {
      const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

      sendLinkToBackend(videoLink, expirationDate);

    } else {
      // Handle invalid link case
      alert('Invalid video link!');
    }
  };

  const validateVideoLink = (link: string): boolean => {
    return link.includes('youtube.com') || link.includes('coursera.org');
  };

  const sendLinkToBackend = (videoLongLink: string, expirationDate: Date) => {
    const data = {
      videoLongLink,
      expirationDate: expirationDate.toISOString(),
    };

    axios.post(`${apiUrl}/generate`, data)
      .then((response) => {
        console.log('Link sent to backend successfully!', response.data.videoShortLink);
        onShortLinkGenerated(response.data.videoShortLink);
      })
      .catch((error) => {
        console.error('Error sending link to backend:', error);
      });
  };

  return (
    <div>
      <h1>Video Link Generator</h1>
      <input type="text" value={videoLink} onChange={handleLinkChange} />
      <button onClick={generateShortLink}>Generate Short Link</button>
    </div>
  );
};

export default LinkForm;
