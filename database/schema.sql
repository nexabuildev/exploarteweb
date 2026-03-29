-- ════════════════════════════════════════════════════════════════
--  VINTAGE LAB — SCHEMA COMPLETO DE SUPABASE
--  Ejecuta este archivo en tu SQL Editor de Supabase para
--  crear todas las tablas que necesita la aplicación.
-- ════════════════════════════════════════════════════════════════

-- ─── 1. VENDEDORES ───────────────────────────────────────────
CREATE TABLE vendedores (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_usuario    UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nombre_tienda TEXT NOT NULL,
  razon_registro TEXT,
  metas          TEXT,
  descripcion    TEXT,
  avatar_url     TEXT,
  banner_url     TEXT,
  color_fondo    TEXT DEFAULT '#0a0a0a',
  layout_id      INT DEFAULT 1,
  comision_actual NUMERIC DEFAULT 15.0,
  ventas_totales  INT DEFAULT 0,
  esta_verificado BOOLEAN DEFAULT false,
  creado_el      TIMESTAMPTZ DEFAULT now()
);

-- ─── 2. PRODUCTOS ────────────────────────────────────────────
CREATE TABLE productos (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_vendedor      UUID REFERENCES vendedores(id) ON DELETE CASCADE NOT NULL,
  nombre           TEXT NOT NULL,
  precio           NUMERIC NOT NULL,
  precio_inicial   NUMERIC,
  descripcion      TEXT,
  categoria        TEXT,
  talla            TEXT,
  imagen_url       TEXT,
  imagenes_extra   TEXT[],            -- Array de URLs
  destacado        BOOLEAN DEFAULT false,
  es_subasta       BOOLEAN DEFAULT false,
  fecha_fin_subasta TIMESTAMPTZ,
  fecha_lanzamiento TIMESTAMPTZ,      -- Para Raffles / Upcoming drops
  ventas_count     INT DEFAULT 0,
  creado_el        TIMESTAMPTZ DEFAULT now()
);

-- ─── 3. FAVORITOS ────────────────────────────────────────────
CREATE TABLE favoritos (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_usuario   UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  id_producto  UUID REFERENCES productos(id) ON DELETE CASCADE NOT NULL,
  creado_el    TIMESTAMPTZ DEFAULT now(),
  UNIQUE(id_usuario, id_producto)
);

-- ─── 4. PEDIDOS ──────────────────────────────────────────────
CREATE TABLE pedidos (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_usuario   UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  total        NUMERIC NOT NULL,
  estado       TEXT DEFAULT 'Preparando',    -- Preparando → Enviado → Entregado
  legit_check  BOOLEAN DEFAULT false,
  nombre_cliente TEXT,
  direccion      TEXT,
  creado_el    TIMESTAMPTZ DEFAULT now()
);

-- ─── 5. PEDIDO_ITEMS ─────────────────────────────────────────
CREATE TABLE pedido_items (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_pedido    UUID REFERENCES pedidos(id) ON DELETE CASCADE NOT NULL,
  id_producto  UUID REFERENCES productos(id) ON DELETE SET NULL,
  precio       NUMERIC NOT NULL,
  creado_el    TIMESTAMPTZ DEFAULT now()
);

-- ─── 6. HISTORIAL DE PRECIOS ─────────────────────────────────
CREATE TABLE historial_precios (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_producto  UUID REFERENCES productos(id) ON DELETE CASCADE NOT NULL,
  precio       NUMERIC NOT NULL,
  fecha        TIMESTAMPTZ DEFAULT now()
);

-- ─── 7. OFERTAS ──────────────────────────────────────────────
CREATE TABLE ofertas (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_comprador  UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  id_producto   UUID REFERENCES productos(id) ON DELETE CASCADE NOT NULL,
  id_vendedor   UUID REFERENCES vendedores(id) ON DELETE CASCADE,
  precio_oferta NUMERIC NOT NULL,
  estado        TEXT DEFAULT 'pendiente',  -- pendiente / aceptada / rechazada
  creado_el     TIMESTAMPTZ DEFAULT now()
);

-- ─── 8. PUJAS (SUBASTAS) ────────────────────────────────────
CREATE TABLE pujas (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_producto  UUID REFERENCES productos(id) ON DELETE CASCADE NOT NULL,
  id_usuario   UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  cantidad     NUMERIC NOT NULL,
  creado_el    TIMESTAMPTZ DEFAULT now()
);

