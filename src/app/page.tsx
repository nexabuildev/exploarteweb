'use client';

import { useState, useRef, useEffect } from 'react';
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

// Datos demostrativos (adaptados a los nuevos servicios)
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
  const [scrolled, setScrolled] = useState(false);

  // Efecto para detectar el scroll y comprimir el header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      
      {/* HEADER DINÁMICO Y RESPONSIVE */}
      <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 lg:px-12 flex items-center justify-between transition-all duration-500 ${scrolled ? 'py-4 shadow-sm' : 'py-6 md:py-8'}`}>
        
        {/* IZQUIERDA: BURGER MENU MODERNO */}
        <div className="w-1/4 sm:w-1/3 flex items-center">
          <button 
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="group flex gap-3 items-center text-[10px] tracking-[0.3em] uppercase font-bold hover:text-[#D4AF37] transition-colors"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span className={`h-[1px] bg-black transition-all group-hover:bg-[#D4AF37] ${menuAbierto ? 'rotate-45 translate-y-[3.5px]' : ''}`}></span>
              <span className={`h-[1px] bg-black transition-all group-hover:bg-[#D4AF37] ${menuAbierto ? '-rotate-45 -translate-y-[3.5px]' : ''}`}></span>
            </div>
            <span className="hidden sm:inline">Menú</span>
          </button>
        </div>

        {/* LOGO CENTRAL (NUEVO LOGO DE MARCA) */}
        <div className="w-2/4 sm:w-1/3 flex justify-center">
          <Link href="/" className="origin-center hover:scale-[1.05] transition-transform inline-block group">
            <img 
              src="/logo.png" 
              alt="Exploarte Logo" 
              className="h-14 sm:h-20 md:h-28 w-auto object-contain drop-shadow-sm" 
              onError={(e) => {
                // Fallback en caso de que la imagen no cargue
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<span class="text-xl sm:text-2xl font-light tracking-[0.2em] uppercase">Explo<span class="text-[#D4AF37] font-medium">arte</span></span>';
              }}
            />
          </Link>
        </div>

        {/* DERECHA: CONTACTO (SE OCULTA EN MOVIL EXTREMO) */}
        <div className="w-1/4 sm:w-1/3 flex justify-end gap-4 md:gap-8">
          <a href="#info" className="text-[10px] uppercase tracking-widest font-bold hover:text-[#D4AF37] transition-colors hidden md:block">
            Info
          </a>
          <a href="#contacto" className="text-[10px] sm:text-[10px] uppercase tracking-widest font-bold hover:text-[#D4AF37] transition-colors">
            {scrolled ? 'Contacto' : 'Solicitar'}
          </a>
        </div>
        
      </header>

      {/* BARRA DE BÚSQUEDA Y FILTRADO (UI POLISHED) */}
      <div className="bg-[#fafafa] border-b border-gray-100 py-6 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-8 items-center justify-between">
          
          {/* Input Buscador (Más largo en desktop) */}
          <div className="w-full lg:w-96 relative group">
            <input 
              type="text" 
              placeholder="¿Qué estás buscando?..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-transparent border-b border-gray-200 py-3 text-[10px] md:text-xs tracking-[0.2em] uppercase outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-300"
            />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">🔍</span>
          </div>

          {/* Filtros de Categoría (Scroll elegante) */}
          <div className="w-full lg:flex-1 flex overflow-x-auto no-scrollbar gap-8 lg:justify-end text-[10px] uppercase tracking-[0.2em] pb-2 md:pb-0">
            {categorias.map(c => (
              <button 
                key={c} 
                onClick={() => setCategoriaActiva(c)} 
                className={`whitespace-nowrap transition-all border-b-2 pb-2 ${
                  categoriaActiva === c ? 'text-[#D4AF37] border-[#D4AF37] font-black' : 'text-gray-400 border-transparent hover:text-black hover:translate-y-[-1px]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* MENÚ DESPLEGABLE FULLSCREEN EN MÓVIL */}
      <div 
        className={`fixed top-0 left-0 w-full h-[100dvh] bg-black text-white z-[60] flex items-center justify-center transition-all duration-700 ease-in-out ${
          menuAbierto ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <button 
          onClick={() => setMenuAbierto(false)}
          className="absolute top-8 right-8 text-[#D4AF37] text-xs uppercase tracking-[0.4em] hover:text-white transition-colors"
        >
          Cerrar ✕
        </button>
        
        <div className="w-full max-w-5xl mx-auto px-8 py-20 overflow-y-auto max-h-full">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-12 text-center opacity-60">Servicios Disponibles</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-center md:text-left">
            {categorias.map(cat => (
              <button 
                key={cat}
                onClick={() => {
                  setCategoriaActiva(cat);
                  setMenuAbierto(false);
                }}
                className={`text-3xl sm:text-5xl lg:text-7xl font-light tracking-tighter transition-all hover:text-[#D4AF37] transform hover:translate-x-4 inline-block ${
                  categoriaActiva === cat ? 'text-[#D4AF37] font-normal' : 'text-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-12 border-t border-zinc-900 pt-12">
             <a href="#info" onClick={() => setMenuAbierto(false)} className="text-xs uppercase tracking-widest hover:text-[#D4AF37] transition-colors">Info</a>
             <a href="#contacto" onClick={() => setMenuAbierto(false)} className="text-xs uppercase tracking-widest hover:text-[#D4AF37] transition-colors">Contacto</a>
             <a href="tel:+34641183574" className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest">+34 641 183 574</a>
          </div>
        </div>
      </div>

      {/* GRID DE PRODUCTOS (ULTRA-WIDE OPTIMIZED) */}
      <main className="max-w-[2200px] mx-auto px-4 sm:px-8 md:px-12 py-16 md:py-24 lg:py-32 min-h-[60vh]">
        {productosFiltrados.length === 0 ? (
          <div className="text-center text-gray-300 py-32 tracking-[0.4em] text-[10px] uppercase">
             ( Sin resultados )
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-20 md:gap-x-10 md:gap-y-32">
            {productosFiltrados.map((prod) => (
              <ProductCard key={prod.id} producto={prod} />
            ))}
          </div>
        )}
      </main>

      {/* SECCIÓN INFO (FLUIDA) */}
      <section id="info" className="bg-[#050505] text-white py-24 sm:py-32 lg:py-48 border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          
          <div className="mb-24 md:mb-32">
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-medium mb-6 opacity-80">Dirección Creativa</p>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-extralight tracking-tight uppercase mb-4 leading-[0.9] text-zinc-100">
               Catálogo <span className="text-[#D4AF37] font-medium">Completo</span>
            </h2>
            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-zinc-500 mt-8">
              Andrés Castaño | Servicios Gráficos Premium
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24">
            
            {/* SERVICIOS 1 */}
            <div className="group">
              <h4 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black mb-8 border-b border-zinc-800 pb-4">Técnicas Clásicas</h4>
              <ul className="space-y-4 text-xs tracking-[0.2em] font-light text-zinc-400">
                {['Sublimación Especializada', 'Serigrafía Textil', 'Impresión Digital Gran Formato', 'Papelería Corporativa'].map(item => (
                  <li key={item} className="flex gap-4 items-center group-hover:text-white transition-colors">
                    <span className="w-6 h-[0.5px] bg-[#D4AF37] opacity-40"></span>{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* SERVICIOS 2 */}
            <div className="group">
              <h4 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black mb-8 border-b border-zinc-800 pb-4">Rotulación Profesional</h4>
              <ul className="space-y-4 text-xs tracking-[0.2em] font-light text-zinc-400">
                {['Flotas de Vehículos', 'Escaparates de Lujo', 'Interiores y Murales', 'Sistemas de Señalética'].map(item => (
                  <li key={item} className="flex gap-4 items-center group-hover:text-white transition-colors">
                    <span className="w-6 h-[0.5px] bg-[#D4AF37] opacity-40"></span>{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* SERVICIOS 3 */}
            <div className="group">
              <h4 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black mb-8 border-b border-zinc-800 pb-4">Nuevas Tecnologías</h4>
              <ul className="space-y-4 text-xs tracking-[0.2em] font-light text-zinc-400">
                {['Impresión DTF Directa', 'Vinilo de Corte Premium', 'Diseño Identidad Visual', 'Branding Estratégico'].map(item => (
                  <li key={item} className="flex gap-4 items-center group-hover:text-white transition-colors">
                    <span className="w-6 h-[0.5px] bg-[#D4AF37] opacity-40"></span>{item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN CONTACTO (OPTIMIZADA) */}
      <section id="contacto" className="max-w-4xl mx-auto px-6 sm:px-12 py-32 md:py-48 my-12">
        <div className="text-center mb-24">
          <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-bold mb-4">Presupuestos a medida</p>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tighter uppercase mb-6 text-zinc-900 leading-none">
             Let's <span className="font-bold underline decoration-[#D4AF37]/30 decoration-8 underline-offset-8">Talk</span>
          </h2>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-10 text-[10px] md:text-xs font-black tracking-[0.3em] text-zinc-900 border-y border-zinc-100 py-10">
            <a href="tel:+34641183574" className="hover:text-[#D4AF37] transition-all transform hover:scale-105">PHONE: +34 641 18 35 74</a>
            <a href="mailto:exploarte.esp@gmail.com" className="hover:text-[#D4AF37] transition-all transform hover:scale-105">EMAIL: EXPLOARTE.ESP@GMAIL.COM</a>
          </div>
        </div>

        <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col gap-12">
          <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE"} />
          <input type="hidden" name="subject" value="Solicitud de Proyecto - Exploarte" />
          <input type="hidden" name="from_name" value="Exploarte Web" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group relative">
              <label className="absolute -top-6 left-0 text-[8px] uppercase tracking-widest text-[#D4AF37] opacity-0 group-focus-within:opacity-100 transition-all font-bold">NOMBRE COMPLETO</label>
              <input type="text" name="name" required placeholder="TU NOMBRE" className="w-full bg-transparent border-b border-zinc-200 py-4 text-xs font-light tracking-[0.2em] outline-none focus:border-[#D4AF37] transition-all placeholder:text-zinc-300" />
            </div>
            <div className="group relative">
              <label className="absolute -top-6 left-0 text-[8px] uppercase tracking-widest text-[#D4AF37] opacity-0 group-focus-within:opacity-100 transition-all font-bold">CORREO ELECTRÓNICO</label>
              <input type="email" name="email" required placeholder="TU EMAIL" className="w-full bg-transparent border-b border-zinc-200 py-4 text-xs font-light tracking-[0.2em] outline-none focus:border-[#D4AF37] transition-all placeholder:text-zinc-300" />
            </div>
          </div>
          
          <div className="group relative">
             <label className="absolute -top-6 left-0 text-[8px] uppercase tracking-widest text-[#D4AF37] opacity-0 group-focus-within:opacity-100 transition-all font-bold">DETALLES DEL PROYECTO</label>
             <textarea name="message" required placeholder="EXPLÍCAME TU PROYECTO..." rows={4} className="w-full bg-transparent border-b border-zinc-200 py-4 text-xs font-light tracking-[0.2em] outline-none focus:border-[#D4AF37] transition-all placeholder:text-zinc-300 resize-none"></textarea>
          </div>

          <button type="submit" className="mt-12 group relative overflow-hidden bg-black text-[#D4AF37] py-6 sm:py-8 text-xs uppercase tracking-[0.5em] font-black transition-all hover:bg-zinc-900 border border-black hover:border-[#D4AF37]/50">
             <span className="relative z-10">Enviar Propuesta</span>
             <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-10"></div>
          </button>
        </form>
      </section>

      {/* FOOTER (CLEAN) */}
      <footer className="bg-black text-white py-12 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-10 border-t border-zinc-900">
        <div className="text-[9px] uppercase tracking-[0.4em] font-medium text-zinc-600">
          © {new Date().getFullYear()} Exploarte Digital Catalog
        </div>
        
        <div className="flex items-center gap-10">
          {['Instagram', 'Twitter', 'TikTok'].map(sm => (
            <a key={sm} href="#" className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold hover:text-white transition-all transform hover:-translate-y-1">{sm}</a>
          ))}
        </div>
        
        <div className="text-[9px] uppercase tracking-[0.4em] font-medium text-zinc-400">
          By Andrés Castaño
        </div>
      </footer>

    </div>
  );
}

// COMPONENTE TARJETA DE PRODUCTO (POLISHED)
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
      <div className="relative aspect-[4/5] bg-zinc-50 overflow-hidden mb-8 transform transition-all duration-[2s] group-hover:shadow-[0_45px_100px_-20px_rgba(212,175,55,0.15)]">
        
        {/* Imagen de Fondo */}
        <img 
          src={producto.imagen_url} 
          alt={producto.nombre}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ease-out ${
            hasVideo ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-110'
          }`}
        />

        {/* Video Superpuesto */}
        {hasVideo && (
          <video
            ref={videoRef}
            src={producto.video_url}
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out"
          />
        )}
        
        {/* Badge Categoria (Sutil) */}
        <div className="absolute top-4 left-4 text-[7px] uppercase tracking-[0.3em] font-black bg-white/10 backdrop-blur-sm text-black px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
           {producto.categoria}
        </div>
      </div>

      {/* Info Producto */}
      <div className="flex justify-between items-start pt-2 border-t border-transparent group-hover:border-zinc-100 transition-all duration-700">
        <div className="flex-1">
          <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-zinc-900 group-hover:text-[#D4AF37] transition-colors duration-500">{producto.nombre}</h3>
          <p className="text-[9px] text-zinc-400 tracking-[0.2em] uppercase mt-2 group-hover:text-zinc-600 transition-colors duration-500">{producto.categoria}</p>
        </div>
        <div className="text-right">
           <p className="text-xs font-black tracking-widest text-zinc-900 opacity-10 group-hover:opacity-100 transition-opacity duration-1000">DETAIL</p>
           <p className="text-[10px] font-light tracking-tighter text-zinc-400 mt-1">{producto.precio}€</p>
        </div>
      </div>
    </div>
  );
}