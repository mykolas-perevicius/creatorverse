import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AddCreator from './AddCreator';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock('../client', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({ data: [{ id: 3 }], error: null }),
      select: vi.fn(),
    }))
  }
}));

describe('AddCreator', () => {
  it('renders add creator form', async () => {
    render(<AddCreator />);
    
    const nameInput = screen.getByPlaceholderText('Name');
    const urlInput = screen.getByPlaceholderText('URL');
    const descriptionInput = screen.getByPlaceholderText('Description');
    const submitButton = screen.getByText('Add Creator');

    expect(nameInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: 'New Creator' } });
    expect(nameInput).toHaveValue('New Creator');
  });
});