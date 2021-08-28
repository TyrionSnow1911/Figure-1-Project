import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserDetails from './UserDetails';

describe('<UserDetails />', () => {
  test('it should mount', () => {
    render(<UserDetails />);
    
    const userDetails = screen.getByTestId('UserDetails');

    expect(userDetails).toBeInTheDocument();
  });
});