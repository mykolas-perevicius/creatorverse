import React from 'react';
import { Link } from 'react-router-dom';

const CreatorCard = ({ creator }) => {
  return (
    <article className="creator-card">
      <div className="image-container">
        {creator.imageURL && (
          <img 
            src={creator.imageURL} 
            alt={creator.name} 
          />
        )}
      </div>
      <div className="content">
        <h3>{creator.name}</h3>
        <p className="description">{creator.description}</p>
        <footer>
          <a href={creator.url} target="_blank" rel="noopener noreferrer" role="button" className="secondary">Visit</a>
          <Link to={`/view/${creator.id}`} role="button">View</Link>
          <Link to={`/edit/${creator.id}`} role="button" className="contrast">Edit</Link>
        </footer>
      </div>
    </article>
  );
};

export default CreatorCard;