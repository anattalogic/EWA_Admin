import React from 'react';

export function ErrorBoundaryComponent() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">404 - Not Found</h1>
        <p className="text-slate-600 mb-6">The page you're looking for doesn't exist.</p>
        <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go Back Home
        </a>
      </div>
    </div>
  );
}
