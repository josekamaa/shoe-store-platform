import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function OrdersPanel() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*, user_profiles(email)')
      .order('created_at', { ascending: false })
    
    setOrders(data || [])
  }

  const updateStatus = async (orderId, newStatus) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', orderId)
    fetchOrders()
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Recent Orders</h3>
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">Order: #{order.order_number?.slice(0,8)}</p>
                <p className="text-gray-400 text-sm">${order.total_amount}</p>
                <p className="text-gray-400 text-sm">{order.status}</p>
              </div>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
                className="bg-gray-600 text-white px-3 py-1 rounded"
              >
                <option value="pending">Pending</option>
                <option value="packed">Packed</option>
                <option value="dispatched">Dispatched</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  }
