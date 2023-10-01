import React from 'react';
import "./FooterLinks.scss";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FooterLinks = () => {
  return (
    <>
        <section className="contact-section">
            <div className="container contact">
                <div className="contact-icon">
                    <FaFacebookF className="i" />
                    <FaTwitter className="i" />
                    <FaInstagram className="i" />
                    <FaYoutube className="i" />
                </div>
                <h2>Let's Talk?</h2>
                <Link to="#home" className="btn btn-dark">Make an enquiry!</Link>
            </div>
        </section>
    </>
  )
}

export default FooterLinks
