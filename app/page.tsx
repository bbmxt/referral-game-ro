"use client";


import React, { Suspense } from 'react';
import App from './App';

export default function Home() {
  return (
    <Suspense fallback={<div></div>}>
      <div>
        <App />
      </div>
    </Suspense>
  );
}
