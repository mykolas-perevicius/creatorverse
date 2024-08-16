import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import EditCreator from './EditCreator';
import { mockCreators } from '../client';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    useNavigate: () => vi.fn(),
  };
});

vi.mock('../client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: mockCreators[0], error: null })
        }))
      })),
      update: vi.fn().mockResolvedValue({ error: null }),
    }))
  },
  mockCreators: [
    { id: 1, name: "Tech Guru", description: "All about the latest in tech", url: "https://youtube.com/techguru" }
  ]
}));

describe('EditCreator', () => {
  it('renders edit form with creator data', async () => {
    render(<EditCreator />);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('Tech Guru')).toBeInTheDocument();
    });
    
    const nameInput = screen.getByDisplayValue('Tech Guru');
    expect(nameInput).toBeInTheDocument();
  });
});