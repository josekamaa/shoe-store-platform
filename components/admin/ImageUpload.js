import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ImageUpload({ images, onImagesChange }) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const uploadImage = async (file) => {
    if (!file) return null
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return null
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB')
      return null
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      setUploadProgress(100)
      return publicUrl
    } catch (error) {
      console.error('Upload error:', error)
      alert('Error uploading image: ' + error.message)
      return null
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files)
    const newImages = [...images]
    
    for (const file of files) {
      const url = await uploadImage(file)
      if (url) {
        newImages.push(url)
      }
    }
    
    onImagesChange(newImages)
    e.target.value = '' // Reset input
  }

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  return (
    <div>
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-purple-500 transition-all duration-300">
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer block"
        >
          <div className="text-4xl mb-2">📸</div>
          <p className="text-gray-300 mb-1">
            {uploading ? 'Uploading...' : 'Click or drag to upload images'}
          </p>
          <p className="text-gray-500 text-xs">PNG, JPG, GIF up to 5MB</p>
          {uploading && (
            <div className="mt-3 bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-purple-500 h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </label>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Product ${index + 1}`}
                className="w-full h-28 object-cover rounded-lg bg-gray-700"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150?text=Error'
                }}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}