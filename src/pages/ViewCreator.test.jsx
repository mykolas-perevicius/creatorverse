import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ViewCreator from './ViewCreator';
import { mockCreators } from '../client';

vi.mock('../client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: mockCreators[0], error: null })
        }))
      })),
      delete: vi.fn().mockResolvedValue({ error: null }),
    }))
  },
  mockCreators: [
    { id: 1, name: "Tech Guru", description: "All about the latest in tech", url: "https://youtube.com/techguru" }
  ]
}));

describe('ViewCreator', () => {
  it('renders creator details', async () => {
    render(
      <MemoryRouter initialEntries={['/view/1']}>
        <Routes>
          <Route path="/view/:id" element={<ViewCreator />} />
        </Routes>
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Tech Guru')).toBeInTheDocument();
    });
    
    expect(screen.getByText('All about the latest in tech')).toBeInTheDocument();
    expect(screen.getByText('Visit Channel')).toHaveAttribute('href', 'https://youtube.com/techguru');
  });
});