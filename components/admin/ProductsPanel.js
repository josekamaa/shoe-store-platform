import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import ImageUpload from './ImageUpload'

export default function ProductsPanel() {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterGender, setFilterGender] = useState('all')
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    gender: 'unisex',
    category: '',
    images: []
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    let query = supabase.from('shoes').select('*')
    
    if (filterGender !== 'all') {
      query = query.eq('gender', filterGender)
    }
    
    if (searchTerm) {
      query = query.ilike('name', `%${searchTerm}%`)
    }
    
    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching products:', error)
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [filterGender, searchTerm])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    
    const productData = {
      name: formData.name,
      brand: formData.brand,
      description: formData.description,
      price: parseFloat(formData.price),
      gender: formData.gender,
      category: formData.category,
      images: formData.images
    }

    let error
    if (editingProduct) {
      const { error: updateError } = await supabase
        .from('shoes')
        .update(productData)
        .eq('id', editingProduct.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase
        .from('shoes')
        .insert([productData])
      error = insertError
    }

    if (error) {
      console.error('Error saving product:', error)
      alert('Error saving product: ' + error.message)
    } else {
      resetForm()
      fetchProducts()
    }
    setSaving(false)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name || '',
      brand: product.brand || '',
      description: product.description || '',
      price: product.price || '',
      gender: product.gender || 'unisex',
      category: product.category || '',
      images: product.images || []
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      const { error } = await supabase
        .from('shoes')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('Error deleting product:', error)
        alert('Error deleting product')
      } else {
        fetchProducts()
      }
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingProduct(null)
    setFormData({
      name: '',
      brand: '',
      description: '',
      price: '',
      gender: 'unisex',
      category: '',
      images: []
    })
  }

  const getGenderIcon = (gender) => {
    switch(gender) {
      case 'men': return '👨'
      case 'women': return '👩'
      case 'unisex': return '👥'
      case 'kids': return '🧒'
      default: return '👟'
    }
  }

  const stats = {
    total: products.length,
    men: products.filter(p => p.gender === 'men').length,
    women: products.filter(p => p.gender === 'women').length,
    unisex: products.filter(p => p.gender === 'unisex').length
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">Total Products</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <span className="text-3xl">👟</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">Men's Shoes</p>
              <p className="text-2xl font-bold">{stats.men}</p>
            </div>
            <span className="text-3xl">👨</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">Women's Shoes</p>
              <p className="text-2xl font-bold">{stats.women}</p>
            </div>
            <span className="text-3xl">👩</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">Unisex</p>
              <p className="text-2xl font-bold">{stats.unisex}</p>
            </div>
            <span className="text-3xl">👥</span>
          </div>
        </div>
      </div>

      {/* Header with Search and Filters */}
      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex-1">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Genders</option>
              <option value="men">👨 Men</option>
              <option value="women">👩 Women</option>
              <option value="unisex">👥 Unisex</option>
              <option value="kids">🧒 Kids</option>
            </select>
            
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-lg">+</span> Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold text-white">
                {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white transition text-2xl"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
                  <input
                    type="text"
                    placeholder="Sneakers, Boots, Sandals..."
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Gender</label>
                <div className="flex gap-3">
                  {['men', 'women', 'unisex', 'kids'].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="text-purple-600"
                      />
                      <span className="text-white">
                        {g === 'men' && '👨 Men'}
                        {g === 'women' && '👩 Women'}
                        {g === 'unisex' && '👥 Unisex'}
                        {g === 'kids' && '🧒 Kids'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                  rows="3"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Product Images</label>
                <ImageUpload 
                  images={formData.images}
                  onImagesChange={(newImages) => setFormData({...formData, images: newImages})}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2.5 rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin text-5xl mb-3">⏳</div>
            <p className="text-white">Loading products...</p>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-gray-800 rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">👟</div>
          <h3 className="text-xl font-semibold text-white mb-2">No Products Yet</h3>
          <p className="text-gray-400 mb-4">Start by adding your first product</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition"
          >
            + Add Your First Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group">
              <div className="h-52 bg-gray-700 relative overflow-hidden">
                {product.images && product.images[0] ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/400x300/e2e8f0/1e293b?text=No+Image'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-gray-700 to-gray-800">
                    👟
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-white">
                  {getGenderIcon(product.gender)} {product.gender}
                </div>
                {product.stock !== undefined && (
                  <div className="absolute top-3 right-3 bg-green-600/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-white">
                    {product.stock} in stock
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-lg truncate">{product.name}</h4>
                    {product.brand && (
                      <p className="text-gray-400 text-sm">{product.brand}</p>
                    )}
                  </div>
                  <p className="text-purple-400 font-bold text-xl">${product.price}</p>
                </div>
                
                {product.category && (
                  <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-lg mb-2">
                    {product.category}
                  </span>
                )}
                
                {product.description && (
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>
                )}
                
                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-700">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-1"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-1"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}