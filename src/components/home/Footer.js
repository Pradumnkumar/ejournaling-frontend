import React from 'react';
// import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="contact-info">
        <p>Career Voyager</p>
        <p>500 Terry Francine Street, 6th Floor, San Francisco, CA 94158</p>
        <p>info@mysite.com</p>
        <p>123-456-7890</p>
      </div>
      <div className="subscribe">
        <p>Stay up-to-date with our latest insights</p>
        <input type="email" placeholder="Your email address *" />
        <button>Subscribe</button>
        <p>Thank you for subscribing!</p>
      </div>
    </footer>
  );
};

export default Footer;
