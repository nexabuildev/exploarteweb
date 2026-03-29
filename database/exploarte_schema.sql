-- ════════════════════════════════════════════════════════════════
--  EXPLOARTE — SCHEMA SIMPLIFICADO PARA CATÁLOGO DINÁMICO
--  ════════════════════════════════════════════════════════════════

-- 1. Crear la tabla 'servicios' para el catálogo/galería
CREATE TABLE servicios (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre      TEXT NOT NULL,
  categoria   TEXT NOT NULL,
  precio      TEXT,           -- Usamos TEXT para "Desde X€" o "A medida"
  descripcion TEXT,
  imagen_url  TEXT NOT NULL,
  video_url   TEXT,           -- URL opcional para el efecto de hover
  orden       INT DEFAULT 0,  -- Para controlar la posición en el grid
  creado_el   TIMESTAMPTZ DEFAULT now()
);

-- 2. Habilitar la seguridad de nivel de fila (RLS)
ALTER TABLE servicios ENABLE ROW LEVEL SECURITY;

-- 3. Crear política para que cualquier visitante pueda VER el catálogo
CREATE POLICY "Servicios son visibles para todos" 
ON servicios FOR SELECT 
USING (true);

-- 4. Inserción de prueba (Opcional)
-- INSERT INTO servicios (nombre, categoria, precio, imagen_url)
-- VALUES ('Proyecto Inicial', 'Diseño Gráfico', 'A medida', 'https://images.unsplash.com/photo-1626785776985-6e06cb321151?w=800&q=80');
