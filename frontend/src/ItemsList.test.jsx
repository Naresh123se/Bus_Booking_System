// Greeting.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Import the component to be tested
import Greeting from './Greeting.jsx';

// Test case to check if Greeting renders correctly with a specific name
test('renders greeting message with a specific name', () => {
  const name = 'John';
  render(<Greeting name={name} />);
  // Use screen.getByText to assert that the component renders the greeting message with the correct name
  expect(screen.getByText(`Hello, ${name}!`)).toBeInTheDocument();
});
