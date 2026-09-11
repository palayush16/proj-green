'use client';

import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { deletePlant } from '@/app/admin/actions';

export function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button 
      onClick={() => {
        if (confirm('Are you sure you want to delete this plant?')) {
          startTransition(async () => {
             await deletePlant(id);
          });
        }
      }}
      disabled={isPending}
      title="Delete"
      className="p-2 text-moss hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
    >
      <Trash2 size={16} />
    </button>
  );
}
