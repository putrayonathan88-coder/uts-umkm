import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-title">Mitra S</h3>
        <p className="footer-address">
          📍 43VC+72X, Jl. Jend. Sudirman, Padarni, Kec. Manokwari Bar., Kabupaten Manokwari, Papua Bar. 98312  
          <br />
          ☎️ 0853-4426-9006
        </p>

        <div className="social-icons">
          <a><FaFacebook /></a>
          <a><FaInstagram /></a>
          <a><FaWhatsapp /></a>
        </div>
      </div>
    </footer>
  );
}
