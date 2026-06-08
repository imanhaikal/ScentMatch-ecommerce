"use client";

import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Package,
  Activity,
  MoreHorizontal
} from 'lucide-react';

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
];

const categoryData = [
  { name: 'Floral', sales: 400 },
  { name: 'Woody', sales: 300 },
  { name: 'Citrus', sales: 300 },
  { name: 'Fruity', sales: 200 },
  { name: 'Spicy', sales: 278 },
];

const recentOrders = [
  { id: '#1204', customer: 'Alex Johnson', date: '2026-06-08', status: 'Delivered', amount: '$124.00' },
  { id: '#1205', customer: 'Sarah Williams', date: '2026-06-08', status: 'Processing', amount: '$89.00' },
  { id: '#1206', customer: 'Michael Chen', date: '2026-06-07', status: 'Shipped', amount: '$249.50' },
  { id: '#1207', customer: 'Emily Davis', date: '2026-06-07', status: 'Delivered', amount: '$65.00' },
  { id: '#1208', customer: 'James Wilson', date: '2026-06-06', status: 'Processing', amount: '$178.00' },
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-500 dark:text-zinc-400 mt-1">Welcome back, Admin. Here's what's happening with your store today.</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 rounded-md px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="12m">Last 12 months</option>
            </select>
            <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 dark:hover:bg-zinc-200 transition-colors">
              Download Report
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Revenue" 
            value="$45,231.89" 
            trend="+20.1%" 
            trendUp={true} 
            icon={<DollarSign className="w-5 h-5 text-gray-500 dark:text-zinc-400" />} 
          />
          <StatCard 
            title="Active Users" 
            value="2,350" 
            trend="+15.2%" 
            trendUp={true} 
            icon={<Users className="w-5 h-5 text-gray-500 dark:text-zinc-400" />} 
          />
          <StatCard 
            title="Total Orders" 
            value="12,234" 
            trend="+12.4%" 
            trendUp={true} 
            icon={<ShoppingCart className="w-5 h-5 text-gray-500 dark:text-zinc-400" />} 
          />
          <StatCard 
            title="Conversion Rate" 
            value="3.24%" 
            trend="-2.1%" 
            trendUp={false} 
            icon={<TrendingUp className="w-5 h-5 text-gray-500 dark:text-zinc-400" />} 
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-6 shadow-sm col-span-1 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h2>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-gray-500 dark:text-zinc-400">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-zinc-800" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: any) => [`$${value}`, 'Revenue']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#000000" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#000000', strokeWidth: 0 }} 
                    activeDot={{ r: 6, fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }}
                    className="dark:stroke-white dark:fill-white"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Sales by Category</h2>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-gray-500 dark:text-zinc-400">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" className="dark:stroke-zinc-800" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar dataKey="sales" fill="#000000" radius={[0, 4, 4, 0]} className="dark:fill-white" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-6 shadow-sm col-span-1 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
              <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">View all</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 dark:text-zinc-400 uppercase bg-gray-50 dark:bg-zinc-900/50 border-y border-gray-100 dark:border-zinc-800">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">Order ID</th>
                    <th scope="col" className="px-4 py-3 font-medium">Customer</th>
                    <th scope="col" className="px-4 py-3 font-medium">Date</th>
                    <th scope="col" className="px-4 py-3 font-medium">Amount</th>
                    <th scope="col" className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, idx) => (
                    <tr key={idx} className="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">{order.id}</td>
                      <td className="px-4 py-4 text-gray-600 dark:text-zinc-300">{order.customer}</td>
                      <td className="px-4 py-4 text-gray-500 dark:text-zinc-400">{order.date}</td>
                      <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">{order.amount}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                            : order.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Inventory Alerts</h2>
            <div className="space-y-4">
              <AlertItem title="Midnight Rose" message="Only 5 items left in stock" type="warning" />
              <AlertItem title="Ocean Breeze" message="Out of stock" type="critical" />
              <AlertItem title="Amber Wood" message="Low stock expected next week" type="info" />
              <AlertItem title="Summer Citrus" message="Only 12 items left in stock" type="warning" />
            </div>
            <button className="w-full mt-6 py-2 border border-gray-200 dark:border-zinc-800 rounded-md text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
              Manage Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, icon }: { title: string, value: string, trend: string, trendUp: boolean, icon: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-zinc-400">{title}</h3>
        <div className="p-2 bg-gray-50 dark:bg-zinc-800 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
      </div>
      <div className="mt-2 flex items-center text-sm">
        <span className={`flex items-center font-medium ${trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {trendUp ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {trend}
        </span>
        <span className="text-gray-500 dark:text-zinc-400 ml-2">from last month</span>
      </div>
    </div>
  );
}

function AlertItem({ title, message, type }: { title: string, message: string, type: 'warning' | 'critical' | 'info' }) {
  const bgColor = type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' : type === 'critical' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-blue-100 dark:bg-blue-900/30';
  const textColor = type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : type === 'critical' ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400';
  
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-0.5 p-1.5 rounded-full ${bgColor} ${textColor}`}>
        <Package className="w-4 h-4" />
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
        <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">{message}</p>
      </div>
    </div>
  );
}