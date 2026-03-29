'use client';

import { useTheme } from '@/bibliotecas/providers';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita errores de hidratación asegurando que el componente esté montado
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 group overflow-hidden"
      aria-label="Alternar modo de color"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sol */}
        <span 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${
            theme === 'dark' ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-black dark:fill-white">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
          </svg>
        </span>
        {/* Luna */}
        <span 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${
            theme === 'dark' ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-black dark:fill-white">
            <path d="M12.12 12.12c1.35 1.39 3.19 2.21 5.23 2.21.31 0 .61-.02.9-.06-1.12 3.15-4.13 5.39-7.66 5.39-4.52 0-8.19-3.66-8.19-8.19 0-3.53 2.24-6.54 5.39-7.66-.04.29-.06.59-.06.9 0 2.04.82 3.88 2.19 5.27z"/>
          </svg>
        </span>
      </div>
      
      {/* Tooltip sutil */}
      <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] tracking-[0.2em] uppercase font-bold whitespace-nowrap bg-black text-white px-2 py-1 pointer-events-none">
        {theme === 'dark' ? 'Luz' : 'Noche'}
      </span>
    </button>
  );
}