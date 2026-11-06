import React from 'react';

export default function WhyLayLong24({ t }) {
  const section = t.whyBigMall || t.whyLayLong24 || {};

  const features = [
    {
      title: section.feature1Title || 'Verified merchants',
      desc: section.feature1Desc || 'Every merchant on BigMallCambodia.com is verified in person by our team before their store goes live - so buyers can shop with confidence knowing every product comes from a real, trusted source.',
      icon: '/features/verified.png',
      alt: 'Verified merchants',
    },
    {
      title: section.feature2Title || 'Direct Payments',
      desc: section.feature2Desc || 'Buyers pay merchants directly - no middleman, no delay. Supports ABA Bank, KHQR, and Credit / Debit cards. Transactions are simple and transparent.',
      icon: '/features/credit.png',
      alt: 'Direct Payments',
    },
    {
      title: section.feature3Title || 'Fast Local Delivery',
      desc: section.feature3Desc || 'Same-day delivery across Phnom Penh. Province-wide shipping for the rest of Cambodia. Real-time order tracking for buyers and merchants both.',
      icon: '/features/delivery.png',
      alt: 'Fast Local Delivery',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-left">
          <span className="text-xs sm:text-sm leading-relaxed text-[#8b6914] uppercase tracking-wider font-bold mb-3 inline-block">
            {section.badge || 'Why BigMallCambodia.com'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {section.headline1 || 'Built for Cambodia'}
            <br />
            <span className="text-[#8b6914]">{section.headline2 || 'by Cambodians'}</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-1">{section.description}</p>
          <p className="text-gray-600 text-base md:text-lg">{section.description2}</p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="group bg-[#f8fafc] hover:bg-white rounded-2xl p-7 border border-gray-100 hover:border-amber-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-start mb-6 h-16 w-16 p-2 rounded-xl bg-white shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                  <img
                    alt={f.alt}
                    loading="lazy"
                    width="60"
                    height="60"
                    className="object-contain w-full h-full"
                    src={f.icon}
                  />
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-3 group-hover:text-[#8b6914] transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
