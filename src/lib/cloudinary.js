export async function uploadSignatureToCloudinary(signatureBase64OrBlob) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'ddvw91etu';
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'Time2Confirm';

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary credentials missing in .env');
  }

  const formData = new FormData();
  formData.append('file', signatureBase64OrBlob);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'signatures');

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error('Cloudinary Upload Failed:', errData);
      throw new Error(errData?.error?.message || 'Failed to upload signature to Cloudinary.');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}
