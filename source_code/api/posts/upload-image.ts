import { validateSession } from '../_lib/auth.js';
import { createOrUpdateFile, REPO_CONFIG } from '../_lib/github.js';
import { IncomingForm } from 'formidable';
import { readFileSync } from 'fs';

// Disable default body parser for multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

// Allowed image MIME types
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate authentication
  const { valid } = await validateSession(req);

  if (!valid) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Parse multipart form data
    const form = new IncomingForm({
      maxFileSize: MAX_FILE_SIZE,
    });

    const { files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const image = files.image;

    if (!image) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Get the first file if array
    const file = Array.isArray(image) ? image[0] : image;

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      return res.status(400).json({
        error: 'Invalid file type. Allowed types: jpg, jpeg, png, gif, webp',
      });
    }

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const extension = file.originalFilename.split('.').pop();
    const sanitizedName = file.originalFilename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${sanitizedName}`;
    const path = `images/${filename}`;

    // Read file content
    const fileBuffer = readFileSync(file.filepath);
    const base64Content = fileBuffer.toString('base64');

    // Upload to GitHub
    await createOrUpdateFile(
      path,
      base64Content,
      `Upload image: ${filename}`,
      undefined,
      true // isBinary flag
    );

    // Generate GitHub raw URL
    const imageUrl = `https://raw.githubusercontent.com/${REPO_CONFIG.owner}/${REPO_CONFIG.repo}/${REPO_CONFIG.branch}/${path}`;

    return res.status(200).json({
      success: true,
      url: imageUrl,
      filename,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
}
