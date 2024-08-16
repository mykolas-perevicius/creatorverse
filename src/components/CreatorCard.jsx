import React from 'react';
import { Link } from 'react-router-dom';

const CreatorCard = ({ creator }) => {
  return (
    <div className="creator-card">
      {creator.imageURL && <img src={creator.imageURL} alt={creator.name} />}
      <h2>{creator.name}</h2>
      <p>{creator.description}</p>
      <a href={creator.url} target="_blank" rel="noopener noreferrer">Visit Channel</a>
      <Link to={`/view/${creator.id}`}>View Details</Link>
    </div>
  );
};

export default CreatorCard;