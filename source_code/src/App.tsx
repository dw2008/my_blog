import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { BlogPage } from './pages/BlogPage';
import { MePage } from './pages/MePage';
export function App() {
  return <BrowserRouter>
      <div className="min-h-screen bg-stone-50/30 font-sans text-stone-900 selection:bg-blue-100 selection:text-blue-900">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/blog" replace />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/me" element={<MePage />} />
        </Routes>
      </div>
    </BrowserRouter>;
}