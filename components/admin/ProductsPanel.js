import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function ProductsPanel() {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(true)
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
    const { data } = await supabase
      .from('shoes')
      .select('*')
      .order('created_at', { ascending: false })
    
    setProducts(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (editingProduct) {
      await supabase
        .from('shoes')
        .update(formData)
        .eq('id', editingProduct.id)
    } else {
      await supabase
        .from('shoes')
        .insert([formData])
    }

    setShowForm(false)
    setEditingProduct(null)
    setFormData({ name: '', brand: '', description: '', price: '', gender: 'unisex', category: '', images: [] })
    fetchProducts()
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      await supabase.from('shoes').delete().eq('id', id)
      fetchProducts()
    }
  }

  if (loading && products.length === 0) {
    return <div className="text-white">Loading products...</div>
  }

  return (
    <div>
      <button
        onClick={() => setShowForm(true)}
        className="mb-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
      >
        + Add New Product
      </button>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                required
              />
              
              <input
                type="text"
                placeholder="Brand"
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              />
              
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                rows="3"
              />
              
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                required
              />
              
              <select
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Unisex</option>
                <option value="kids">Kids</option>
              </select>
              
              <input
                type="text"
                placeholder="Category (e.g., Sneakers, Boots, Casual)"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              />
              
              <input
                type="text"
                placeholder="Image URLs (comma separated)"
                value={formData.images.join(',')}
                onChange={(e) => setFormData({...formData, images: e.target.value.split(',')})}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              />
              
              <div className="flex gap-3 pt-4">
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingProduct(null)
                  }}
                  className="bg-gray-600 text-white px-6 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-bold text-lg">{product.name}</h3>
            <p className="text-gray-400 text-sm">{product.brand}</p>
            <p className="text-purple-400 font-bold mt-2">${product.price}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setEditingProduct(product)
                  setFormData(product)
                  setShowForm(true)
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
      }
