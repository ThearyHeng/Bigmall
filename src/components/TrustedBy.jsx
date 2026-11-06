import React from 'react';

export default function TrustedBy({ t }) {
  const { trustedBrands } = t;

  const brands = [
    { name: 'NINE', src: '/brand/nine.png' },
    { name: 'Skechers', src: '/brand/skechers.png' },
    { name: 'Mont Blanc', src: '/brand/mont-blanc.png' },
    { name: 'G2000', src: '/brand/g2000.png' },
    { name: 'Dove', src: '/brand/dove.png' },
    { name: 'Vaseline', src: '/brand/vaseline.png' },
    { name: 'Sunsilk', src: '/brand/sunsilk.png' },
    { name: 'Confirel', src: '/brand/confirel.png' },
    { name: 'Soko', src: '/brand/soko.png' },
    { name: 'Jaya', src: '/brand/jaya.png' },
  ];

  return (
    <section className="py-10 bg-[#f8fafc] border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="lg:flex gap-8 items-center justify-center">
          <span className="block text-center lg:text-left text-base md:text-lg font-bold text-gray-700 mb-6 lg:mb-0 shrink-0">
            {trustedBrands?.trustedBy || 'Trusted by'}
          </span>
          
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10">
            {brands.map((brand, idx) => (
              <div
                key={idx}
                className="relative w-16 sm:w-20 transition-transform duration-300 hover:scale-110 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 flex items-center justify-center"
              >
                <img
                  alt={brand.name}
                  loading="lazy"
                  width="80"
                  height="80"
                  className="rounded-lg object-contain h-12 w-12 sm:h-14 sm:w-14"
                  src={brand.src}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
