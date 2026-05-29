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

  const getGenderBadge = (gender) => {
    const config = {
      men: { icon: '👨', label: 'Men', color: 'bg-blue-500/20 text-blue-400' },
      women: { icon: '👩', label: 'Women', color: 'bg-pink-500/20 text-pink-400' },
      unisex: { icon: '👥', label: 'Unisex', color: 'bg-purple-500/20 text-purple-400' },
      kids: { icon: '🧒', label: 'Kids', color: 'bg-green-500/20 text-green-400' }
    }
    return config[gender] || { icon: '👟', label: gender, color: 'bg-gray-500/20 text-gray-400' }
  }

  const stats = [
    { label: 'Total Products', value: products.length, icon: '👟', color: 'from-purple-500 to-purple-600' },
    { label: "Men's Shoes", value: products.filter(p => p.gender === 'men').length, icon: '👨', color: 'from-blue-500 to-blue-600' },
    { label: "Women's Shoes", value: products.filter(p => p.gender === 'women').length, icon: '👩', color: 'from-pink-500 to-pink-600' },
    { label: 'Unisex', value: products.filter(p => p.gender === 'unisex').length, icon: '👥', color: 'from-green-500 to-green-600' }
  ]

  return (
    <div className="space-y-5">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-xl p-3 md:p-4 text-white shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm opacity-90">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
              </div>
              <span className="text-2xl md:text-3xl opacity-80">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-gray-700">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none transition-colors"
            >
              <option value="all">All Genders</option>
              <option value="men">👨 Men</option>
              <option value="women">👩 Women</option>
              <option value="unisex">👥 Unisex</option>
              <option value="kids">🧒 Kids</option>
            </select>
            
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-1 text-sm shadow-md"
            >
              <span className="text-base">+</span> Add
            </button>
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-3">
          <div className="bg-gray-800 rounded-xl p-5 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                {editingProduct ? '✏️ Edit Product' : '➕ New Product'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white transition text-xl w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="Sneakers, Boots..."
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1">Gender</label>
                <div className="flex flex-wrap gap-3">
                  {['men', 'women', 'unisex', 'kids'].map((g) => (
                    <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="text-purple-500 w-3.5 h-3.5"
                      />
                      <span className="text-white text-sm">
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
                <label className="block text-gray-300 text-xs font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                  rows="2"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1">Images</label>
                <ImageUpload 
                  images={formData.images}
                  onImagesChange={(newImages) => setFormData({...formData, images: newImages})}
                />
              </div>
              
              <div className="flex gap-2 pt-3">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 rounded-lg transition-all text-sm disabled:opacity-50"
                >
                  {saving ? 'Saving...' : (editingProduct ? 'Update' : 'Create')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition text-sm"
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
        <div className="flex justify-center items-center h-48">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-400 text-sm">Loading products...</p>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-gray-800/50 rounded-xl p-8 text-center border border-gray-700">
          <div className="text-5xl mb-3 opacity-50">👟</div>
          <h3 className="text-lg font-semibold text-white mb-1">No Products Yet</h3>
          <p className="text-gray-400 text-sm mb-3">Start by adding your first product</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
          >
            + Add Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {products.map((product) => {
            const genderBadge = getGenderBadge(product.gender)
            return (
              <div key={product.id} className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg group">
                {/* Image */}
                <div className="h-36 md:h-40 bg-gray-700 relative overflow-hidden">
                  {product.images && product.images[0] ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/400x300/374151/8b5cf6?text=No+Image'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-gray-700 to-gray-800">
                      👟
                    </div>
                  )}
                  <span className={`absolute top-2 left-2 ${genderBadge.color} backdrop-blur-sm rounded-md px-1.5 py-0.5 text-xs font-medium`}>
                    {genderBadge.icon} {genderBadge.label}
                  </span>
                </div>
                
                {/* Info */}
                <div className="p-3">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold text-sm truncate">{product.name}</h4>
                      {product.brand && (
                        <p className="text-gray-400 text-xs">{product.brand}</p>
                      )}
                    </div>
                    <p className="text-purple-400 font-bold text-base">${product.price}</p>
                  </div>
                  
                  {product.category && (
                    <span className="inline-block bg-gray-700 text-gray-300 text-xs px-1.5 py-0.5 rounded-md mb-2">
                      {product.category}
                    </span>
                  )}
                  
                  {product.description && (
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="flex gap-2 mt-3 pt-2 border-t border-gray-700">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 bg-blue-500/80 hover:bg-blue-600 text-white px-2 py-1.5 rounded-md text-xs font-medium transition flex items-center justify-center gap-1"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 bg-red-500/80 hover:bg-red-600 text-white px-2 py-1.5 rounded-md text-xs font-medium transition flex items-center justify-center gap-1"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}