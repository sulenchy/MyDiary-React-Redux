import React from 'react';
import EntryCard from './EntryCard';

function Entries({ entries }) {
  return (
    <>
      <div className="container">
        <h2>Entries in Days</h2>
        <input type="text" className="input-field" id="search" placeholder="Search by date" name="search" />
        {entries.map((entry) => {
          const { length } = entry;
          const entryDetail = { length, entry };
          return <EntryCard key={entry} data={entryDetail} />;
        })}
      </div>
    </>
  );
}

export default Entries;
