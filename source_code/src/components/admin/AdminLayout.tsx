import { Link, useLocation } from 'react-router-dom';
import { FileText, PlusCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path
      ? 'bg-blue-100 text-blue-900 font-semibold'
      : 'text-stone-700 hover:bg-stone-100';
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-stone-200 min-h-screen sticky top-0">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-stone-900">Admin Panel</h2>
            <p className="text-sm text-stone-600 mt-1">Manage your blog posts</p>
          </div>

          <nav className="px-3 space-y-1">
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/admin')}`}
            >
              <FileText size={20} />
              <span>All Posts</span>
            </Link>

            <Link
              to="/admin/create"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/admin/create')}`}
            >
              <PlusCircle size={20} />
              <span>Create New</span>
            </Link>
          </nav>

          <div className="absolute bottom-6 left-3 right-3">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-700 hover:bg-red-50 transition-colors w-full"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
