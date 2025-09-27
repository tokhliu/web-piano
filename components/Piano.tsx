
import React from 'react';
import { PIANO_KEYS } from '../constants';
import { playNote } from '../services/audioService';
import PianoKey from './PianoKey';

const Piano: React.FC = () => {
  const handlePlayNote = (frequency: number) => {
    playNote(frequency);
  };

  return (
    <div className="w-full max-w-6xl mx-auto overflow-x-auto rounded-xl shadow-2xl bg-gradient-to-b from-gray-800 to-gray-900 border-t-4 border-red-800">
      <div className="relative flex w-max mx-auto p-4">
        {PIANO_KEYS.filter(k => k.type === 'white').map((key) => {
          const keyIndex = PIANO_KEYS.findIndex(k => k.note === key.note);
          const nextKey = PIANO_KEYS[keyIndex + 1];

          return (
            <div key={key.note} className="relative">
              <PianoKey keyData={key} onPlayNote={handlePlayNote} />
              {nextKey?.type === 'black' && (
                <div className="absolute top-0 left-full -translate-x-1/2 z-10">
                   <PianoKey 
                    keyData={nextKey} 
                    onPlayNote={handlePlayNote} 
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Piano;