
import React from 'react';
import Piano from './components/Piano';

const App: React.FC = () => {
  return (
    <main className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          React Web Piano
        </h1>
        <p className="text-gray-400 mt-2">Click the keys to play notes from F2 to E5.</p>
        <p className="text-gray-500 mt-2 text-sm md:hidden">Scroll horizontally to see all keys.</p>
      </div>
      
      <Piano />

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
        <p>Powered by the Web Audio API.</p>
      </footer>
    </main>
  );
};

export default App;