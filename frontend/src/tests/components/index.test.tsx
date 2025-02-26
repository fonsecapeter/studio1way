import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../components/app';

describe('App', () => {
  beforeEach(() => {
    render(
      <App />,
    );
  });

  it('renders a smiley face', () => {
    expect(screen.getByText(':D')).toBeInTheDocument();
  });
});
