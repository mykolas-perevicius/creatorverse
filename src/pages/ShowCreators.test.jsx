import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ShowCreators from './ShowCreators';
import { mockCreators } from '../client';

vi.mock('../client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockResolvedValue({ data: [], error: null })
    }))
  },
  mockCreators: [
    { id: 1, name: "Tech Guru" },
    { id: 2, name: "Cooking Master" }
  ]
}));

describe('ShowCreators', () => {
  it('renders creator names from mock data when DB is empty', async () => {
    render(
      <Router>
        <ShowCreators />
      </Router>
    );
    
    for (const creator of mockCreators) {
      const creatorName = await screen.findByText(creator.name);
      expect(creatorName).toBeInTheDocument();
    }
  });
});