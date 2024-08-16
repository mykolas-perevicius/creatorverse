import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, mockCreators } from '../client';
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
    if (error) {
      console.log('error', error);
      setCreators(mockCreators);
    } else {
      setCreators(data.length > 0 ? data : mockCreators);
    }
    console.log('Fetched creators:', creators);
  }

  return (
    <div>
      <h1>All Creators</h1>
      <Link to="/add">Add New Creator</Link>
      <div className="creator-grid">
        {creators.map(creator => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </div>
  );
};

export default ShowCreators;