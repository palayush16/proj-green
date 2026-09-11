import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { PlantGrid } from '@/components/ui/PlantGrid';

export const revalidate = 0;

export default async function HomePage() {
  const supabase = createClient();
  
  // Fetch settings
  const { data: settings } = await supabase
    .from('settings')
    .select('*')
    .single();

  // Fetch plants
  const { data: plants } = await supabase
    .from('plants')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 px-6 md:px-12 flex justify-between items-center border-b border-line">
        <div className="flex items-center gap-2">
          <span className="text-moss-dark">🌿</span>
          <h1 className="font-serif text-xl font-medium tracking-tight">Leaf & Ridge</h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-moss text-sm hidden md:inline-block">{settings?.tagline || 'Home-grown bonsai & potted plants.'}</span>
          <Link href="/admin" className="text-moss-dark text-sm hover:text-ochre transition-colors">
            Manage listings
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 flex flex-col gap-6">
            <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight text-moss-dark">
              {settings?.hero_heading || 'Grown slowly, chosen carefully.'}
            </h2>
            <p className="text-moss text-lg leading-relaxed max-w-md">
              {settings?.hero_description || 'A small home collection of bonsai and potted plants, cared for over years. Browse what\'s available — every enquiry goes straight to us on WhatsApp or by phone.'}
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#collection" className="bg-moss-dark text-paper px-6 py-3 rounded-md text-sm font-medium hover:bg-moss transition-colors">
                Browse the collection
              </a>
              <a href={`https://wa.me/${settings?.whatsapp_number}`} target="_blank" rel="noopener noreferrer" className="border border-moss-dark text-moss-dark px-6 py-3 rounded-md text-sm font-medium hover:bg-putty transition-colors">
                Message us
              </a>
            </div>
          </div>
          <div className="order-1 md:order-2 bg-putty aspect-square max-w-md w-full mx-auto md:ml-auto rounded-lg flex items-center justify-center p-8">
            <div className="text-6xl opacity-50">🌿</div>
          </div>
        </section>

        {/* Catalog */}
        <section id="collection" className="px-6 md:px-12 py-16 bg-putty-deep/30">
          <PlantGrid plants={plants || []} settings={settings} />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-line text-center md:text-left flex flex-col md:flex-row justify-between gap-4 text-sm text-sage">
        <p>Leaf & Ridge &copy; {new Date().getFullYear()}</p>
        <p>Enquiries by WhatsApp or phone, no online payment.</p>
        <div className="flex gap-4 justify-center md:justify-end">
          <a href={`https://wa.me/${settings?.whatsapp_number}`} className="hover:text-moss-dark">WhatsApp</a>
          <a href={`tel:${settings?.phone_number}`} className="hover:text-moss-dark">Call Us</a>
        </div>
      </footer>
    </div>
  );
}
