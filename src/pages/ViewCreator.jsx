import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase, mockCreators } from '../client';

const ViewCreator = () => {
  const [creator, setCreator] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCreator();
  }, [id]);

  async function fetchCreator() {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      setCreator(data);
    } catch (error) {
      console.error('Error fetching creator:', error);
      setCreator(mockCreators.find(c => c.id === parseInt(id)));
    }
    console.log('Fetched creator:', creator);
  }

  async function deleteCreator() {
    if (window.confirm('Are you sure you want to delete this creator?')) {
      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id);
      if (error) console.log('error', error);
      else {
        console.log('Creator deleted');
        navigate('/');
      }
    }
  }

  if (!creator) return <div>Loading...</div>;

  return (
    <div>
      <h1>{creator.name}</h1>
      {creator.imageURL && <img src={creator.imageURL} alt={creator.name} />}
      <p>{creator.description}</p>
      <a href={creator.url} target="_blank" rel="noopener noreferrer">Visit Channel</a>
      <Link to={`/edit/${creator.id}`}>Edit</Link>
      <button onClick={deleteCreator}>Delete</button>
      <Link to="/">Back to All Creators</Link>
    </div>
  );
};

export default ViewCreator;