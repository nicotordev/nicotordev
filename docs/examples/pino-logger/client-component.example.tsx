/**
 * Ejemplo de uso de Pino Logger en Client Component
 * Ubicación sugerida: src/components/features/example-form.tsx
 */

'use client';

import { log } from '@/lib/logger';
import { useState, useEffect } from 'react';

export default function ExampleForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const componentLogger = log.child({ module: 'ExampleForm' });

  useEffect(() => {
    componentLogger.info('Component mounted');

    return () => {
      componentLogger.debug('Component unmounting');
    };
  }, [componentLogger]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    componentLogger.info({ email }, 'Form submission started');
    setStatus('loading');

    try {
      const response = await fetch('/api/example', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      componentLogger.info({ email }, 'Form submitted successfully');
      setStatus('success');
      setEmail('');
    } catch (error) {
      componentLogger.error({ email, error }, 'Form submission failed');
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    componentLogger.debug({ emailLength: e.target.value.length }, 'Email input changed');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Submitting...' : 'Submit'}
      </button>

      {status === 'success' && <p>Success!</p>}
      {status === 'error' && <p>Error occurred</p>}
    </form>
  );
}
