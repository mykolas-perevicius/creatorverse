import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const AddCreator = () => {
  const [creator, setCreator] = useState({ name: '', url: '', description: '', imageURL: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCreator({ ...creator, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting new creator:', creator);
    const { data, error } = await supabase
      .from('creators')
      .insert([creator])
      .select();
    if (error) console.log('error', error);
    else {
      console.log('New creator added successfully');
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={creator.name} onChange={handleChange} placeholder="Name" required />
      <input name="url" value={creator.url} onChange={handleChange} placeholder="URL" required />
      <textarea name="description" value={creator.description} onChange={handleChange} placeholder="Description" required />
      <input name="imageURL" value={creator.imageURL} onChange={handleChange} placeholder="Image URL" />
      <button type="submit">Add Creator</button>
    </form>
  );
};

export default AddCreator;