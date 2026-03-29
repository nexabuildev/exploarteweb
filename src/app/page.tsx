'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

// Categorías completas solicitadas
const categorias = [
  'Todas', 
  'Sublimación', 
  'Serigrafía', 
  'Impresión Digital', 
  'Papelería', 
  'Estampados', 
  'Rotulación', 
  'Diseño Gráfico'
];

// Datos demostrativos para la visualización (adaptados a los nuevos servicios)
const mockProductos = [
  {
    id: 1,
    nombre: 'Rotulación de Furgoneta',
    precio: 'A medida',
    categoria: 'Rotulación',
    imagen_url: 'https://images.unsplash.com/photo-1590212151175-e58edd96185b?w=800&q=80',
  },
  {
    id: 2,
    nombre: 'Pack 50 Camisetas',
    precio: 'Desde 250',
    categoria: 'Sublimación',
    imagen_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    video_url: 'https://cdn.pixabay.com/video/2021/08/25/86274-593644482_tiny.mp4', 
  },
  {
    id: 3,
    nombre: '1000 Tarjetas de Visita',
    precio: 'Desde 45',
    categoria: 'Papelería',
    imagen_url: 'https://images.unsplash.com/photo-1588702545981-d61a78fdadae?w=800&q=80',
  },
  {
    id: 4,
    nombre: 'Bolsas Estampadas DTF',
    precio: 'Desde 12',
    categoria: 'Estampados',
    imagen_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
    video_url: 'https://cdn.pixabay.com/video/2020/05/11/38600-420235948_tiny.mp4',
  },
  {
    id: 5,
    nombre: 'Lonas Gran Formato',
    precio: 'Por m2',
    categoria: 'Impresión Digital',
    imagen_url: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&q=80',
  },
  {
    id: 6,
    nombre: 'Diseño de Logotipo',
    precio: 'Desde 150',
    categoria: 'Diseño Gráfico',
    imagen_url: 'https://images.unsplash.com/photo-1626785776985-6e06cb321151?w=800&q=80',
  }
];

