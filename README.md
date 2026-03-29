# Exploarte | Minimalism & Art 🎨

**Exploarte** es un catálogo abierto, minimalista y de alto impacto diseñado para elevar la presencia digital de la marca. Esta plataforma abandona la complejidad de los marketplaces tradicionales para centrarse en lo que realmente importa: la estética, el producto y la experiencia del usuario.

---

## ✨ Visión del Proyecto

Transformar la experiencia de compra en una galería de arte digital. **Exploarte** no es solo una tienda; es un catálogo dinámico sin fricciones, donde el diseño premium y la simplicidad convergen para crear una impresión inolvidable.

- **Fricción Cero** — Sin sistemas de autenticación invasivos ni procesos de pago complejos.
- **Estética Elevada** — Uso de tipografía moderna, espacios en blanco generosos y animaciones sutiles.
- **Catálogo Abierto** — Acceso directo a la colección completa desde el primer segundo.

---

## 🛠️ Stack Tecnológico Premium

| Tecnología | Uso |
|---|---|
| [Next.js 16](https://nextjs.org) | Framework de React para una performance ultrarrápida |
| [Tailwind CSS 4](https://tailwindcss.com) | Sistema de diseño moderno con variables CSS dinámicas |
| [Supabase](https://supabase.com) | Gestión de datos del catálogo y almacenamiento de medios |
| [TypeScript](https://www.typescriptlang.org) | Desarrollo robusto y tipado para una mantenibilidad total |
| [Lucide React](https://lucide.dev) | Iconografía elegante y minimalista |

---

## 📂 Estructura del Proyecto (Core)

```
exploarteweb/
├── src/
│   ├── app/
│   │   ├── globals.css      # Sistema de diseño y tokens visuales
│   │   ├── layout.tsx       # Estructura global y fuentes
│   │   ├── page.tsx         # Landing page de alto impacto
│   │   └── producto/[id]/   # Vista detallada del producto
│   ├── componentes/         # UI Components (Grid, Navbar, Footer)
│   ├── bibliotecas/         # Clientes de servicios (Supabase)
│   └── tipos/               # Definiciones de datos
├── public/                 # Assets estáticos y logos
└── tailwind.config.ts      # Configuración de diseño personalizada
```

---

## 🚀 Instalación y Desarrollo

Sigue estos pasos para poner en marcha el catálogo en tu entorno local:

### 1. Clonar e Instalar
```bash
git clone https://github.com/nexabuildev/exploarteweb.git
cd exploarteweb
npm install
```

### 2. Configuración de Variables
Crea un archivo `.env.local` en la raíz con tus credenciales de Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
```

### 3. Ejecutar en Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 📈 Despliegue

Optimizado para desplegarse en **Vercel** con un solo clic. Solo necesitas conectar este repositorio y configurar las variables de entorno mencionadas anteriormente.

---

Desarrollado con pasión por la excelencia visual y el diseño minimalista. 💎
