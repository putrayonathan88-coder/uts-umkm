import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
    <Navbar/>
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">Tentang Kami</h1>
        <p className="about-text">
          Awalnya, <strong>Mitra S</strong> berdiri dari sebuah usaha kecil yang dimulai 
          dengan tambahan modal yang sederhana. Berawal dari keinginan untuk menghadirkan 
          minuman segar berkualitas bagi masyarakat sekitar, kami memulai langkah pertama 
          dengan peralatan seadanya dan bahan yang terbatas. Namun berkat semangat, kerja 
          keras, dan keyakinan bahwa produk alami akan selalu dicintai, usaha ini terus 
          tumbuh dan berkembang sedikit demi sedikit.
          <br />
          Kini, setelah <strong>lebih dari 4 tahun berjalan, Mitra S</strong> telah menjadi 
          usaha minuman segar yang dipercaya oleh banyak pelanggan. Kami dikenal karena cita 
          rasa alami, pelayanan yang ramah, dan komitmen terhadap kualitas di setiap produk yang kami buat.
          <strong></strong>
          <br />
          Kami menggunakan bahan-bahan buah pilihan yang segar setiap hari, tanpa bahan pengawet 
          dan tanpa pemanis buatan — hanya kebaikan murni dari alam yang kami sajikan di setiap gelas.
        </p>

        <p className="about-text">
          Kami percaya bahwa kesegaran dan kejujuran dalam setiap racikan adalah kunci untuk 
          memberikan kepuasan kepada pelanggan. Karena itu, setiap jus kami dibuat dengan sepenuh 
          hati untuk menghadirkan energi positif, kebahagiaan, dan kesegaran alami di setiap tegukan.
          <br />
          Dengan dukungan pelanggan setia dan dedikasi seluruh tim, kami terus berinovasi 
          menghadirkan menu baru yang sehat, menyegarkan, dan terjangkau. <strong>Mitra S</strong>
          bukan hanya tentang minuman, tetapi juga tentang semangat, kerja keras, dan cinta terhadap alam. 🍊🍓🥭
        </p>

        <p className="about-footer">
          🌿 <em>"Kami Ada Karena Rasa — Dari Alam untuk Anda."</em>
        </p>

        <div className='images'>
           <img className='img' src="src/assets/gambar1.jpeg" alt="" />
           <img className='img' src="src/assets/gambar2.jpeg" alt="" />
           <img className='img' src="src/assets/gambar3.jpeg" alt="" />
        </div>
      </div>
    </div>
    <Footer/>
    </>
    
  )
}
