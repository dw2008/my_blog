import { AdminLayout } from '../../components/admin/AdminLayout';
import { PostList } from '../../components/admin/PostList';

export function AdminDashboard() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-stone-900 mb-6">All Posts</h1>
        <PostList />
      </div>
    </AdminLayout>
  );
}