export default function ExploarteCatalog() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  // Lógica combinada de Filtrado + Búsqueda
  let productosFiltrados = mockProductos;
  
  if (categoriaActiva !== 'Todas') {
    productosFiltrados = productosFiltrados.filter(p => p.categoria === categoriaActiva);
  }

  if (busqueda.trim() !== '') {
    const q = busqueda.toLowerCase();
    productosFiltrados = productosFiltrados.filter(p => 
      p.nombre.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q)
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#D4AF37] selection:text-white">
      
      {/* HEADER MINIMALISTA */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-6 md:px-12 flex items-center justify-between transition-all">
        
        <div className="w-1/3 flex items-center">
          <button 
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="group flex gap-2 items-center text-xs tracking-widest uppercase font-medium hover:text-[#D4AF37] transition-colors"
          >
            <span className="w-4 h-px bg-black group-hover:bg-[#D4AF37] transition-all"></span>
            Menú
          </button>
        </div>

        {/* LOGO CENTRAL */}
        <div className="w-1/3 text-center">
          <Link href="/" className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase origin-center hover:scale-[1.02] transition-transform inline-block group">
            Explo<span className="text-[#D4AF37] font-medium transition-colors">arte</span>
          </Link>
        </div>

        {/* ESPACIO DERECHO */}
        <div className="w-1/3 flex justify-end gap-6">
          <a href="#info" className="text-xs uppercase tracking-widest font-medium hover:text-[#D4AF37] transition-colors hidden sm:block">
            Info
          </a>
          <a href="#contacto" className="text-xs uppercase tracking-widest font-medium hover:text-[#D4AF37] transition-colors">
            Contacto
          </a>
        </div>
        
      </header>

      {/* BARRA DE BÚSQUEDA Y FILTRADO */}
      <div className="bg-[#fafafa] border-b border-gray-100 py-4 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
          
          {/* Input Buscador */}
          <div className="w-full md:w-1/3 relative">
            <input 
              type="text" 
              placeholder="BUSCAR (EJ. CAMISETAS, VINILO...)" 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 py-2 text-[10px] md:text-xs tracking-[0.2em] uppercase outline-none focus:border-[#D4AF37] transition-colors"
            />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30 text-xs">🔍</span>
          </div>

          {/* Filtros de Categoría Rápidos (Scroll Horizontal en móvil) */}
          <div className="w-full md:flex-1 flex overflow-x-auto no-scrollbar gap-6 md:justify-end text-[9px] uppercase tracking-[0.2em]">
            {categorias.slice(0, 6).map(c => (
              <button 
                key={c} 
                onClick={() => setCategoriaActiva(c)} 
                className={`whitespace-nowrap transition-colors border-b-2 pb-1 ${
                  categoriaActiva === c ? 'text-[#D4AF37] border-[#D4AF37] font-bold' : 'text-gray-400 border-transparent hover:text-black'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* MENÚ DESPLEGABLE COMPLETO */}
      <div 
        className={`fixed top-[81px] md:top-[85px] left-0 w-full bg-[#111] text-white z-40 border-b border-[#D4AF37]/20 overflow-hidden transition-all duration-500 ease-in-out ${
          menuAbierto ? 'max-h-[500px] py-16 opacity-100' : 'max-h-0 py-0 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] mb-8 ml-2">Todas las Categorías</p>
          <div className="flex flex-wrap gap-8 md:gap-12">
            {categorias.map(cat => (
              <button 
                key={cat}
                onClick={() => {
                  setCategoriaActiva(cat);
                  setMenuAbierto(false);
                }}
                className={`text-2xl md:text-4xl font-light tracking-tight transition-all hover:translate-x-2 ${
                  categoriaActiva === cat ? 'text-[#D4AF37] opacity-100' : 'opacity-50 hover:opacity-100 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* OVERLAY DEL MENU */}
      {menuAbierto && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30" onClick={() => setMenuAbierto(false)} />}

      {/* GRID DE PRODUCTOS / SERVICIOS */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-16 md:py-24 min-h-[50vh]">
        {productosFiltrados.length === 0 ? (
          <div className="text-center text-gray-400 py-32 tracking-[0.2em] text-xs uppercase">
            No hay resultados para "{busqueda}" en {categoriaActiva}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-16 md:gap-x-8 md:gap-y-24">
            {productosFiltrados.map((prod) => (
              <ProductCard key={prod.id} producto={prod} />
            ))}
          </div>
        )}
      </main>

      {/* SECCIÓN INFO / ACERCA DEL DISEÑADOR */}
      <section id="info" className="bg-[#050505] text-white py-24 md:py-32 border-t border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="mb-16">
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-medium mb-4">Dirección Creativa</p>
            <h2 className="text-4xl md:text-6xl font-light tracking-[0.1em] uppercase mb-2 leading-tight">
              Andrés <span className="text-[#D4AF37] font-medium">Castaño</span>
            </h2>
            <p className="text-sm tracking-widest uppercase text-gray-400">
              Diseñador Gráfico en General
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 text-sm font-light tracking-wide text-gray-300">
            
            {/* GRUPO 1 */}
            <div className="space-y-12">
              <div>
                <h4 className="text-[#D4AF37] uppercase tracking-[0.2em] text-[10px] font-bold mb-4 border-b border-dashed border-gray-800 pb-3">Papelería</h4>
                <ul className="space-y-3">
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Flyers</li>
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Tarjetas de visita</li>
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Factura membretada</li>
                </ul>
              </div>

              <div>
                <h4 className="text-[#D4AF37] uppercase tracking-[0.2em] text-[10px] font-bold mb-4 border-b border-dashed border-gray-800 pb-3">Impresión Digital</h4>
                <ul className="space-y-3">
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Gran Formato</li>
                </ul>
              </div>
            </div>

            {/* GRUPO 2 */}
            <div className="space-y-12">
              <div>
                <h4 className="text-[#D4AF37] uppercase tracking-[0.2em] text-[10px] font-bold mb-4 border-b border-dashed border-gray-800 pb-3">Sublimación</h4>
                <ul className="space-y-3">
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Camisetas</li>
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Tazas</li>
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Gorras</li>
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Llaveros</li>
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Artículos de souvenir</li>
                </ul>
              </div>

              <div>
                <h4 className="text-[#D4AF37] uppercase tracking-[0.2em] text-[10px] font-bold mb-4 border-b border-dashed border-gray-800 pb-3">Serigrafía</h4>
                <ul className="space-y-3">
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Bolsas estampadas</li>
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Camisetas</li>
                </ul>
              </div>
            </div>

            {/* GRUPO 3 */}
            <div className="space-y-12">
              <div>
                <h4 className="text-[#D4AF37] uppercase tracking-[0.2em] text-[10px] font-bold mb-4 border-b border-dashed border-gray-800 pb-3">Rotulación</h4>
                <ul className="space-y-3">
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Furgonetas</li>
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Escaparates</li>
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Cristales</li>
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Coches</li>
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Autobuses</li>
                </ul>
              </div>

              <div>
                <h4 className="text-[#D4AF37] uppercase tracking-[0.2em] text-[10px] font-bold mb-4 border-b border-dashed border-gray-800 pb-3">Estampados</h4>
                <ul className="space-y-3">
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>DTF</li>
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Vinilo textil</li>
                  <li className="flex gap-4 items-center group"><span className="w-4 h-px bg-[#D4AF37] group-hover:w-6 transition-all"></span>Serigrafía</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN CONTACTO */}
      <section id="contacto" className="max-w-3xl mx-auto px-6 md:px-12 py-24 my-12">
        <div className="text-center mb-16">
          <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-medium mb-2">Solicita Presupuesto</p>
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.2em] uppercase mb-4">Contact</h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Ponte en contacto para solicitar cualquier tipo de encargo.</p>
          
          {/* DATOS DE CONTACTO DIRECTO */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-xs md:text-sm font-bold tracking-widest text-gray-800">
            <a href="tel:+34641183574" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
              <span className="text-lg">📱</span> +34 641 18 35 74
            </a>
            <span className="hidden md:inline text-gray-300">|</span>
            <a href="mailto:exploarte.esp@gmail.com" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors hover:uppercase">
              <span className="text-lg">✉️</span> exploarte.esp@gmail.com
            </a>
          </div>
        </div>

        <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col gap-10">
          <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
          <input type="hidden" name="subject" value="Nuevo mensaje (Presupuesto/Consulta) desde Exploarte" />

          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1">
              <input type="text" name="name" required placeholder="Tu Nombre" className="w-full bg-transparent border-b border-gray-300 py-4 text-sm font-light tracking-wide outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
            <div className="flex-1">
              <input type="email" name="email" required placeholder="Tu Email" className="w-full bg-transparent border-b border-gray-300 py-4 text-sm font-light tracking-wide outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
          </div>
          
          <div>
            <textarea name="message" required placeholder="Dime qué necesitas (ej. Vinilo para furgoneta, Pack de 20 camisetas...)" rows={4} className="w-full bg-transparent border-b border-gray-300 py-4 text-sm font-light tracking-wide outline-none focus:border-[#D4AF37] transition-colors resize-none"></textarea>
          </div>

          <button type="submit" className="mt-4 bg-black text-[#D4AF37] w-full py-5 text-xs uppercase tracking-[0.3em] font-medium hover:bg-[#D4AF37] hover:text-black transition-colors shadow-2xl">
            Enviar Mensaje
          </button>
        </form>
      </section>

      {/* FOOTER MINIMALISTA */}
      <footer className="border-t border-[#D4AF37]/20 py-16 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#050505] text-white">
        <div className="text-[10px] uppercase tracking-[0.3em] font-medium text-gray-500">
          © {new Date().getFullYear()} Exploarte
        </div>
        
        {/* ICONOS RRSS Dorados */}
        <div className="flex items-center gap-8 text-[#D4AF37]">
          {/* Instagram */}
          <a href="#" className="hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          {/* Twitter (X) */}
          <a href="#" className="hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
            </svg>
          </a>
          {/* TikTok */}
          <a href="#" className="hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a5 5 0 0 0 -5 -5 5 5 0 0 0 -1 2v9a6 6 0 1 1 -6 -6c1 0 2 1 3 2"></path>
            </svg>
          </a>
        </div>
        
        <div className="text-[10px] uppercase tracking-[0.3em] font-medium text-gray-500">
          Andrés Castaño
        </div>
      </footer>

    </div>
  );
}

// COMPONENTE TARJETA DE PRODUCTO
function ProductCard({ producto }: { producto: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo] = useState(!!producto.video_url);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div 
      className="group flex flex-col cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Contenedor Multimedia */}
      <div className="relative aspect-[3/4] md:aspect-[4/5] bg-gray-50 overflow-hidden mb-6 border border-transparent group-hover:border-[#D4AF37]/30 transition-colors">
        
        {/* Imagen de Fondo (Escala sutil en hover) */}
        <img 
          src={producto.imagen_url} 
          alt={producto.nombre}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${
            hasVideo ? 'group-hover:opacity-0' : 'group-hover:scale-110'
          }`}
        />

        {/* Video Superpuesto (Si existe, aparece en hover) */}
        {hasVideo && (
          <video
            ref={videoRef}
            src={producto.video_url}
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
          />
        )}
      </div>

      {/* Info Producto */}
      <div className="flex justify-between items-start px-1 group-hover:text-[#D4AF37] transition-colors">
        <div>
          <h3 className="text-sm font-medium tracking-wide uppercase">{producto.nombre}</h3>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-1 group-hover:text-[#D4AF37]/70 transition-colors">{producto.categoria}</p>
        </div>
        <p className="text-sm font-light tracking-widest">{producto.precio}€</p>
      </div>
    </div>
  );
}