-- Semillas de productos de ejemplo para MiBazar

INSERT INTO products (name, description, price, stock, category, image_url, is_experimental)
VALUES 
(
  'Auriculares Pro Wireless', 
  'Auriculares con cancelación de ruido activa, sonido espacial y 30 horas de batería. Diseño ergonómico y premium.', 
  250000.00, 
  15, 
  'Electrónica', 
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600', 
  false
),
(
  'Lámpara LED Minimalista', 
  'Lámpara de escritorio con control táctil, 3 niveles de brillo y carga inalámbrica para smartphone integrada.', 
  120000.00, 
  1, 
  'Hogar', 
  'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=600', 
  true
),
(
  'Teclado Mecánico RGB', 
  'Teclado mecánico ultra-rápido con switches personalizables y retroiluminación RGB dinámica.', 
  180000.00, 
  8, 
  'Computación', 
  'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600', 
  false
),
(
  'Botella Térmica Inteligente', 
  'Mantén tus bebidas a la temperatura ideal durante 24 horas. Pantalla LED de temperatura en la tapa.', 
  85000.00, 
  20, 
  'Accesorios', 
  'https://images.unsplash.com/photo-1602143307185-8ca415a2d1d4?auto=format&fit=crop&q=80&w=600', 
  false
),
(
  'Mochila Antirrobo Pro', 
  'Mochila con puerto de carga USB, material impermeable y cremalleras ocultas para máxima seguridad.', 
  145000.00, 
  12, 
  'Moda', 
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600', 
  false
);

-- Código de descuento de ejemplo
INSERT INTO discount_codes (code, discount_percent, is_active)
VALUES ('BIENVENIDA10', 10, true);
