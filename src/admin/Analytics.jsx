import React, { useState, useEffect } from "react";
import "./Analytics.css";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [loading, setLoading] = useState(true);

  // Mock data for charts
  const [revenueData, setRevenueData] = useState([]);
  const [trafficData, setTrafficData] = useState([]);
  const [conversionData, setConversionData] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Revenue data
      const revenue = [];
      for (let i = 0; i < 12; i++) {
        revenue.push({
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
          revenue: Math.floor(Math.random() * 10000) + 5000,
        });
      }
      setRevenueData(revenue);

      // Traffic data
      const traffic = [];
      for (let i = 0; i < 7; i++) {
        traffic.push({
          day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
          visitors: Math.floor(Math.random() * 5000) + 2000,
        });
      }
      setTrafficData(traffic);

      // Conversion data
      const conversion = [];
      for (let i = 0; i < 6; i++) {
        conversion.push({
          source: ["Direct", "Social", "Email", "Referral", "Organic", "Paid"][
            i
          ],
          percentage: Math.floor(Math.random() * 30) + 10,
        });
      }
      setConversionData(conversion);

      setLoading(false);
    }, 800);
  }, []);

  // Format revenue data for chart
  const maxRevenue = Math.max(...revenueData.map((item) => item.revenue));

  // Format traffic data for chart
  const maxTraffic = Math.max(...trafficData.map((item) => item.visitors));

  return (
    <div className="analytics">
      <div className="header">
        <div>
          <h1>Analytics Dashboard</h1>
          <p className="subtitle">Track your business performance</p>
        </div>
        <div className="header-actions">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="btn-refresh">↻ Refresh</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon revenue">💰</div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p className="stat-value">$42,680</p>
            <span className="stat-change positive">+12.5%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon visitors">👥</div>
          <div className="stat-info">
            <h3>Visitors</h3>
            <p className="stat-value">24,568</p>
            <span className="stat-change positive">+8.2%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon conversion">📈</div>
          <div className="stat-info">
            <h3>Conversion Rate</h3>
            <p className="stat-value">4.8%</p>
            <span className="stat-change negative">-1.3%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon avg-order">🛒</div>
          <div className="stat-info">
            <h3>Avg. Order Value</h3>
            <p className="stat-value">$87.50</p>
            <span className="stat-change positive">+3.7%</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="card-header">
            <h2>Revenue Overview</h2>
          </div>
          <div className="chart-container">
            {loading ? (
              <div className="loading">Loading chart data...</div>
            ) : (
              <div className="bar-chart">
                {revenueData.map((item, index) => (
                  <div key={index} className="chart-bar-container">
                    <div
                      className="chart-bar"
                      style={{
                        height: `${(item.revenue / maxRevenue) * 80 + 10}%`,
                        backgroundColor:
                          index === revenueData.length - 1
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

        <div className="chart-card">
          <div className="card-header">
            <h2>Website Traffic</h2>
          </div>
          <div className="chart-container">
            {loading ? (
              <div className="loading">Loading chart data...</div>
            ) : (
              <div className="bar-chart">
                {trafficData.map((item, index) => (
                  <div key={index} className="chart-bar-container">
                    <div
                      className="chart-bar"
                      style={{
                        height: `${(item.visitors / maxTraffic) * 80 + 10}%`,
                        backgroundColor: "#3a0ca3",
                      }}
                    ></div>
                    <span className="chart-label">{item.day}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="card-header">
            <h2>Conversion Sources</h2>
          </div>
          <div className="conversion-chart">
            {loading ? (
              <div className="loading">Loading data...</div>
            ) : (
              <div className="pie-chart">
                {conversionData.map((item, index) => (
                  <div key={index} className="pie-segment">
                    <div className="segment-info">
                      <span
                        className="segment-color"
                        style={{
                          backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                        }}
                      ></span>
                      <span className="segment-label">{item.source}</span>
                      <span className="segment-value">{item.percentage}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-header">
            <h2>Top Performing Products</h2>
          </div>
          <div className="top-products">
            {loading ? (
              <div className="loading">Loading data...</div>
            ) : (
              <div className="products-list">
                <div className="product-item">
                  <div className="product-info">
                    <div className="product-name">Summer Dress</div>
                    <div className="product-sales">1,240 sales</div>
                  </div>
                  <div className="product-revenue">$49,600</div>
                </div>
                <div className="product-item">
                  <div className="product-info">
                    <div className="product-name">Running Shoes</div>
                    <div className="product-sales">980 sales</div>
                  </div>
                  <div className="product-revenue">$88,200</div>
                </div>
                <div className="product-item">
                  <div className="product-info">
                    <div className="product-name">Casual T-Shirt</div>
                    <div className="product-sales">870 sales</div>
                  </div>
                  <div className="product-revenue">$25,230</div>
                </div>
                <div className="product-item">
                  <div className="product-info">
                    <div className="product-name">Leather Wallet</div>
                    <div className="product-sales">650 sales</div>
                  </div>
                  <div className="product-revenue">$25,350</div>
                </div>
                <div className="product-item">
                  <div className="product-info">
                    <div className="product-name">Sunglasses</div>
                    <div className="product-sales">540 sales</div>
                  </div>
                  <div className="product-revenue">$31,860</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
