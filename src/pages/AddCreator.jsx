import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

const AddCreator = () => {
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCreator({ ...creator, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('creators')
      .insert([creator])
      .select();

    if (error) {
      console.error('Error adding creator:', error);
    } else {
      navigate('/');
    }
  };

  return (
    <main className="container">
      <h1>Add New Creator</h1>
      <form onSubmit={handleSubmit} className="creator-form">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={creator.name} onChange={handleChange} required />
        
        <label htmlFor="url">URL</label>
        <input id="url" name="url" value={creator.url} onChange={handleChange} required />
        
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={creator.description} onChange={handleChange} required />
        
        <label htmlFor="imageURL">Image URL</label>
        <input id="imageURL" name="imageURL" value={creator.imageURL} onChange={handleChange} />
        
        <div className="button-group">
          <button type="submit">Add Creator</button>
          <Link to="/" role="button" className="contrast">Cancel</Link>
        </div>
      </form>
    </main>
  );
};

export default AddCreator;