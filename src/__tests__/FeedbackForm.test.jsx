import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FeedbackForm from '../components/FeedbackForm';

// Mock firebase module
vi.mock('../utils/firebase', () => ({
  submitFeedback: vi.fn().mockResolvedValue(true),
}));

describe('FeedbackForm', () => {
  it('renders the textarea and submit button', () => {
    render(<FeedbackForm />);
    expect(screen.getByRole('textbox', { name: /your feedback/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /submit feedback/i })).toBeDefined();
  });

  it('disables submit button when textarea is empty', () => {
    render(<FeedbackForm />);
    const btn = screen.getByRole('button', { name: /submit feedback/i });
    expect(btn.disabled).toBe(true);
  });

  it('shows validation error when submitting with less than 5 characters', async () => {
    render(<FeedbackForm />);
    const textarea = screen.getByRole('textbox', { name: /your feedback/i });
    await userEvent.type(textarea, 'Hi');
    fireEvent.submit(screen.getByRole('form', { hidden: true }) || textarea.closest('form'));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeDefined();
    });
  });

  it('shows success message after successful submission', async () => {
    const { submitFeedback } = await import('../utils/firebase');
    submitFeedback.mockResolvedValue(true);
    
    render(<FeedbackForm />);
    const textarea = screen.getByRole('textbox', { name: /your feedback/i });
    await userEvent.type(textarea, 'This is great feedback from a test!');
    fireEvent.submit(textarea.closest('form'));
    
    await waitFor(() => {
      expect(screen.getByRole('status')).toBeDefined();
    });
  });

  it('shows character count remaining', async () => {
    render(<FeedbackForm />);
    const textarea = screen.getByRole('textbox', { name: /your feedback/i });
    await userEvent.type(textarea, 'Hello');
    expect(screen.getByText(/495 remaining/i)).toBeDefined();
  });
});
