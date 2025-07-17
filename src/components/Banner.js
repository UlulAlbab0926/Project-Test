'use client';
import { useEffect, useState } from 'react';

export default function Banner({ imageUrl }) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[400px] overflow-hidden">
      {/* Gambar Latar dengan overlay gelap */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${offsetY * 0.3}px)`
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
      </div>

      {/* Teks Tengah */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10"
        style={{
          transform: `translateY(${offsetY * 0.1}px)`
        }}
      >
        <h1 className="text-5xl font-bold tracking-wide">Ideas</h1>
        <p className="text-lg mt-2">Where all our great things begin</p>
      </div>

      {/* Potongan Miring di Bawah */}
      <div
      className="absolute bottom-[-40px] left-0 w-[115%] h-20 bg-white rotate-[-2deg] origin-bottom z-20" 
      style={{boxShadow: '0 -1px 5px rgba(0,0,0,0.1)'}}/>
    </section>
  );
}