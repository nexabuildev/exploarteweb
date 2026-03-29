# Vintage Lab | Marketplace Pro 🚀

**Vintage Lab** es una plataforma completa de marketplace para el resell de artículos de lujo y streetwear. Diseñada como SPA (Single Page Application) con Next.js 16, ofrece una experiencia premium para compradores y vendedores de la cultura urbana.

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|---|---|
| [Next.js 16](https://nextjs.org) (App Router) + React 19 | Framework frontend y API Routes |
| [Supabase](https://supabase.com) | Base de datos (Postgres), Autenticación, Storage y Realtime |
| [Stripe](https://stripe.com) | Pagos: checkout, suscripciones PRO y cupones |
| [Tailwind CSS 4](https://tailwindcss.com) | Estilos con sistema de diseño basado en variables CSS |
| [Recharts](https://recharts.org) | Gráficos y métricas del dashboard de vendedor |
| [html2canvas](https://html2canvas.hertzen.com) + [jsPDF](https://artskydj.github.io/jsPDF/docs/jsPDF.html) | Generación de facturas PDF |
| [next-themes](https://github.com/pacocoursey/next-themes) | Modo oscuro/claro con transiciones suaves |
| TypeScript | Tipado estático en todo el proyecto |

---

## ✨ Funcionalidades

### Para Compradores
- **Exploración avanzada** — Filtros por categoría, talla y rango de precio
- **Sistema de favoritos** — Guarda artículos para verlos después
- **Chat directo** — Comunicación en tiempo real con vendedores (Supabase Realtime)
- **Subastas en vivo** — Pujas en directo con cuenta atrás
- **Raffles / Sorteos** — Inscripción en futuros drops con fecha de lanzamiento
- **Ofertas** — Envío de contraoferta directa al vendedor
- **Autenticación** — Legit Check físico opcional en el checkout (3.99€)
- **Cupones de descuento** — Aplicables en la cesta de compra
- **Historial de compras** — Con tracking de envío (Preparando → Enviado → Entregado)
- **Facturas PDF** — Generación y descarga de facturas profesionales
- **Exportación CSV** — Datos de pedidos exportables
- **Reseñas** — Valoración del vendedor tras la compra

### Para Vendedores
- **Dashboard completo** — Métricas de ventas con gráficos (Recharts)
- **Gestión de productos** — CRUD completo con imágenes múltiples
- **Autocompletado IA** — Relleno automático de formulario desde foto (MVP simulado)
- **Subastas y Raffles** — Lanzar productos como subasta con duración o como sorteo
- **Tienda personalizable** — 3 layouts, colores, avatar y banner personalizables
- **Sistema de cupones** — Crear códigos de descuento propios
- **Gestión de ofertas** — Aceptar/rechazar contraofertas
- **Notificaciones** — Ventas, ofertas, seguidores, likes, comentarios
- **Mensajes** — Chat en tiempo real con compradores
- **Armario Virtual** — Mostrar colección personal (no en venta) en el perfil

### Comunidad
- **Feed de Outfits** — Subida de fotos estilo Pinterest (grid masonry)
- **Showcase TikTok** — Feed vertical de vídeos con autoplay, likes y comentarios
- **Calendario de Drops** — Vista de próximos lanzamientos

### PWA
- **Manifest.json** incluido — Instalable como app en móvil
- **Responsive** — Diseño adaptado a todos los dispositivos

---

## 📂 Estructura del Proyecto

```
marketplace-pro_v1/
├── database/
│   └── schema.sql           # 🔥 Schema SQL completo (18 tablas)
├── public/
│   └── manifest.json        # Configuración PWA
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai-tagging/  # API de autocompletado IA (simulado)
│   │   │   ├── checkout/    # API de pago Stripe
│   │   │   └── stripe-pro/  # API suscripción PRO
│   │   ├── calendario/      # Próximos drops
│   │   ├── cesta/           # Carrito de compra
│   │   ├── chat/            # Chat en tiempo real
│   │   ├── checkout/        # Flujo de pago
│   │   ├── compras/         # Historial del comprador
│   │   ├── comunidad/       # Feed de outfits
│   │   ├── dashboard/       # Panel del vendedor
│   │   │   ├── editar/[id]/ # Editar producto
│   │   │   ├── mensajes/    # Bandeja de mensajes
│   │   │   ├── notificaciones/ # Centro de notificaciones
│   │   │   └── nuevo-producto/ # Crear producto
│   │   ├── favoritos/       # Lista de deseos
│   │   ├── login/           # Inicio de sesión
│   │   ├── pago-exito/      # Confirmación post-pago
│   │   ├── pro/             # Suscripción PRO
│   │   ├── producto/[id]/   # Detalle de producto
│   │   ├── registro/        # Registro de usuario
│   │   ├── registro-vendedor/ # Registro de vendedor
│   │   ├── showcase/        # Feed vertical de vídeos
│   │   └── tienda/[id]/     # Perfil público de tienda
│   ├── bibliotecas/         # Clientes (Supabase, Providers tema)
│   ├── componentes/         # Componentes reutilizables
│   └── tipos/               # Interfaces TypeScript
├── .env.example             # 📋 Plantilla de variables de entorno
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Guía de Instalación

### Requisitos Previos
- **Node.js** 18.x o superior
- **npm** 9.x o superior
- Cuenta en [Supabase](https://supabase.com) (gratis)
- Cuenta en [Stripe](https://stripe.com) (gratis para test)

### Paso 1 — Clonar e instalar

```bash
git clone <url-del-repositorio>
cd marketplace-pro_v1
npm install
```

### Paso 2 — Configurar Supabase

1. **Crear proyecto** en [app.supabase.com](https://app.supabase.com)
2. **Ejecutar el schema SQL** — Ve a **SQL Editor** en tu dashboard de Supabase, copia el contenido completo de `database/schema.sql` y ejecútalo. Esto crea las 18 tablas necesarias.
3. **Crear Storage Buckets** — Ve a **Storage** y crea 2 buckets:
   - `fotos` → marcar como **público**
   - `tienda_media` → marcar como **público**
4. **Habilitar Auth** — Ve a **Authentication > Providers** y activa **Email** (ya viene activo por defecto).
5. **Configurar Realtime** — El schema SQL ya habilita Realtime para `mensajes` y `notificaciones`. Si necesitas verificarlo, ve a **Database > Replication** y asegúrate de que esas tablas están en la publicación `supabase_realtime`.
6. **Obtener claves** — Ve a **Settings > API** y copia:
   - `Project URL` → será tu `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → será tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Paso 3 — Configurar Stripe

1. Crea una cuenta en [dashboard.stripe.com](https://dashboard.stripe.com)
2. Ve a **Developers > API Keys**
3. Copia:
   - `Publishable key` → será tu `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`
   - `Secret key` → será tu `STRIPE_SECRET_KEY`

> ⚠️ Para producción, usa claves **live** en lugar de **test**.

### Paso 4 — Variables de entorno

Copia el archivo de plantilla y rellena con tus claves:

```bash
cp .env.example .env.local
```

Edita `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
```

### Paso 5 — Ejecutar

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

---

## 📦 Base de Datos — Tablas

El archivo `database/schema.sql` crea las siguientes tablas automáticamente:

| # | Tabla | Descripción |
|---|-------|-------------|
| 1 | `vendedores` | Perfiles de vendedores con tienda personalizable |
| 2 | `productos` | Catálogo de artículos (venta, subasta o raffle) |
| 3 | `favoritos` | Lista de deseos de cada usuario |
| 4 | `pedidos` | Órdenes de compra con tracking de estado |
| 5 | `pedido_items` | Items individuales de cada pedido |
| 6 | `historial_precios` | Evolución de precio de cada producto |
| 7 | `ofertas` | Contraofertas de compradores a vendedores |
| 8 | `pujas` | Pujas de subastas en vivo |
| 9 | `raffles` | Inscripciones a sorteos de productos |
| 10 | `cupones` | Códigos de descuento por vendedor |
| 11 | `resenas` | Valoraciones de compra (1-5 estrellas) |
| 12 | `seguidores` | Relación seguidor ↔ vendedor |
| 13 | `notificaciones` | Sistema de notificaciones (ventas, likes, etc.) |
| 14 | `mensajes` | Chat en tiempo real entre usuarios |
| 15 | `outfits` | Feed de la comunidad (fotos de outfits) |
| 16 | `videos_showcase` | Feed vertical tipo TikTok |
| 17 | `comentarios_showcase` | Comentarios en vídeos del Showcase |
| 18 | `armario_virtual` | Colección personal (no en venta) |

**Storage Buckets** necesarios:

| Bucket | Uso | Público |
|--------|-----|---------|
| `fotos` | Imágenes de productos, outfits, showcase, armario | ✅ Sí |
| `tienda_media` | Avatares y banners de tiendas | ✅ Sí |

---

## 📈 Despliegue en Producción

### Opción recomendada: Vercel

1. Sube tu repositorio a GitHub/GitLab
2. Ve a [vercel.com](https://vercel.com) → **New Project** → Importa tu repo
3. En **Environment Variables**, añade las 4 variables del `.env.local`
4. Haz clic en **Deploy**

### Otras opciones

Cualquier plataforma compatible con Next.js funciona:

```bash
# Build de producción
npm run build

# Servir
npm start
```

---

## 🔐 Seguridad — Row Level Security (RLS)

> **IMPORTANTE**: Por defecto, las tablas de Supabase se crean **sin** políticas RLS (Row Level Security). Esto significa que cualquier usuario autenticado puede leer/escribir en todas las tablas.
>
> Para un entorno de producción, debes crear políticas RLS para cada tabla según tus necesidades. Ejemplo de política básica:
>
> ```sql
> -- Solo el dueño puede ver sus favoritos
> ALTER TABLE favoritos ENABLE ROW LEVEL SECURITY;
>
> CREATE POLICY "Users can manage their own favorites"
>   ON favoritos FOR ALL
>   USING (auth.uid() = id_usuario);
> ```
>
> Consulta la [documentación de RLS de Supabase](https://supabase.com/docs/guides/auth/row-level-security) para configurar todas las políticas.

---

## 📝 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (hot reload) |
| `npm run build` | Build de producción |
| `npm start` | Servir build de producción |
| `npm run lint` | Ejecutar ESLint |

---

Desarrollado con ❤️ para la comunidad de coleccionistas y entusiastas del streetwear.
