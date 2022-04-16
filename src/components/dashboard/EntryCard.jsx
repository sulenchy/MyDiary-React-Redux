import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function EntryCard({ data }) {
  return (
    <Link to={`/entries?group=${data.entry[0]}`} className="entrygroup">
      <div className="card row-entry">
        <div className="day">
          <h2>{data.entry[0]}</h2>
        </div>
        <div className="entry">
          <h2>
            {data.entry[1].length}
            {' '}
            entry
          </h2>
        </div>
      </div>
    </Link>
  );
}

EntryCard.propTypes = {
  data: PropTypes.object.isRequired
};

export default EntryCard;
