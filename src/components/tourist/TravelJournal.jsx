// src/components/tourist/TravelJournal.jsx
import React, { useState, useEffect } from 'react';

const TravelJournal = () => {
  const [entry, setEntry] = useState(() => {
    // Load saved entry from localStorage on initial render
    return localStorage.getItem('travelJournalEntry') || '';
  });

  // Save the entry to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('travelJournalEntry', entry);
  }, [entry]);

  return (
    <div className="ai-feature-card">
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write down your thoughts, memories, and experiences from your trip..."
        rows="8"
        className="journal-textarea"
      />
      <p className="save-status">Your entry is saved automatically.</p>
    </div>
  );
};
export default TravelJournal;