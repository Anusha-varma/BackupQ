import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueueProvider } from '../../src/context/QueueContext';
import { AuthProvider } from '../../src/context/AuthContext';
import Queue from '../../src/pages/Queue';

describe('Queue Page Basic Render', () => {
  it('renders Join Queue button', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <QueueProvider>
            <Queue />
          </QueueProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Join Queue/i)).toBeInTheDocument();
  });
});
