
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Faltan las credenciales de Supabase en el archivo .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const products = [
  {
    name: 'Auriculares Pro Wireless', 
    description: 'Auriculares con cancelación de ruido activa, sonido espacial y 30 horas de batería. Diseño ergonómico y premium.', 
    price: 250000.00, 
    stock: 15, 
    category: 'Electrónica', 
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600', 
    is_experimental: false
  },
  {
    name: 'Lámpara LED Minimalista', 
    description: 'Lámpara de escritorio con control táctil, 3 niveles de brillo y carga inalámbrica para smartphone integrada.', 
    price: 120000.00, 
    stock: 1, 
    category: 'Hogar', 
    image_url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=600', 
    is_experimental: true
  },
  {
    name: 'Teclado Mecánico RGB', 
    description: 'Teclado mecánico ultra-rápido con switches personalizables y retroiluminación RGB dinámica.', 
    price: 180000.00, 
    stock: 8, 
    category: 'Computación', 
    image_url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600', 
    is_experimental: false
  },
  {
    name: 'Botella Térmica Inteligente', 
    description: 'Mantén tus bebidas a la temperatura ideal durante 24 horas. Pantalla LED de temperatura en la tapa.', 
    price: 85000.00, 
    stock: 20, 
    category: 'Accesorios', 
    image_url: 'https://images.unsplash.com/photo-1602143307185-8ca415a2d1d4?auto=format&fit=crop&q=80&w=600', 
    is_experimental: false
  },
  {
    name: 'Mochila Antirrobo Pro', 
    description: 'Mochila con puerto de carga USB, material impermeable y cremalleras ocultas para máxima seguridad.', 
    price: 145000.00, 
    stock: 12, 
    category: 'Moda', 
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600', 
    is_experimental: false
  }
]

async function seed() {
  console.log('Insertando productos...')
  const { error: pError } = await supabase.from('products').insert(products)
  if (pError) console.error('Error insertando productos:', pError)
  else console.log('¡Productos insertados con éxito!')

  console.log('Insertando código de descuento...')
  const { error: dError } = await supabase.from('discount_codes').insert([
    { code: 'BIENVENIDA10', discount_percent: 10, is_active: true }
  ])
  if (dError) console.error('Error insertando código de descuento:', dError)
  else console.log('¡Código de descuento insertado con éxito!')
}

seed()
