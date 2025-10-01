import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for dashboard cards
  const stats = [
    {
      title: "Total Sales",
      value: "$24,780",
      change: "+12.5%",
      icon: "💰",
      color: "#4361ee",
    },
    {
      title: "Orders",
      value: "1,846",
      change: "+8.2%",
      icon: "📦",
      color: "#3f37c9",
    },
    {
      title: "Customers",
      value: "12,458",
      change: "+5.7%",
      icon: "👥",
      color: "#4895ef",
    },
    {
      title: "Products",
      value: "1,240",
      change: "+3.1%",
      icon: "🛍️",
      color: "#4cc9f0",
    },
  ];

  // Mock data for recent orders
  const recentOrders = [
    {
      id: "#ORD-7841",
      customer: "John Smith",
      date: "2023-06-15",
      amount: "$124.99",
      status: "Completed",
      avatar: "JS",
    },
    {
      id: "#ORD-7842",
      customer: "Emma Johnson",
      date: "2023-06-15",
      amount: "$89.50",
      status: "Processing",
      avatar: "EJ",
    },
    {
      id: "#ORD-7843",
      customer: "Michael Brown",
      date: "2023-06-14",
      amount: "$210.00",
      status: "Pending",
      avatar: "MB",
    },
    {
      id: "#ORD-7844",
      customer: "Sarah Davis",
      date: "2023-06-14",
      amount: "$65.75",
      status: "Completed",
      avatar: "SD",
    },
    {
      id: "#ORD-7845",
      customer: "Robert Wilson",
      date: "2023-06-13",
      amount: "$199.99",
      status: "Cancelled",
      avatar: "RW",
    },
  ];

  // Mock data for top products
  const topProducts = [
    { name: "Summer Dress", sales: 124, revenue: "$4,960" },
    { name: "Running Shoes", sales: 98, revenue: "$8,820" },
    { name: "Casual T-Shirt", sales: 87, revenue: "$2,523" },
    { name: "Leather Wallet", sales: 65, revenue: "$2,535" },
    { name: "Sunglasses", sales: 54, revenue: "$3,186" },
  ];

  // Generate mock sales data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const data = [];
      for (let i = 0; i < 12; i++) {
        data.push({
          month: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ][i],
          sales: Math.floor(Math.random() * 10000) + 5000,
        });
      }
      setSalesData(data);
      setLoading(false);
    }, 800);
  }, []);

  // Format sales data for chart
  const maxSales = Math.max(...salesData.map((item) => item.sales));

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">
            Welcome back, Admin! Here's what's happening today.
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-refresh">↻ Refresh</button>
          <div className="user-info">
            <span>Admin User</span>
            <div className="avatar">👤</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card"
              style={{ borderLeft: `4px solid ${stat.color}` }}
            >
              <div
                className="stat-icon"
                style={{
                  backgroundColor: `${stat.color}20`,
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
              <div className="stat-info">
                <h3>{stat.title}</h3>
                <p className="stat-value">{stat.value}</p>
                <span className="stat-change positive">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Recent Activity */}
        <div className="dashboard-grid">
          <div className="chart-card">
            <div className="card-header">
              <h2>Sales Overview</h2>
              <div className="chart-actions">
                <button className="btn-chart active">Month</button>
                <button className="btn-chart">Quarter</button>
                <button className="btn-chart">Year</button>
              </div>
            </div>
            <div className="chart-container">
              {loading ? (
                <div className="loading">Loading chart data...</div>
              ) : (
                <div className="bar-chart">
                  {salesData.map((item, index) => (
                    <div key={index} className="chart-bar-container">
                      <div
                        className="chart-bar"
                        style={{
                          height: `${(item.sales / maxSales) * 80 + 10}%`,
                          backgroundColor:
                            index === salesData.length - 1
                              ? "#4361ee"
                              : "#4cc9f0",
                        }}
                      ></div>
                      <span className="chart-label">{item.month}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="activity-card">
            <div className="card-header">
              <h2>Recent Activity</h2>
              <button className="btn-view-all">View All</button>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon success">✓</div>
                <div className="activity-content">
                  <h4>New order received</h4>
                  <p>Order #ORD-7841 has been placed</p>
                  <span className="activity-time">2 min ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon warning">!</div>
                <div className="activity-content">
                  <h4>Product review</h4>
                  <p>New review for Summer Dress</p>
                  <span className="activity-time">1 hour ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon info">↑</div>
                <div className="activity-content">
                  <h4>Stock alert</h4>
                  <p>Running Shoes stock is low</p>
                  <span className="activity-time">3 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon success">✓</div>
                <div className="activity-content">
                  <h4>New customer</h4>
                  <p>Jennifer Parker registered</p>
                  <span className="activity-time">5 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="tables-grid">
          <div className="table-card">
            <div className="card-header">
              <h2>Recent Orders</h2>
              <button className="btn-view-all">View All</button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.id}</td>
                      <td>
                        <div className="customer-info">
                          <div className="customer-avatar">{order.avatar}</div>
                          <span>{order.customer}</span>
                        </div>
                      </td>
                      <td>{order.date}</td>
                      <td>{order.amount}</td>
                      <td>
                        <span
                          className={`status-badge ${order.status.toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="table-card">
            <div className="card-header">
              <h2>Top Products</h2>
              <button className="btn-view-all">View All</button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.sales}</td>
                      <td>{product.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
