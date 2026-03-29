'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { supabase } from '@/bibliotecas/supabase';
import { ThemeToggle } from '@/componentes/ThemeToggle';
import { useTheme } from '@/bibliotecas/providers';

const mockServicios = [
  {
    id: 'm1',
    nombre: 'Rotulación Vehicular Ultra',
    categoria: 'Rotulación',
    descripcion: 'Vinilos de alta durabilidad para flotas premium.',
    imagen_url: 'https://images.unsplash.com/photo-1590212151175-e58edd96185b?w=800&q=80',
    precio: 'Desde 150€'
  },
  {
    id: 'm2',
    nombre: 'Sublimación de Tazas Premium',
    categoria: 'Sublimación',
    descripcion: 'Personalización de alta definición con acabados únicos.',
    imagen_url: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&q=80',
    precio: '12€ / unidad'
  },
  {
    id: 'm3',
    nombre: 'Diseño de Marca (Branding)',
    categoria: 'Diseño',
    descripcion: 'Identidad visual completa para nuevos negocios.',
    imagen_url: 'https://images.unsplash.com/photo-1626785776985-6e06cb321151?w=800&q=80',
    precio: 'Desde 250€'
  },
  {
    id: 'm4',
    nombre: 'Lonas Gran Formato',
    categoria: 'Impresión Digital',
    descripcion: 'Publicidad de alto impacto para exteriores.',
    imagen_url: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&q=80',
    precio: 'A medida'
  },
  {
    id: 'm5',
    nombre: 'Papelería Corporativa',
    categoria: 'Papelería',
    descripcion: 'Tarjetas, sobres y carpetas de lujo.',
    imagen_url: 'https://images.unsplash.com/photo-1588702545981-d61a78fdadae?w=800&q=80',
    precio: 'Consultar pack'
  },
  {
    id: 'm6',
    nombre: 'Estampados Textiles DTF',
    categoria: 'Textil',
    descripcion: 'Impresión directa sobre textil con máxima calidad.',
    imagen_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    video_url: 'https://cdn.pixabay.com/video/2021/08/25/86274-593644482_tiny.mp4',
    precio: 'Desde 15€'
  }
];

