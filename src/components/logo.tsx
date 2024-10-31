import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image 
        src="/logo.png" 
        alt="InspireMe Logo" 
        width={32} 
        height={32}
        className="object-contain"
      />
      <span className="font-bold text-lg">InspireMe</span>
    </div>
  );
}
