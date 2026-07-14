import React, { useState } from 'react';
import ArtGallery from './components/ArtGallery';
import ArtworkDetailView from './components/ArtworkDetailView';
import './App.css';

function App() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  return (
    <div className="app">
      {selectedArtwork ? (
        <ArtworkDetailView
          artwork={selectedArtwork}
          onBack={() => setSelectedArtwork(null)}
        />
      ) : (
        <ArtGallery onSelectArt={setSelectedArtwork} />
      )}
    </div>
  );
}

export default App;
