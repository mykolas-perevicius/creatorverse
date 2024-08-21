import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreators();
  }, []);

  async function fetchCreators() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('creators')
        .select('*');
      if (error) throw error;
      setCreators(data || []);
    } catch (error) {
      console.error('Error fetching creators:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading creators...</div>;

  return (
    <div>
      <h1>All Creators</h1>
      <Link to="/add">Add New Creator</Link>
      {creators.length === 0 ? (
        <p>No content creators found. Be the first to add one!</p>
      ) : (
        <div className="creator-grid">
          {creators.map(creator => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCreators;