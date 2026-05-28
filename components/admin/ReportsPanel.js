import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function ReportsPanel() {
  const [loading, setLoading] = useState(false)
  const [reportType, setReportType] = useState('daily')

  const generateReport = async (type) => {
    setLoading(true)
    
    // Fetch orders for reporting
    const { data: orders } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false })
    
    if (orders) {
      // Calculate totals
      const totalSales = orders.reduce((sum, order) => sum + order.total_amount, 0)
      const totalOrders = orders.length
      
      alert(`Report Ready!\n\nTotal Orders: ${totalOrders}\nTotal Sales: $${totalSales}\nCheck console for detailed data`)
      console.log('Report Data:', { type, orders, totalSales, totalOrders })
    }
    
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="text-3xl mb-2">💰</div>
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold mt-2">$0</p>
          <p className="text-sm opacity-90">Lifetime sales</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="text-3xl mb-2">📦</div>
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold mt-2">0</p>
          <p className="text-sm opacity-90">All time</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="text-3xl mb-2">👟</div>
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-2xl font-bold mt-2">0</p>
          <p className="text-sm opacity-90">In inventory</p>
        </div>
      </div>

      {/* Report Generation */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Generate Reports</h3>
        
        <div className="flex gap-3 mb-6">
          <select 
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            <option value="daily">Daily Report</option>
            <option value="weekly">Weekly Report</option>
            <option value="monthly">Monthly Report</option>
            <option value="yearly">Yearly Report</option>
          </select>
          
          <button
            onClick={() => generateReport(reportType)}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Report →'}
          </button>
        </div>
        
        <div className="border-t border-gray-700 pt-4">
          <h4 className="text-white font-semibold mb-3">Quick Export</h4>
          <div className="flex gap-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded text-sm">Export CSV</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Export PDF</button>
          </div>
        </div>
      </div>
      
      {/* Recent Orders Table */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr>
                <td colSpan="4" className="pt-4 text-center text-gray-500">No orders yet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}