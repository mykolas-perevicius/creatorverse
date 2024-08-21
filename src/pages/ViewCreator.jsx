import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
  const [creator, setCreator] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data);
      }
    };

    fetchCreator();
  }, [id]);

  if (!creator) return <div className="container">Loading...</div>;

  return (
    <main className="container">
      <article className="creator-view">
        <header>
          <h1>{creator.name}</h1>
        </header>
        <div className="image-container">
          {creator.imageURL && (
            <img 
              src={creator.imageURL} 
              alt={creator.name} 
            />
          )}
        </div>
        <p className="description">{creator.description}</p>
        <footer>
          <a 
            href={creator.url} 
            target="_blank" 
            rel="noopener noreferrer"
            role="button"
            className="secondary"
          >
            Visit Channel
          </a>
          <Link to={`/edit/${creator.id}`} role="button">Edit</Link>
          <Link to="/" role="button" className="contrast">Back to All Creators</Link>
        </footer>
      </article>
    </main>
  );
};

export default ViewCreator;