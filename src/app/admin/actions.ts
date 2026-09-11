'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deletePlant(id: string) {
  const supabase = createClient();
  await supabase.from('plants').delete().eq('id', id);
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect('/admin/login?message=Could+not+authenticate+user');
  }

  redirect('/admin');
}

export async function saveSettings(formData: FormData) {
  const supabaseServer = createClient();
  
  await supabaseServer.from('settings').upsert({
    id: 1,
    tagline: formData.get('tagline'),
    hero_heading: formData.get('hero_heading'),
    hero_description: formData.get('hero_description'),
    whatsapp_number: formData.get('whatsapp_number'),
    phone_number: formData.get('phone_number'),
  });
  
  revalidatePath('/');
  revalidatePath('/admin/settings');
  redirect('/admin/settings?success=true');
}
