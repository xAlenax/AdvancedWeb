import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

// Mocking the fetch call globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]), // Replace with your desired mock data
  })
);

beforeEach(() => {
  fetch.mockClear(); // Reset fetch mock before each test
});

test('renders Item Manager heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Item Manager/i);
  expect(headingElement).toBeInTheDocument(); // This should now work
});
