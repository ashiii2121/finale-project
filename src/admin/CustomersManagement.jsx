import React, { useState, useEffect } from "react";
import "./CustomersManagement.css";

const CustomersManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Mock data for customers
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockCustomers = [
        {
          id: 1,
          name: "John Smith",
          email: "john@example.com",
          phone: "+1 (555) 123-4567",
          address: "123 Main St, New York, NY",
          orders: 12,
          totalSpent: 1245.75,
          status: "Active",
          avatar: "JS",
          joinDate: "2023-01-15",
        },
        {
          id: 2,
          name: "Emma Johnson",
          email: "emma@example.com",
          phone: "+1 (555) 987-6543",
          address: "456 Park Ave, Los Angeles, CA",
          orders: 8,
          totalSpent: 876.3,
          status: "Active",
          avatar: "EJ",
          joinDate: "2023-02-20",
        },
        {
          id: 3,
          name: "Michael Brown",
          email: "michael@example.com",
          phone: "+1 (555) 456-7890",
          address: "789 Broadway, Chicago, IL",
          orders: 5,
          totalSpent: 432.5,
          status: "Inactive",
          avatar: "MB",
          joinDate: "2023-03-10",
        },
        {
          id: 4,
          name: "Sarah Davis",
          email: "sarah@example.com",
          phone: "+1 (555) 234-5678",
          address: "321 Oak St, Houston, TX",
          orders: 15,
          totalSpent: 2105.25,
          status: "Active",
          avatar: "SD",
          joinDate: "2023-01-28",
        },
        {
          id: 5,
          name: "Robert Wilson",
          email: "robert@example.com",
          phone: "+1 (555) 876-5432",
          address: "654 Pine St, Phoenix, AZ",
          orders: 3,
          totalSpent: 189.99,
          status: "Inactive",
          avatar: "RW",
          joinDate: "2023-04-05",
        },
        {
          id: 6,
          name: "Jennifer Parker",
          email: "jennifer@example.com",
          phone: "+1 (555) 345-6789",
          address: "987 Elm St, Philadelphia, PA",
          orders: 7,
          totalSpent: 654.2,
          status: "Active",
          avatar: "JP",
          joinDate: "2023-02-14",
        },
        {
          id: 7,
          name: "David Miller",
          email: "david@example.com",
          phone: "+1 (555) 567-8901",
          address: "135 Maple St, San Antonio, TX",
          orders: 9,
          totalSpent: 987.65,
          status: "Active",
          avatar: "DM",
          joinDate: "2023-03-22",
        },
      ];
      setCustomers(mockCustomers);
      setFilteredCustomers(mockCustomers);
      setLoading(false);
    }, 800);
  }, []);

  // Filter and sort customers
  useEffect(() => {
    let result = customers;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone.includes(searchTerm)
      );
    }

    // Sort customers
    result.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });

    setFilteredCustomers(result);
  }, [customers, searchTerm, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const toggleCustomerStatus = (customerId) => {
    setCustomers(
      customers.map((customer) => {
        if (customer.id === customerId) {
          return {
            ...customer,
            status: customer.status === "Active" ? "Inactive" : "Active",
          };
        }
        return customer;
      })
    );
  };

  return (
    <div className="customers-management">
      <div className="header">
        <div>
          <h1>Customers Management</h1>
          <p className="subtitle">Manage your customer base</p>
        </div>
        <div className="header-actions">
          <button className="btn-refresh">↻ Refresh</button>
          <button className="add-button">+ Add Customer</button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="filter-actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
            <option value="orders">Sort by Orders</option>
            <option value="totalSpent">Sort by Total Spent</option>
            <option value="joinDate">Sort by Join Date</option>
          </select>
          <button
            className="sort-btn"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      <div className="customers-table">
        {loading ? (
          <div className="loading">Loading customers...</div>
        ) : (
          <>
            <div className="table-header">
              <p>{filteredCustomers.length} customers found</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort("name")}>
                    Customer{" "}
                    {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("email")}>
                    Email{" "}
                    {sortBy === "email" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Phone</th>
                  <th onClick={() => handleSort("orders")}>
                    Orders{" "}
                    {sortBy === "orders" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("totalSpent")}>
                    Total Spent{" "}
                    {sortBy === "totalSpent" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("joinDate")}>
                    Join Date{" "}
                    {sortBy === "joinDate" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="customer-info">
                        <div className="customer-avatar">{customer.avatar}</div>
                        <div>
                          <div className="customer-name">{customer.name}</div>
                          <div className="customer-address">
                            {customer.address}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.orders}</td>
                    <td>{formatCurrency(customer.totalSpent)}</td>
                    <td>{customer.joinDate}</td>
                    <td>
                      <span
                        className={`status-badge ${customer.status.toLowerCase()}`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="toggle-button"
                          onClick={() => toggleCustomerStatus(customer.id)}
                        >
                          {customer.status === "Active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                        <button className="view-button">View</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredCustomers.length === 0 && (
              <div className="no-customers">
                <p>No customers found matching your criteria</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomersManagement;
