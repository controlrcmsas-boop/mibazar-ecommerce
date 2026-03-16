-- Create tables for MiBazar e-commerce

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  category TEXT,
  image_url TEXT,
  images TEXT[], -- Array of additional images
  related_products UUID[], -- IDs of related products
  is_experimental BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- User profiles (extends Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  is_admin BOOLEAN DEFAULT false,
  favorites UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  status TEXT DEFAULT 'pending', -- pending, paid, shipped, delivered, cancelled
  total DECIMAL(10, 2) NOT NULL,
  payment_method TEXT, -- nequi, bancolombia, contraentrega
  payment_status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  discount_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Order items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders ON DELETE CASCADE,
  product_id UUID REFERENCES products,
  quantity INT NOT NULL,
  price_at_purchase DECIMAL(10, 2) NOT NULL
);

-- Discount codes
CREATE TABLE discount_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount_percent INT NOT NULL,
  expiry_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Comments/Reviews
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  product_id UUID REFERENCES products ON DELETE CASCADE,
  content TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Basic Policies (can be refined later)
CREATE POLICY "Public products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Profiles are viewable by owners and admins" ON profiles FOR SELECT USING (auth.uid() = id OR (SELECT is_admin FROM profiles WHERE id = auth.uid()));