export default function CatalogoExploarte() {
  const [servicios, setServicios] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch data from Supabase
  useEffect(() => {
    async function fetchData() {
      if (!supabase) {
        console.warn('Supabase no está configurado. Mostrando catálogo vacío.');
        setCargando(false);
        return;
      }

      const { data, error } = await supabase
        .from('servicios')
        .select('*')
        .order('orden', { ascending: true });
      
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setServicios(data || []);
      }
      setCargando(false);
    }
    fetchData();
  }, []);

  // Efecto para detectar el scroll y comprimir el header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lógica de datos (Real vs Mock)
  const displayServicios = servicios.length > 0 ? servicios : mockServicios;

  const categorias = ['Todos', ...Array.from(new Set(displayServicios.map(s => s.categoria)))];

  const serviciosFiltrados = displayServicios.filter(p => {
    const cumpleBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                          p.descripcion?.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleCategoria = categoriaActiva === 'Todos' || p.categoria === categoriaActiva;
    return cumpleBusqueda && cumpleCategoria;
  });

  if (!mounted) return null;

  return (
    <div className={`min-h-screen font-sans selection:bg-[#D4AF37] selection:text-white transition-colors duration-500 bg-white dark:bg-[#000000] text-black dark:text-white`}>
      
      {/* HEADER DINÁMICO */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled ? 'py-4 bg-white/95 dark:bg-[#000000]/95 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900 shadow-sm' : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12 flex justify-between items-center relative">
          
          {/* Menu Button & Toggle */}
          <div className="w-1/4 sm:w-1/3 flex items-center gap-6">
            <button 
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="group flex gap-3 items-center text-[10px] tracking-[0.3em] uppercase font-bold hover:text-[#D4AF37] transition-colors"
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span className={`h-[1px] bg-black dark:bg-white transition-all group-hover:bg-[#D4AF37] ${menuAbierto ? 'rotate-45 translate-y-[3.5px]' : ''}`}></span>
                <span className={`h-[1px] bg-black dark:bg-white transition-all group-hover:bg-[#D4AF37] ${menuAbierto ? '-rotate-45 -translate-y-[3.5px]' : ''}`}></span>
              </div>
              <span className="hidden sm:inline">Menú</span>
            </button>
            <ThemeToggle />
          </div>

          {/* LOGO CENTRAL (LOGO DE MARCA) */}
          <div className="w-2/4 sm:w-1/3 flex justify-center translate-x-0">
            <Link href="/" className="origin-center hover:scale-[1.05] transition-all duration-500 inline-block group">
              <img 
                src="/logo.png" 
                alt="Exploarte Logo" 
                className={`w-auto object-contain drop-shadow-sm brightness-100 dark:brightness-110 transition-all duration-500 ${
                  scrolled ? 'h-10 sm:h-12 md:h-16' : 'h-14 sm:h-20 md:h-28'
                }`} 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-xl sm:text-2xl font-light tracking-[0.2em] uppercase text-black dark:text-white">Explo<span class="text-[#D4AF37] font-medium">arte</span></span>';
                }}
              />
            </Link>
          </div>

          <div className="w-1/4 sm:w-1/3 flex justify-end">
            <a href="#contacto" className="text-[10px] uppercase tracking-widest font-bold hover:text-[#D4AF37] transition-colors">Solicitar</a>
          </div>
        </div>
      </header>

      {/* MENÚ DESPLEGABLE FULLSCREEN (RESTAURADO) */}
      <div 
        className={`fixed inset-0 bg-black dark:bg-[#000000] text-white z-[60] flex items-center justify-center transition-all duration-700 ease-in-out ${
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
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-12 text-center opacity-60 font-black">Categorías & Navegación</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-center md:text-left">
            {categorias.map(cat => (
              <button 
                key={cat}
                onClick={() => {
                  setCategoriaActiva(cat);
                  setMenuAbierto(false);
                }}
                className={`text-3xl sm:text-5xl lg:text-7xl font-extralight tracking-tighter transition-all hover:text-[#D4AF37] transform hover:translate-x-4 inline-block ${
                  categoriaActiva === cat ? 'text-[#D4AF37] font-normal' : 'text-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-12 border-t border-zinc-900 pt-12">
             <div className="text-left">
               <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-black mb-2">Diseño & Producción</p>
               <p className="text-2xl font-light tracking-widest text-white">Andrés Castaño</p>
             </div>
             <div className="flex flex-col md:flex-row gap-12 items-center">
               <a href="#contacto" onClick={() => setMenuAbierto(false)} className="text-xs uppercase tracking-[0.4em] font-black hover:text-[#D4AF37] transition-colors">Solicitar Presupuesto</a>
               <a href="tel:+34641183574" className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">+34 641 183 574</a>
             </div>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className={`sticky z-40 bg-[#fafafa] dark:bg-zinc-950 border-y border-zinc-100 dark:border-zinc-900 px-6 sm:px-12 py-4 transition-all duration-500 ${
        scrolled ? 'top-[56px] sm:top-[64px] md:top-[80px]' : 'top-[94px] sm:top-[132px] md:top-[160px]'
      }`}>
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="relative w-full md:max-w-md group">
            <input 
              type="text" 
              placeholder="¿Qué estás buscando?..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 dark:border-zinc-800 py-3 text-[10px] md:text-xs tracking-[0.2em] uppercase outline-none focus:border-[#D4AF37] dark:focus:border-[#D4AF37] transition-all placeholder:text-gray-500 dark:placeholder:text-zinc-500"
            />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">🔍</span>
          </div>

          <div className="flex gap-4 sm:gap-8 overflow-x-auto scrollbar-hide w-full md:w-auto pb-2 md:pb-0">
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                className={`text-[9px] sm:text-[10px] tracking-[0.3em] uppercase whitespace-nowrap transition-all pb-1 border-b-2 ${
                  categoriaActiva === cat 
                  ? 'border-[#D4AF37] text-black dark:text-white font-black' 
                  : 'border-transparent text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <section className="px-6 sm:px-12 py-12 sm:py-24 bg-white dark:bg-[#000000]">
        <div className="max-w-[1800px] mx-auto">
          {cargando ? (
            <div className="h-96 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : serviciosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 sm:gap-y-20">
              {serviciosFiltrados.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-center">
              <p className="text-zinc-300 dark:text-zinc-700 text-6xl sm:text-9xl font-black opacity-20">VACÍO</p>
              <p className="mt-4 text-[10px] tracking-[0.4em] uppercase text-zinc-400">No se encontraron resultados para "{busqueda}"</p>
            </div>
          )}
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="bg-zinc-50 dark:bg-[#050505] py-24 sm:py-48 px-6 sm:px-12 transition-colors duration-700">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-24 items-center">
          
          <div className="lg:w-2/3">
            <h4 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-black mb-10">THE PROJECT</h4>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-extralight tracking-tight uppercase mb-4 leading-[0.9] text-zinc-900 dark:text-zinc-100">
               Catálogo <span className="text-[#D4AF37] font-medium">Completo</span>
            </h2>
            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-zinc-800 dark:text-zinc-100 mt-8 font-medium">
              Andrés Castaño | Servicios Gráficos Premium
            </p>
          </div>

          <div className="lg:w-1/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-12 sm:gap-16 w-full">
            <div className="group">
              <h4 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">Técnicas Clásicas</h4>
              <ul className="space-y-4 text-xs tracking-[0.2em] font-light text-zinc-600 dark:text-zinc-200">
                {['Sublimación Especializada', 'Serigrafía Textil', 'Impresión Digital Gran Formato', 'Papelería Corporativa'].map(item => (
                  <li key={item} className="flex gap-4 items-center group-hover:text-black dark:group-hover:text-white transition-colors">
                    <span className="w-6 h-[0.5px] bg-[#D4AF37] opacity-40"></span>{item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="group">
              <h4 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">Digital & Exterior</h4>
              <ul className="space-y-4 text-xs tracking-[0.2em] font-light text-zinc-600 dark:text-zinc-200">
                {['Rotulación Vehicular', 'Diseño de Marca', 'Marketing Visual', 'Vallas & Señalética'].map(item => (
                  <li key={item} className="flex gap-4 items-center group-hover:text-black dark:group-hover:text-white transition-colors">
                    <span className="w-6 h-[0.5px] bg-[#D4AF37] opacity-40"></span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (HIGH IMPACT) */}
      <section id="contacto" className="bg-white dark:bg-black py-24 sm:py-48 px-6 sm:px-12 flex flex-col items-center">
        <div className="max-w-[1000px] w-full text-center">
          <h4 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-black mb-10">PRESUSPUESTO</h4>
          <h2 className="text-6xl sm:text-8xl md:text-[10rem] font-extralight tracking-tighter uppercase leading-[0.8] text-zinc-900 dark:text-zinc-100">
             Let's <span className="font-bold underline decoration-[#D4AF37]/30 decoration-8 underline-offset-8">Talk</span>
          </h2>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-10 text-[10px] md:text-xs font-black tracking-[0.3em] text-zinc-900 dark:text-zinc-100 border-y border-zinc-200 dark:border-zinc-800 py-10">
            <a href="tel:+34641183574" className="hover:text-[#D4AF37] transition-all transform hover:scale-105">PHONE: +34 641 18 35 74</a>
            <a href="mailto:exploarte.esp@gmail.com" className="hover:text-[#D4AF37] transition-all transform hover:scale-105 uppercase overflow-hidden text-ellipsis w-full md:w-auto">EMAIL: EXPLOARTE.ESP@GMAIL.COM</a>
          </div>
          
          <form action={`https://api.web3forms.com/submit`} method="POST" className="mt-20 flex flex-col gap-12 text-left">
            <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="group relative">
                <label className="absolute -top-6 left-0 text-[8px] uppercase tracking-widest text-[#D4AF37] opacity-0 group-focus-within:opacity-100 transition-all font-bold">NOMBRE COMPLETO</label>
                <input type="text" name="name" required placeholder="TU NOMBRE" className="w-full bg-transparent border-b border-zinc-400 dark:border-zinc-700 py-4 text-xs font-light tracking-[0.2em] outline-none focus:border-[#D4AF37] transition-all placeholder:text-zinc-600 dark:placeholder:text-zinc-400 text-black dark:text-white" />
              </div>
              <div className="group relative">
                <label className="absolute -top-6 left-0 text-[8px] uppercase tracking-widest text-[#D4AF37] opacity-0 group-focus-within:opacity-100 transition-all font-bold">CORREO ELECTRÓNICO</label>
                <input type="email" name="email" required placeholder="TU EMAIL" className="w-full bg-transparent border-b border-zinc-400 dark:border-zinc-700 py-4 text-xs font-light tracking-[0.2em] outline-none focus:border-[#D4AF37] transition-all placeholder:text-zinc-600 dark:placeholder:text-zinc-400 text-black dark:text-white" />
              </div>
            </div>
            
            <div className="group relative">
               <label className="absolute -top-6 left-0 text-[8px] uppercase tracking-widest text-[#D4AF37] opacity-0 group-focus-within:opacity-100 transition-all font-bold">DETALLES DEL PROYECTO</label>
               <textarea name="message" required placeholder="EXPLÍCAME TU PROYECTO..." rows={4} className="w-full bg-transparent border-b border-zinc-400 dark:border-zinc-700 py-4 text-xs font-light tracking-[0.2em] outline-none focus:border-[#D4AF37] transition-all placeholder:text-zinc-600 dark:placeholder:text-zinc-400 resize-none text-black dark:text-white"></textarea>
            </div>

            <button type="submit" className="mt-12 group relative overflow-hidden bg-black dark:bg-zinc-950 text-[#D4AF37] py-6 sm:py-8 text-xs uppercase tracking-[0.5em] font-black transition-all hover:bg-zinc-900 border border-black dark:border-zinc-800 hover:border-[#D4AF37]/50">
               Enviar Mensaje
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER (CLEAN) */}
      <footer className="bg-white dark:bg-black text-black dark:text-white py-12 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-10 border-t border-zinc-100 dark:border-zinc-900">
        <div className="text-[9px] uppercase tracking-[0.4em] font-medium text-zinc-400 dark:text-zinc-600">
          © {new Date().getFullYear()} Exploarte Digital Catalog
        </div>
        
        <div className="flex gap-10 text-[9px] tracking-[0.2em] uppercase font-bold text-zinc-600 dark:text-zinc-400">
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Pinterest</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Behance</a>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ producto }: { producto: any }) {
  return (
    <div className="group flex flex-col gap-6 cursor-none sm:cursor-default">
      {/* Container Imagen con Ratio 4:5 (Luxury Standard) */}
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <img 
          src={producto.imagen_url} 
          alt={producto.nombre}
          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
        />
        
        {/* Hover Video Preview (Opcional) */}
        {producto.video_url && (
          <video 
            src={producto.video_url}
            loop
            muted
            playsInline
            onMouseOver={(e) => e.currentTarget.play()}
            onMouseOut={(e) => e.currentTarget.pause()}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out"
          />
        )}
        
        {/* Badge Categoria (Sutil) */}
        <div className="absolute top-4 left-4 text-[7px] uppercase tracking-[0.3em] font-black bg-white/10 dark:bg-black/10 backdrop-blur-sm text-black dark:text-white px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
           {producto.categoria}
        </div>
      </div>

      {/* Info Producto */}
      <div className="flex justify-between items-start pt-2 border-t border-transparent group-hover:border-zinc-100 dark:group-hover:border-zinc-900 transition-all duration-700">
        <div className="flex-1">
          <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-zinc-900 dark:text-zinc-100 group-hover:text-[#D4AF37] transition-colors duration-500">{producto.nombre}</h3>
          <p className="text-[9px] text-zinc-400 dark:text-zinc-500 tracking-[0.2em] uppercase mt-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors duration-500">{producto.categoria}</p>
        </div>
        <div className="text-right">
           <p className="text-xs font-black tracking-widest text-zinc-900 dark:text-white opacity-10 group-hover:opacity-100 transition-opacity duration-1000">DETAIL</p>
           <p className="text-[10px] font-light tracking-tighter text-zinc-400 mt-1">{producto.precio}</p>
        </div>
      </div>
    </div>
  );
}