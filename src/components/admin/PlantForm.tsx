'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

type Plant = {
  id?: string;
  name: string;
  category: string;
  price: number | null;
  care_level: string;
  description: string;
  image_url: string | null;
};

export function PlantForm({ initialData }: { initialData?: Plant }) {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialData?.image_url || null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      let imageUrl = initialData?.image_url || null;

      // Handle image upload if there's a new file
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('plants')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('plants')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrl;
      }

      const plantData = {
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        price: formData.get('price') ? parseFloat(formData.get('price') as string) : null,
        care_level: formData.get('care_level') as string,
        description: formData.get('description') as string,
        image_url: imageUrl,
      };

      if (initialData?.id) {
        const { error: updateError } = await supabase
          .from('plants')
          .update(plantData)
          .eq('id', initialData.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('plants')
          .insert(plantData);
        if (insertError) throw insertError;
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving the plant.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-paper p-8 rounded-lg border border-line shadow-sm flex flex-col gap-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <h3 className="font-serif text-xl font-medium text-moss-dark border-b border-line pb-2">Photo</h3>
        
        <div className="flex items-end gap-6">
          <div className="h-40 w-40 rounded-lg bg-putty overflow-hidden border border-line flex items-center justify-center flex-shrink-0 relative">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl opacity-20">🌿</span>
            )}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium text-moss-dark" htmlFor="photo">
              Upload a photo
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-moss file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-moss-dark file:text-paper hover:file:bg-moss transition-colors cursor-pointer"
            />
            <p className="text-xs text-sage">Recommended ratio 4:3. Max 2MB.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <h3 className="font-serif text-xl font-medium text-moss-dark border-b border-line pb-2">Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-moss-dark" htmlFor="name">Name *</label>
            <input
              id="name"
              name="name"
              defaultValue={initialData?.name}
              required
              className="border border-line rounded-md px-4 py-2 bg-white focus:outline-none focus:border-moss font-serif"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-moss-dark" htmlFor="price">Price (₹)</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              defaultValue={initialData?.price || ''}
              className="border border-line rounded-md px-4 py-2 bg-white focus:outline-none focus:border-moss"
              placeholder="Leave empty for POR"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-moss-dark" htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              defaultValue={initialData?.category || 'Small plants'}
              className="border border-line rounded-md px-4 py-2 bg-white focus:outline-none focus:border-moss appearance-none"
            >
              <option value="Bonsai">Bonsai</option>
              <option value="Small plants">Small plants</option>
              <option value="Big plants">Big plants</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-moss-dark" htmlFor="care_level">Care Level *</label>
            <select
              id="care_level"
              name="care_level"
              defaultValue={initialData?.care_level || 'Beginner friendly'}
              className="border border-line rounded-md px-4 py-2 bg-white focus:outline-none focus:border-moss appearance-none"
            >
              <option value="Beginner friendly">Beginner friendly</option>
              <option value="Needs some attention">Needs some attention</option>
              <option value="Experienced grower">Experienced grower</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-moss-dark" htmlFor="description">Short Description *</label>
          <textarea
            id="description"
            name="description"
            defaultValue={initialData?.description}
            required
            rows={3}
            className="border border-line rounded-md px-4 py-2 bg-white focus:outline-none focus:border-moss"
          />
        </div>
      </div>
      
      <div className="mt-4 pt-6 border-t border-line flex justify-end gap-3">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="px-6 py-3 rounded-md text-sm font-medium border border-line text-moss-dark hover:bg-putty transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-moss-dark text-paper px-6 py-3 rounded-md text-sm font-medium hover:bg-moss transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Plant'}
        </button>
      </div>
    </form>
  );
}
