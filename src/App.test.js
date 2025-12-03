import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header component', () => {
  render(<App />);
  const headerElement = screen.getByText(/Algorithm Visualizer/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders footer component', () => {
  render(<App />);
  const footerElement = screen.getByText(/© 2024 Algorithm Visualizer/i);
  expect(footerElement).toBeInTheDocument();
});
