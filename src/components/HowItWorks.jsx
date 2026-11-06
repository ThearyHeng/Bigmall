import React, { useState } from 'react';

export default function HowItWorks({ t }) {
  const { howItWorks } = t;
  const [activeTab, setActiveTab] = useState('buyers'); // 'buyers' | 'sellers'

  const buyerSteps = [
    {
      num: '1',
      title: howItWorks.buyerStep1Title,
      desc: howItWorks.buyerStep1Desc,
    },
    {
      num: '2',
      title: howItWorks.buyerStep2Title,
      desc: howItWorks.buyerStep2Desc,
    },
    {
      num: '3',
      title: howItWorks.buyerStep3Title,
      desc: howItWorks.buyerStep3Desc,
    },
  ];

  const merchantSteps = [
    {
      num: '1',
      title: howItWorks.merchantStep1Title,
      desc: howItWorks.merchantStep1Desc,
    },
    {
      num: '2',
      title: howItWorks.merchantStep2Title,
      desc: howItWorks.merchantStep2Desc,
    },
    {
      num: '3',
      title: howItWorks.merchantStep3Title,
      desc: howItWorks.merchantStep3Desc,
    },
  ];

  const currentSteps = activeTab === 'buyers' ? buyerSteps : merchantSteps;

  return (
    <section className="py-16 md:py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-left">
          <span className="text-xs sm:text-sm leading-relaxed text-[#8b6914] uppercase tracking-wider font-bold mb-3 inline-block">
            {howItWorks.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {howItWorks.headline1}
            <br />
            <span className="text-[#8b6914]">{howItWorks.headline2}</span>
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => setActiveTab('buyers')}
            className={`px-8 py-3 rounded-lg font-semibold text-sm md:text-base transition-all cursor-pointer shadow-sm ${
              activeTab === 'buyers'
                ? 'bg-[#8b6914] text-white shadow-md shadow-[#8b6914]/20'
                : 'bg-white border border-[#8b6914] text-[#8b6914] hover:bg-[#8b6914]/5'
            }`}
          >
            {howItWorks.tabBuyers}
          </button>
          
          <button
            onClick={() => setActiveTab('sellers')}
            className={`px-8 py-3 rounded-lg font-semibold text-sm md:text-base transition-all cursor-pointer shadow-sm ${
              activeTab === 'sellers'
                ? 'bg-[#8b6914] text-white shadow-md shadow-[#8b6914]/20'
                : 'bg-white border border-[#8b6914] text-[#8b6914] hover:bg-[#8b6914]/5'
            }`}
          >
            {howItWorks.tabSellers}
          </button>
        </div>

        {/* 3 Step Flow */}
        <div className="grid md:grid-cols-3 gap-8">
          {currentSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start"
            >
              <div className="w-11 h-11 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center font-bold text-lg mb-5 shadow-sm">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-2.5">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
