import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase, mockCreators } from '../client';

const EditCreator = () => {
  const [creator, setCreator] = useState({ name: '', url: '', description: '', imageURL: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCreator();
  }, [id]);

  async function fetchCreator() {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.log('error', error);
      setCreator(mockCreators.find(c => c.id === parseInt(id)));
    } else {
      setCreator(data);
    }
    console.log('Fetched creator for editing:', creator);
  }
  

  const handleChange = (e) => {
    setCreator({ ...creator, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting updated creator:', creator);
    const { error } = await supabase
      .from('creators')
      .update(creator)
      .eq('id', id);
    if (error) console.log('error', error);
    else {
      console.log('Creator updated successfully');
      navigate(`/view/${id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={creator.name} onChange={handleChange} placeholder="Name" required />
      <input name="url" value={creator.url} onChange={handleChange} placeholder="URL" required />
      <textarea name="description" value={creator.description} onChange={handleChange} placeholder="Description" required />
      <input name="imageURL" value={creator.imageURL} onChange={handleChange} placeholder="Image URL" />
      <button type="submit">Update Creator</button>
    </form>
  );
};

export default EditCreator;