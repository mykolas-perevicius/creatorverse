import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CreatorCard = ({ creator }) => {
  return (
    <div className="creator-card">
      {creator.imageURL && (
        <img src={creator.imageURL} alt={creator.name} className="creator-image" />
      )}
      <h2>{creator.name}</h2>
      <p>{creator.description}</p>
      <a href={creator.url} target="_blank" rel="noopener noreferrer">Visit Channel</a>
      <Link to={`/view/${creator.id}`}>View Details</Link>
    </div>
  );
};

CreatorCard.propTypes = {
  creator: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string
  }).isRequired
};

export default CreatorCard;