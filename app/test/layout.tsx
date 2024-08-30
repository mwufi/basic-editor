import React from 'react';

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-8">
      {children}
    </div>
  );
}
