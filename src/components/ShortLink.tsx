import React, { useState } from 'react';

interface ShortLinkProps {
  shortLink: string;
}

const ShortLink: React.FC<ShortLinkProps> = ({ shortLink }) => {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(shortLink)
      .then(() => {
        setCopied(true);
        console.log('Link copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying link to clipboard:', error);
      });
  };

  return (
    <div className="short-link-container">
      <p className="short-link">
        Short Link:
        <span className="short-link-url">
          {shortLink}
        </span>
        <button className="copy-button" onClick={copyLink} disabled={copied}>
          {copied ? 'Copied' : 'Copy Link'}
        </button>
      </p>
    </div>
  );
};

export default ShortLink;
