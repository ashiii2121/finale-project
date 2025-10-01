import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    // General settings
    siteName: "Fashion Store",
    siteDescription: "Online fashion store for all your needs",
    contactEmail: "admin@fashionstore.com",
    contactPhone: "+1 (555) 123-4567",

    // Appearance settings
    theme: "light",
    primaryColor: "#4361ee",
    secondaryColor: "#3a0ca3",

    // Security settings
    twoFactorAuth: false,
    passwordExpiry: 90,
    sessionTimeout: 30,

    // Notification settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,

    // Payment settings
    currency: "USD",
    taxRate: 8.5,
    shippingCost: 5.99,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to a server
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    if (
      window.confirm("Are you sure you want to reset all settings to default?")
    ) {
      // Reset to default values
      setFormData({
        siteName: "Fashion Store",
        siteDescription: "Online fashion store for all your needs",
        contactEmail: "admin@fashionstore.com",
        contactPhone: "+1 (555) 123-4567",
        theme: "light",
        primaryColor: "#4361ee",
        secondaryColor: "#3a0ca3",
        twoFactorAuth: false,
        passwordExpiry: 90,
        sessionTimeout: 30,
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        currency: "USD",
        taxRate: 8.5,
        shippingCost: 5.99,
      });
    }
  };

  return (
    <div className="settings">
      <div className="header">
        <div>
          <h1>Settings</h1>
          <p className="subtitle">Manage your application settings</p>
        </div>
        <div className="header-actions">
          <button className="btn-reset" onClick={handleReset}>
            Reset to Default
          </button>
        </div>
      </div>

      <div className="settings-content">
        {/* Tabs */}
        <div className="settings-tabs">
          <button
            className={`tab ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            className={`tab ${activeTab === "appearance" ? "active" : ""}`}
            onClick={() => setActiveTab("appearance")}
          >
            Appearance
          </button>
          <button
            className={`tab ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
          <button
            className={`tab ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
          <button
            className={`tab ${activeTab === "payment" ? "active" : ""}`}
            onClick={() => setActiveTab("payment")}
          >
            Payment
          </button>
        </div>

        {/* Settings Form */}
        <div className="settings-form">
          <form onSubmit={handleSubmit}>
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="form-section">
                <h2>General Settings</h2>
                <div className="form-group">
                  <label htmlFor="siteName">Site Name</label>
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="siteDescription">Site Description</label>
                  <textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={formData.siteDescription}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contactEmail">Contact Email</label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactPhone">Contact Phone</label>
                    <input
                      type="text"
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div className="form-section">
                <h2>Appearance Settings</h2>
                <div className="form-group">
                  <label htmlFor="theme">Theme</label>
                  <select
                    id="theme"
                    name="theme"
                    value={formData.theme}
                    onChange={handleInputChange}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="primaryColor">Primary Color</label>
                    <div className="color-picker">
                      <input
                        type="color"
                        id="primaryColor"
                        name="primaryColor"
                        value={formData.primaryColor}
                        onChange={handleInputChange}
                      />
                      <span>{formData.primaryColor}</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="secondaryColor">Secondary Color</label>
                    <div className="color-picker">
                      <input
                        type="color"
                        id="secondaryColor"
                        name="secondaryColor"
                        value={formData.secondaryColor}
                        onChange={handleInputChange}
                      />
                      <span>{formData.secondaryColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="form-section">
                <h2>Security Settings</h2>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="twoFactorAuth"
                      checked={formData.twoFactorAuth}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Enable Two-Factor Authentication
                  </label>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="passwordExpiry">
                      Password Expiry (days)
                    </label>
                    <input
                      type="number"
                      id="passwordExpiry"
                      name="passwordExpiry"
                      value={formData.passwordExpiry}
                      onChange={handleInputChange}
                      min="1"
                      max="365"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sessionTimeout">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      id="sessionTimeout"
                      name="sessionTimeout"
                      value={formData.sessionTimeout}
                      onChange={handleInputChange}
                      min="1"
                      max="1440"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="form-section">
                <h2>Notification Settings</h2>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={formData.emailNotifications}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Email Notifications
                  </label>
                </div>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      checked={formData.smsNotifications}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    SMS Notifications
                  </label>
                </div>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="pushNotifications"
                      checked={formData.pushNotifications}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Push Notifications
                  </label>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === "payment" && (
              <div className="form-section">
                <h2>Payment Settings</h2>
                <div className="form-group">
                  <label htmlFor="currency">Currency</label>
                  <select
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="taxRate">Tax Rate (%)</label>
                    <input
                      type="number"
                      id="taxRate"
                      name="taxRate"
                      value={formData.taxRate}
                      onChange={handleInputChange}
                      step="0.1"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="shippingCost">
                      Standard Shipping Cost ($)
                    </label>
                    <input
                      type="number"
                      id="shippingCost"
                      name="shippingCost"
                      value={formData.shippingCost}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="form-actions">
              <button type="button" className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-save">
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
