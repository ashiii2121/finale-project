import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="contact__address">
              <h5>Contact Info</h5>
              <ul>
                <li>
                  <h6>
                    <i className="fa fa-map-marker"></i> Address
                  </h6>
                  <p>160 Pennsylvania Ave NW, Washington, USA</p>
                </li>
                <li>
                  <h6>
                    <i className="fa fa-phone"></i> Phone
                  </h6>
                  <span>+1 234 567 8901</span>
                  <span>+1 234 567 8902</span>
                </li>
                <li>
                  <h6>
                    <i className="fa fa-headphones"></i> Support
                  </h6>
                  <p>Support@ashion.com</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="contact__form">
              <h5>Send Message</h5>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <button type="submit" className="site-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
