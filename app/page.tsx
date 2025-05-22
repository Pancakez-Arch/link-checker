'use client';

import React from 'react';
import { useState } from 'react';
import InputForm from './components/inputform';
import LinkResults from './components/linkresult';

export default function Home() {
  const [statusResults, setStatusResults] = useState<LinkStatus[]>([]);
  const [error, setError] = useState<string | null>(null); // error can also be null

  const checkLinks = async (url: string) => {
    try {
      const res = await fetch('/api/link-checker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (data.statusResults) {
        setStatusResults(data.statusResults);
      } else {
        setError(data.error || 'Unknown error');
      }
    } catch (error) {
      setError('Failed to fetch the URL. Please check the input.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Link Checker</h1>

      <InputForm onSubmit={checkLinks} />

      <LinkResults results={statusResults} error={error} />
    </div>
  );
}
