import { AdminLayout } from '../../components/admin/AdminLayout';
import { PostEditor } from '../../components/admin/PostEditor';

export function CreatePost() {
  return (
    <AdminLayout>
      <PostEditor mode="create" />
    </AdminLayout>
  );
}
