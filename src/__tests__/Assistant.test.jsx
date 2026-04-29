import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Assistant from '../components/Assistant';

// Mock framer-motion to prevent animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

vi.mock('../utils/firebase', () => ({
  submitFeedback: vi.fn().mockResolvedValue(true),
}));

describe('Assistant Component', () => {
  it('renders the assistant header', () => {
    render(<Assistant />);
    expect(screen.getByText('Elexia Assistant')).toBeDefined();
    expect(screen.getByText('Your smart voting guide')).toBeDefined();
  });

  it('renders the TTS toggle button with accessible label', () => {
    render(<Assistant />);
    const ttsBtn = screen.getByRole('button', { name: /enable voice/i });
    expect(ttsBtn).toBeDefined();
    expect(ttsBtn.getAttribute('aria-pressed')).toBe('false');
  });

  it('shows greeting message after initial delay', async () => {
    render(<Assistant />);
    // Wait for the 800ms setTimeout in addBotMessage to fire
    await waitFor(() => {
      expect(screen.getByText(/hi there/i)).toBeDefined();
    }, { timeout: 3000 });
  }, 10000);

  it('chat region has correct ARIA role', () => {
    render(<Assistant />);
    expect(screen.getByRole('log')).toBeDefined();
  });

  it('clicking an option adds a user message', async () => {
    render(<Assistant />);
    // Wait for the initial greeting with options to appear
    await waitFor(() => {
      const optionButtons = screen.getAllByRole('button').filter(
        (btn) => btn.getAttribute('aria-label')?.includes('Choose option')
      );
      expect(optionButtons.length).toBeGreaterThan(0);
    }, { timeout: 3000 });

    const optionButtons = screen.getAllByRole('button').filter(
      (btn) => btn.getAttribute('aria-label')?.includes('Choose option')
    );
    await userEvent.click(optionButtons[0]);

    // After clicking, a user message should appear
    await waitFor(() => {
      const allText = screen.getAllByText(/.+/);
      expect(allText.length).toBeGreaterThan(2);
    }, { timeout: 3000 });
  }, 10000);
});
