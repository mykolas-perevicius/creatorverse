import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ShowCreators from './ShowCreators';
import { mockCreators } from '../client';

// Mock the supabase client
vi.mock('../client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockResolvedValue({ data: [], error: null })
    }))
  },
  mockCreators: [
    { id: 1, name: "Tech Guru", url: "https://techguru.com", description: "All about tech" },
    { id: 2, name: "Cooking Master", url: "https://cookingmaster.com", description: "Delicious recipes" }
  ]
}));

describe('ShowCreators', () => {
  it('renders creator names from mock data when DB is empty', async () => {
    render(
      <Router>
        <ShowCreators />
      </Router>
    );
    
    await waitFor(() => {
      mockCreators.forEach(creator => {
        expect(screen.getByText(creator.name)).toBeInTheDocument();
      });
    });
  });
});