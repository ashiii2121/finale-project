import React, { useState, useEffect } from "react";
import "./OrdersManagement.css";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Mock data for orders
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockOrders = [
        {
          id: "#ORD-7841",
          customer: "John Smith",
          email: "john@example.com",
          date: "2023-06-15",
          amount: 124.99,
          status: "Completed",
          avatar: "JS",
          items: 3,
        },
        {
          id: "#ORD-7842",
          customer: "Emma Johnson",
          email: "emma@example.com",
          date: "2023-06-15",
          amount: 89.5,
          status: "Processing",
          avatar: "EJ",
          items: 2,
        },
        {
          id: "#ORD-7843",
          customer: "Michael Brown",
          email: "michael@example.com",
          date: "2023-06-14",
          amount: 210.0,
          status: "Pending",
          avatar: "MB",
          items: 1,
        },
        {
          id: "#ORD-7844",
          customer: "Sarah Davis",
          email: "sarah@example.com",
          date: "2023-06-14",
          amount: 65.75,
          status: "Completed",
          avatar: "SD",
          items: 4,
        },
        {
          id: "#ORD-7845",
          customer: "Robert Wilson",
          email: "robert@example.com",
          date: "2023-06-13",
          amount: 199.99,
          status: "Cancelled",
          avatar: "RW",
          items: 2,
        },
        {
          id: "#ORD-7846",
          customer: "Jennifer Parker",
          email: "jennifer@example.com",
          date: "2023-06-12",
          amount: 145.25,
          status: "Completed",
          avatar: "JP",
          items: 3,
        },
        {
          id: "#ORD-7847",
          customer: "David Miller",
          email: "david@example.com",
          date: "2023-06-11",
          amount: 87.3,
          status: "Processing",
          avatar: "DM",
          items: 1,
        },
      ];
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setLoading(false);
    }, 800);
  }, []);

  // Filter and sort orders
  useEffect(() => {
    let result = orders;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    // Sort orders
    result.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });

    setFilteredOrders(result);
  }, [orders, searchTerm, statusFilter, sortBy, sortOrder]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getStatusOptions = () => {
    const statuses = [...new Set(orders.map((order) => order.status))];
    return ["all", ...statuses];
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="orders-management">
      <div className="header">
        <div>
          <h1>Orders Management</h1>
          <p className="subtitle">Manage and track customer orders</p>
        </div>
        <div className="header-actions">
          <button className="btn-refresh">↻ Refresh</button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="filter-actions">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {getStatusOptions().map((status) => (
              <option key={status} value={status}>
                {status === "all" ? "All Statuses" : status}
              </option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Sort by Date</option>
            <option value="customer">Sort by Customer</option>
            <option value="amount">Sort by Amount</option>
            <option value="status">Sort by Status</option>
          </select>
          <button
            className="sort-btn"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      <div className="orders-table">
        {loading ? (
          <div className="loading">Loading orders...</div>
        ) : (
          <>
            <div className="table-header">
              <p>{filteredOrders.length} orders found</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort("id")}>
                    Order ID{" "}
                    {sortBy === "id" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("customer")}>
                    Customer{" "}
                    {sortBy === "customer" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("date")}>
                    Date{" "}
                    {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Items</th>
                  <th onClick={() => handleSort("amount")}>
                    Amount{" "}
                    {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("status")}>
                    Status{" "}
                    {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <div className="order-id">{order.id}</div>
                    </td>
                    <td>
                      <div className="customer-info">
                        <div className="customer-avatar">{order.avatar}</div>
                        <div>
                          <div className="customer-name">{order.customer}</div>
                          <div className="customer-email">{order.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{order.date}</td>
                    <td>{order.items}</td>
                    <td>{formatCurrency(order.amount)}</td>
                    <td>
                      <span
                        className={`status-badge ${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value)
                          }
                          className="status-select"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button className="view-button">View</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredOrders.length === 0 && (
              <div className="no-orders">
                <p>No orders found matching your criteria</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersManagement;
