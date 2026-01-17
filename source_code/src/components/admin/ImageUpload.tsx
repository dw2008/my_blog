import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { uploadImage } from '../../lib/api';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string, markdown: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ onImageUploaded, disabled }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload jpg, png, gif, or webp images.');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File too large. Maximum size is 5MB.');
      return;
    }

    setError(null);
    setUploading(true);

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const { url, filename } = await uploadImage(file);

      // Generate markdown syntax
      const markdown = `![${filename}](${url})`;

      // Call parent callback with URL and markdown
      onImageUploaded(url, markdown);

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Clear preview after short delay
      setTimeout(() => setPreview(null), 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        disabled={disabled || uploading}
        className="hidden"
        id="image-upload"
      />

      <label
        htmlFor="image-upload"
        className={`
          flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg
          cursor-pointer transition-all
          ${uploading || disabled
            ? 'border-stone-300 bg-stone-50 cursor-not-allowed'
            : 'border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400'
          }
        `}
      >
        {uploading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-blue-700">Uploading...</span>
          </>
        ) : (
          <>
            <Upload size={16} className="text-blue-600" />
            <span className="text-sm text-blue-700 font-medium">Upload Image</span>
          </>
        )}
      </label>

      {preview && (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="max-w-xs max-h-32 rounded border border-stone-200"
          />
          <button
            onClick={clearPreview}
            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={14} />
          </button>
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded">
            Uploaded!
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-xs text-red-800">{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-800 hover:text-red-900"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
