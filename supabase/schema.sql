-- Schema for Leaf & Ridge

CREATE TYPE care_level_enum AS ENUM ('Beginner friendly', 'Needs some attention', 'Experienced grower');
CREATE TYPE category_enum AS ENUM ('Bonsai', 'Small plants', 'Big plants');

CREATE TABLE plants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category category_enum NOT NULL,
  price NUMERIC,
  care_level care_level_enum NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE settings (
  id INT PRIMARY KEY DEFAULT 1,
  tagline TEXT NOT NULL,
  hero_heading TEXT NOT NULL,
  hero_description TEXT NOT NULL,
  whatsapp_number TEXT,
  phone_number TEXT
);

-- Insert seed data for settings
INSERT INTO settings (id, tagline, hero_heading, hero_description, whatsapp_number, phone_number)
VALUES (
  1, 
  'Home-grown bonsai & potted plants.', 
  'Grown slowly, chosen carefully.', 
  'A small home collection of bonsai and potted plants, cared for over years. Browse what''s available — every enquiry goes straight to us on WhatsApp or by phone.',
  '1234567890',
  '1234567890'
) ON CONFLICT (id) DO NOTHING;

-- Insert seed data for plants
INSERT INTO plants (name, category, price, care_level, description)
VALUES 
  ('Ficus Bonsai, 6 years', 'Bonsai', 3500, 'Needs some attention', 'Informal upright style, glazed pot included.'),
  ('Money Plant, hanging', 'Small plants', 250, 'Beginner friendly', 'Healthy trailing vine, plastic pot.'),
  ('Areca Palm, floor size', 'Big plants', 1800, 'Beginner friendly', 'About 4 feet tall, great for a living room corner.');

-- RLS setup (assuming authenticated users can edit, public can read)
ALTER TABLE plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
  ON plants FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile."
  ON plants FOR INSERT
  WITH CHECK ( auth.role() = 'authenticated' );

CREATE POLICY "Users can update own profile."
  ON plants FOR UPDATE
  USING ( auth.role() = 'authenticated' );

CREATE POLICY "Users can delete own profile."
  ON plants FOR DELETE
  USING ( auth.role() = 'authenticated' );

CREATE POLICY "Public settings viewable by everyone."
  ON settings FOR SELECT
  USING ( true );

CREATE POLICY "Users can update settings."
  ON settings FOR UPDATE
  USING ( auth.role() = 'authenticated' );

-- Storage bucket setup for 'plants' bucket
-- Note: Must be executed in the Supabase SQL editor to create a storage bucket or via dashboard.
INSERT INTO storage.buckets (id, name, public) VALUES ('plants', 'plants', true) ON CONFLICT DO NOTHING;

CREATE POLICY "Avatar images are publicly accessible."
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'plants' );

CREATE POLICY "Anyone can upload an avatar."
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'plants' AND auth.role() = 'authenticated' );

CREATE POLICY "Anyone can update an avatar."
  ON storage.objects FOR UPDATE
  WITH CHECK ( bucket_id = 'plants' AND auth.role() = 'authenticated' );

CREATE POLICY "Anyone can delete an avatar."
  ON storage.objects FOR DELETE
  USING ( bucket_id = 'plants' AND auth.role() = 'authenticated' );
