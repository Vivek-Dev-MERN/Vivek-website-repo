import React, { useState } from "react";
import "./Contact.css";
import { send } from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (formData.name && formData.email && formData.message) {
      // Send email using EmailJS
      send(
        "service_nqkkht5", // Replace with your EmailJS service ID
        "template_t1yqbeu", // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        "pAyJGRb4Y4ZmURpmU" // Replace with your EmailJS public key
      )
        .then(() => {
          setStatus("Thank you for reaching out! I will get back to you soon.");
          setFormData({ name: "", email: "", message: "" }); // Reset form
        })
        .catch(() => {
          setStatus("Something went wrong. Please try again later.");
        });
    } else {
      setStatus("Please fill out all fields.");
    }
  };

  return (
    <section id="contact" className="contact">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="btn">
          Send Message
        </button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </section>
  );
};

export default Contact;
