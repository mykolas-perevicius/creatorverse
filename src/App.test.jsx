import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mocking the page components
vi.mock('./pages/ShowCreators', () => ({ default: () => <div>ShowCreators</div> }));
vi.mock('./pages/ViewCreator', () => ({ default: () => <div>ViewCreator</div> }));
vi.mock('./pages/EditCreator', () => ({ default: () => <div>EditCreator</div> }));
vi.mock('./pages/AddCreator', () => ({ default: () => <div>AddCreator</div> }));

describe('App', () => {
  it('renders ShowCreators at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('ShowCreators')).toBeInTheDocument();
  });

  it('renders ViewCreator at /view/:id', () => {
    render(
      <MemoryRouter initialEntries={['/view/1']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('ViewCreator')).toBeInTheDocument();
  });

  it('renders EditCreator at /edit/:id', () => {
    render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('EditCreator')).toBeInTheDocument();
  });

  it('renders AddCreator at /add', () => {
    render(
      <MemoryRouter initialEntries={['/add']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('AddCreator')).toBeInTheDocument();
  });
});