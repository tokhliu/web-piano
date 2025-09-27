
import React from 'react';
import { PianoKeyData } from '../types';

interface PianoKeyProps {
  keyData: PianoKeyData;
  onPlayNote: (frequency: number) => void;
}

const PianoKey: React.FC<PianoKeyProps> = ({ keyData, onPlayNote }) => {
  const { note, type, frequency } = keyData;

  const baseWhiteKeyClasses = 'flex items-end justify-center h-56 w-12 p-2 rounded-b-lg border-2 border-t-0 border-gray-900 bg-white shadow-lg transform transition-transform duration-75 ease-in-out cursor-pointer';
  const activeWhiteKeyClasses = 'hover:bg-gray-100 active:bg-gray-300 active:scale-[0.98]';
  
  const baseBlackKeyClasses = 'flex items-end justify-center h-36 w-8 rounded-b-md border-2 border-gray-900 bg-gray-800 shadow-xl transform transition-transform duration-75 ease-in-out cursor-pointer';
  const activeBlackKeyClasses = 'hover:bg-gray-700 active:bg-gray-600 active:scale-[0.97]';

  if (type === 'white') {
    return (
      <button
        onMouseDown={() => onPlayNote(frequency)}
        className={`${baseWhiteKeyClasses} ${activeWhiteKeyClasses}`}
        aria-label={`Play note ${note}`}
      >
        <span className="text-gray-600 font-semibold">{note}</span>
      </button>
    );
  }

  return (
    <button
      onMouseDown={() => onPlayNote(frequency)}
      className={`${baseBlackKeyClasses} ${activeBlackKeyClasses}`}
      aria-label={`Play note ${note}`}
    >
        <span className="text-white font-semibold text-xs pb-1">{note}</span>
    </button>
  );
};

export default PianoKey;