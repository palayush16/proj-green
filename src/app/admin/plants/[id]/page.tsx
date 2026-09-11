import { PlantForm } from '@/components/admin/PlantForm';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default async function EditPlantPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  
  const { data: plant } = await supabase
    .from('plants')
    .select('*')
    .eq('id', params.id)
    .single();
    
  if (!plant) {
    notFound();
  }

  return (
    <div className="p-6 md:p-12 max-w-3xl mx-auto w-full">
      <div className="mb-8">
        <Link href="/admin" className="text-sage hover:text-moss-dark flex items-center gap-2 text-sm mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to plants
        </Link>
        <h1 className="font-serif text-3xl font-medium text-moss-dark">Edit Plant</h1>
      </div>
      <PlantForm initialData={plant} />
    </div>
  );
}
