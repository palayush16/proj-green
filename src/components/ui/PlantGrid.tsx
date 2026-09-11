'use client';

import { useState } from 'react';
import { PlantCard } from './PlantCard';

type Plant = {
  id: string;
  name: string;
  category: string;
  price: number | null;
  care_level: string;
  description: string;
  image_url: string | null;
};

export function PlantGrid({ plants, settings }: { plants: Plant[], settings: any }) {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Bonsai', 'Small plants', 'Big plants'];
  
  const filteredPlants = filter === 'All' 
    ? plants 
    : plants.filter(p => p.category === filter);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <h3 className="font-serif text-3xl text-moss-dark">The collection</h3>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                filter === cat 
                  ? 'bg-moss-dark text-paper' 
                  : 'bg-transparent border border-line text-moss hover:bg-putty'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredPlants.length === 0 ? (
        <div className="py-24 text-center text-sage">
          <p>No plants currently available in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {filteredPlants.map(plant => (
            <PlantCard key={plant.id} plant={plant} settings={settings} />
          ))}
        </div>
      )}
    </div>
  );
}
