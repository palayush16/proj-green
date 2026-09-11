import { createClient } from '@/lib/supabase/server';
import { saveSettings } from '../actions';

export const revalidate = 0;

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { success?: string }
}) {
  const supabase = createClient();
  
  const { data: settings } = await supabase
    .from('settings')
    .select('*')
    .single();

  return (
    <div className="p-6 md:p-12 max-w-3xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium text-moss-dark">Site Settings</h1>
        <p className="text-sage mt-1 text-sm">Update text and contact details</p>
      </div>

      <form action={saveSettings} className="bg-paper p-8 rounded-lg border border-line shadow-sm flex flex-col gap-6">
        
        {searchParams?.success && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md">
            Settings saved successfully!
          </div>
        )}

        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-xl font-medium text-moss-dark border-b border-line pb-2">Branding</h3>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-moss-dark" htmlFor="tagline">Header Tagline</label>
            <input
              id="tagline"
              name="tagline"
              defaultValue={settings?.tagline}
              className="border border-line rounded-md px-4 py-2 bg-white focus:outline-none focus:border-moss"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-moss-dark" htmlFor="hero_heading">Hero Heading</label>
            <input
              id="hero_heading"
              name="hero_heading"
              defaultValue={settings?.hero_heading}
              className="border border-line rounded-md px-4 py-2 bg-white focus:outline-none focus:border-moss font-serif"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-moss-dark" htmlFor="hero_description">Hero Description</label>
            <textarea
              id="hero_description"
              name="hero_description"
              defaultValue={settings?.hero_description}
              rows={4}
              className="border border-line rounded-md px-4 py-2 bg-white focus:outline-none focus:border-moss"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <h3 className="font-serif text-xl font-medium text-moss-dark border-b border-line pb-2">Contact Details</h3>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-moss-dark" htmlFor="whatsapp_number">
              WhatsApp Number (with country code, no + or spaces)
            </label>
            <input
              id="whatsapp_number"
              name="whatsapp_number"
              defaultValue={settings?.whatsapp_number}
              placeholder="919876543210"
              className="border border-line rounded-md px-4 py-2 bg-white focus:outline-none focus:border-moss"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-moss-dark" htmlFor="phone_number">
              Phone Number
            </label>
            <input
              id="phone_number"
              name="phone_number"
              defaultValue={settings?.phone_number}
              className="border border-line rounded-md px-4 py-2 bg-white focus:outline-none focus:border-moss"
            />
          </div>
        </div>
        
        <div className="mt-4 pt-6 border-t border-line flex justify-end">
          <button type="submit" className="bg-moss-dark text-paper px-6 py-3 rounded-md text-sm font-medium hover:bg-moss transition-colors">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
