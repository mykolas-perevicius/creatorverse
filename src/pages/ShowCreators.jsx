import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    fetchCreators();
  }, []);

  async function fetchCreators() {
    const { data, error } = await supabase
      .from('creators')
      .select('*');
    if (error) console.log('error', error);
    else setCreators(data);
  }

  return (
    <main className="container">
      <div className="header-content">
        <h1>Creatorverse</h1>
        <Link to="/add" role="button" className="add-creator-button">Add New Creator</Link>
      </div>
      <div className="creators-grid">
        {creators.map(creator => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </main>
  );
};

export default ShowCreators;