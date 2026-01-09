import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { MePage } from './pages/MePage';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CreatePost } from './pages/admin/CreatePost';
import { EditPost } from './pages/admin/EditPost';

export function App() {
  return <BrowserRouter>
      <div className="min-h-screen bg-stone-50/30 font-sans text-stone-900 selection:bg-blue-100 selection:text-blue-900">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/blog" replace />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/me" element={<MePage />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          <Route path="/admin/edit/:slug" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>;
}