import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setCreator({ ...creator, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('creators')
      .update(creator)
      .eq('id', id);

    if (error) {
      console.error('Error updating creator:', error);
    } else {
      navigate(`/view/${id}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this creator?')) {
      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting creator:', error);
      } else {
        navigate('/');
      }
    }
  };

  return (
    <main className="container">
      <h1>Edit Creator</h1>
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
          <button type="submit">Update Creator</button>
          <button type="button" className="secondary" onClick={handleDelete}>Delete Creator</button>
          <Link to={`/view/${id}`} role="button" className="contrast">Cancel</Link>
        </div>
      </form>
    </main>
  );
};

export default EditCreator;