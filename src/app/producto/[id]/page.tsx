'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Re-using mock data from page.tsx to maintain consistency
const mockProductos = [
  {
    id: 1,
    nombre: 'Chaqueta Lunar',
    precio: 120,
    categoria: 'Ropa',
    imagen_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    descripcion: 'Diseño avanzado con materiales transpirables, pensada para la nueva era urbana. Cada costura refleja la esencia minimalista de Exploarte.',
  },
  {
    id: 2,
    nombre: 'Escultura Viva',
    precio: 350,
    categoria: 'Arte',
    imagen_url: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=800&q=80',
    video_url: 'https://cdn.pixabay.com/video/2020/05/11/38600-420235948_tiny.mp4', 
    descripcion: 'Una pieza única que desafía las perspectivas. El arte de Exploarte se materializa en formas fluidas y dinámicas.',
  },
  {
    id: 3,
    nombre: 'Gafas NeoHorizon',
    precio: 85,
    categoria: 'Accesorios',
    imagen_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
    descripcion: 'Polarización completa con un marco ultraligero que pasa desapercibido en el peso, pero nunca en el diseño.',
  },
  {
    id: 4,
    nombre: 'Lienzo en Movimiento',
    precio: 500,
    categoria: 'Arte',
    imagen_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    video_url: 'https://cdn.pixabay.com/video/2021/08/25/86274-593644482_tiny.mp4',
    descripcion: 'Cuadro híbrido con texturas que parecen bailar con la iluminación ambiental.',
  },
  {
    id: 5,
    nombre: 'Bolso Geométrico',
    precio: 145,
    categoria: 'Accesorios',
    imagen_url: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80',
    descripcion: 'Inspirado en estructuras arquitectónicas, este accesorio ofrece versatilidad y una estética brutalista limpia.',
  },
  {
    id: 6,
    nombre: 'Sudadera Minimal',
    precio: 90,
    categoria: 'Ropa',
    imagen_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
    descripcion: 'Algodón puro y corte ancho para favorecer la comodidad y la expresión de un estilo libre.',
  }
];

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const p = mockProductos.find(x => x.id === Number(id));
      if (p) setProducto(p);
    }
  }, [id]);

  if (!producto) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white flex flex-col">
      
      {/* HEADER MINIMALISTA */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-6 md:px-12 flex items-center justify-between">
        <div className="w-1/3 flex items-center">
          <Link href="/" className="text-xs uppercase tracking-widest font-medium hover:opacity-50 transition-opacity flex items-center gap-2 group">
            <span className="text-lg leading-none group-hover:-translate-x-1 transition-transform">←</span>
            Volver
          </Link>
        </div>
        <div className="w-1/3 text-center">
          <Link href="/" className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase origin-center hover:scale-[1.02] transition-transform inline-block">
            Exploarte
          </Link>
        </div>
        <div className="w-1/3 flex justify-end"></div>
      </header>

      {/* DETALLE REDISEÑADO CLEAN */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-center">
        
        {/* MEDIA: Imagen o Video */}
        <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden shadow-2xl">
          {producto.video_url ? (
            <video 
              src={producto.video_url} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={producto.imagen_url} 
              alt={producto.nombre} 
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* INFO PRODUCTO */}
        <div className="flex flex-col justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-6">{producto.categoria}</p>
          <h1 className="text-5xl md:text-6xl font-light tracking-tighter uppercase leading-none mb-8">
            {producto.nombre}
          </h1>
          <p className="text-3xl font-light tracking-widest mb-12 border-b border-gray-100 pb-12 inline-block">
            {producto.precio}€
          </p>

          <p className="text-sm leading-relaxed text-gray-500 font-medium mb-16 max-w-md">
            {producto.descripcion}
          </p>

          {/* BOTÓN FALSO DE COMPRA / CONTACTO -> Para la "Landing page sin pasarela" */}
          <button className="bg-black text-white w-full py-6 text-xs uppercase tracking-[0.2em] hover:bg-black/80 transition-colors flex justify-center items-center gap-4 group">
            Contactar para adquirir
            <span className="font-light text-lg group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>

      </main>

    </div>
  );
}