-- ─── 9. RAFFLES ──────────────────────────────────────────────
CREATE TABLE raffles (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_producto  UUID REFERENCES productos(id) ON DELETE CASCADE NOT NULL,
  id_usuario   UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  creado_el    TIMESTAMPTZ DEFAULT now(),
  UNIQUE(id_producto, id_usuario)
);

-- ─── 10. CUPONES ─────────────────────────────────────────────
CREATE TABLE cupones (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_vendedor  UUID REFERENCES vendedores(id) ON DELETE CASCADE NOT NULL,
  codigo       TEXT NOT NULL,
  descuento    NUMERIC NOT NULL,       -- Porcentaje (ej: 10 = 10%)
  usos         INT DEFAULT 0,
  creado_el    TIMESTAMPTZ DEFAULT now()
);

-- ─── 11. RESEÑAS ─────────────────────────────────────────────
CREATE TABLE resenas (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_comprador  UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  id_vendedor   UUID REFERENCES vendedores(id) ON DELETE CASCADE NOT NULL,
  id_pedido     UUID REFERENCES pedidos(id) ON DELETE CASCADE,
  puntuacion    INT NOT NULL CHECK (puntuacion BETWEEN 1 AND 5),
  comentario    TEXT,
  creado_el     TIMESTAMPTZ DEFAULT now()
);

-- ─── 12. SEGUIDORES ──────────────────────────────────────────
CREATE TABLE seguidores (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_seguidor   UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  id_vendedor   UUID REFERENCES vendedores(id) ON DELETE CASCADE NOT NULL,
  creado_el     TIMESTAMPTZ DEFAULT now(),
  UNIQUE(id_seguidor, id_vendedor)
);

-- ─── 13. NOTIFICACIONES ──────────────────────────────────────
CREATE TABLE notificaciones (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_usuario   UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tipo         TEXT,                    -- venta, oferta, seguidor, like, comentario
  titulo       TEXT,
  mensaje      TEXT NOT NULL,
  enlace       TEXT,
  leida        BOOLEAN DEFAULT false,
  creado_el    TIMESTAMPTZ DEFAULT now()
);

-- ─── 14. MENSAJES (CHAT) ─────────────────────────────────────
CREATE TABLE mensajes (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_emisor    UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  id_receptor  UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  id_producto  UUID REFERENCES productos(id) ON DELETE SET NULL,
  contenido    TEXT NOT NULL,
  creado_el    TIMESTAMPTZ DEFAULT now()
);

-- ─── 15. OUTFITS (COMUNIDAD) ─────────────────────────────────
CREATE TABLE outfits (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_usuario   UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  imagen_url   TEXT NOT NULL,
  descripcion  TEXT,
  creado_el    TIMESTAMPTZ DEFAULT now()
);

-- ─── 16. VIDEOS SHOWCASE ─────────────────────────────────────
CREATE TABLE videos_showcase (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_usuario   UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  video_url    TEXT NOT NULL,
  descripcion  TEXT,
  likes        INT DEFAULT 0,
  creado_el    TIMESTAMPTZ DEFAULT now()
);

-- ─── 17. COMENTARIOS SHOWCASE ────────────────────────────────
CREATE TABLE comentarios_showcase (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_video     UUID REFERENCES videos_showcase(id) ON DELETE CASCADE NOT NULL,
  id_usuario   UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  texto        TEXT NOT NULL,
  creado_el    TIMESTAMPTZ DEFAULT now()
);

-- ─── 18. ARMARIO VIRTUAL ─────────────────────────────────────
CREATE TABLE armario_virtual (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_usuario      UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nombre_prenda   TEXT NOT NULL,
  valor_estimado  NUMERIC DEFAULT 0,
  imagen_url      TEXT,
  creado_el       TIMESTAMPTZ DEFAULT now()
);


-- ════════════════════════════════════════════════════════════════
--  REALTIME — Habilitar tablas para sincronización en tiempo real
-- ════════════════════════════════════════════════════════════════
ALTER PUBLICATION supabase_realtime ADD TABLE mensajes;
ALTER PUBLICATION supabase_realtime ADD TABLE notificaciones;


-- ════════════════════════════════════════════════════════════════
--  NOTA SOBRE STORAGE BUCKETS
--
--  Debes crear los siguientes buckets MANUALMENTE desde el panel
--  de Supabase → Storage → New Bucket:
--
--  1. "fotos"         → Público (para imágenes de productos, outfits, showcase)
--  2. "tienda_media"  → Público (para avatares y banners de tiendas)
--
--  En ambos buckets, activa la opción "Public bucket" para que
--  las URLs generadas con getPublicUrl() funcionen sin auth.
-- ════════════════════════════════════════════════════════════════
