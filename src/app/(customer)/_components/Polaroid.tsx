import React from 'react';

interface PolaroidProps {
  imageUrl: string;
  rotation?: number;
}

const Polaroid: React.FC<PolaroidProps> = ({ imageUrl, rotation = 0 }) => {
  return (
    <div className="relative inline-block rounded-md transform rotate-3 shadow-lg overflow-hidden" style={{rotate: `${rotation}deg`, marginRight: '-6rem' }}>
      <img src={imageUrl} alt="Polaroid" className="block rounded-md" style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }} />
    </div>
  );
};

export default Polaroid;
