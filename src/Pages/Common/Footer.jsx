import React from 'react';
import "../../scss/footer.scss"
import { Link } from 'react-router-dom';


export function Footer() {
    return (
        <div className="footer-container">
            <p className="footer-text">Copyright © 2024 Utthira. All rights reserved.</p>
            {/* Link to the Dashboard page (or Terms of Use page, modify as needed) */}
            <Link to="/TermsOfUse" target='_blank' className="footer-link">
                Terms of Use
            </Link>
        </div>
    );
}