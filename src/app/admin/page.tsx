import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import { DeleteButton } from '@/components/admin/DeleteButton';

export const revalidate = 0;

export default async function AdminDashboard() {
  const supabase = createClient();
  
  const { data: plants } = await supabase
    .from('plants')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl font-medium text-moss-dark">Plants</h1>
          <p className="text-sage mt-1 text-sm">Manage your collection</p>
        </div>
        <Link 
          href="/admin/plants/new"
          className="bg-moss-dark text-paper px-4 py-2 rounded-md text-sm font-medium hover:bg-moss transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Add Plant
        </Link>
      </div>

      <div className="bg-paper border border-line rounded-lg overflow-hidden shadow-sm">
        {plants && plants.length > 0 ? (
          <table className="w-full text-left text-sm">
            <thead className="bg-putty border-b border-line text-moss text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Plant</th>
                <th className="px-6 py-4 font-medium hidden sm:table-cell">Category</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">Price</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {plants.map((plant) => (
                <tr key={plant.id} className="hover:bg-putty/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded bg-putty flex-shrink-0 flex items-center justify-center overflow-hidden border border-line">
                        {plant.image_url ? (
                          <img src={plant.image_url} alt={plant.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-lg opacity-30">🌿</span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-moss-dark">{plant.name}</div>
                        <div className="text-sage text-xs md:hidden">{plant.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-moss hidden sm:table-cell">{plant.category}</td>
                  <td className="px-6 py-4 text-moss hidden md:table-cell">
                    {plant.price ? `₹${plant.price}` : 'POR'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/admin/plants/${plant.id}`}
                        className="p-2 text-moss hover:text-moss-dark hover:bg-putty rounded transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <DeleteButton id={plant.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center text-sage">
            <p>No plants found. Add your first plant to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
