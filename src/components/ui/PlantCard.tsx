import Image from 'next/image';

export function PlantCard({ plant, settings }: { plant: any, settings: any }) {
  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in the ${plant.name} from your collection.`);

  return (
    <div className="group flex flex-col bg-paper border border-line rounded-md overflow-hidden hover:shadow-sm hover:border-moss/30 transition-all">
      <div className="aspect-[4/3.2] bg-putty relative flex items-center justify-center">
        {plant.image_url ? (
           <img 
             src={plant.image_url} 
             alt={plant.name}
             className="w-full h-full object-cover"
           />
        ) : (
          <span className="text-4xl opacity-20">🌿</span>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex justify-between items-start gap-4">
          <h4 className="font-serif text-lg font-medium text-moss-dark leading-tight">{plant.name}</h4>
          <span className="text-ochre font-medium whitespace-nowrap">
            {plant.price ? `₹${plant.price}` : 'Price on request'}
          </span>
        </div>
        
        <div className="text-xs text-sage flex items-center gap-1.5 uppercase tracking-wider">
          <span>{plant.category}</span>
          <span>·</span>
          <span>{plant.care_level}</span>
        </div>
        
        <p className="text-moss text-sm line-clamp-2 mt-1 flex-1">
          {plant.description}
        </p>
        
        <div className="flex gap-3 mt-4 pt-4 border-t border-line/50">
          <a 
            href={`https://wa.me/${settings?.whatsapp_number}?text=${whatsappMsg}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 bg-moss-dark text-paper text-center py-2.5 rounded text-sm font-medium hover:bg-moss transition-colors"
          >
            WhatsApp
          </a>
          <a 
            href={`tel:${settings?.phone_number}`}
            className="flex-1 border border-moss-dark text-moss-dark text-center py-2.5 rounded text-sm font-medium hover:bg-putty transition-colors"
          >
            Call
          </a>
        </div>
      </div>
    </div>
  );
}
