import React from 'react';
import { MapPin, Zap, CheckCircle } from 'lucide-react';

const InfoCards = () => {
  const cards = [
    {
      icon: MapPin,
      title: 'Precise Location Reporting',
      description: 'Pinpoint exact locations on an interactive map for faster and accurate issue resolution.',
      color: 'blue',
      bgColor: 'bg-blue-600',
      iconColor: 'text-white'
    },
    {
      icon: Zap,
      title: 'Priority Handling',
      description: 'Set priority levels to ensure urgent issues receive immediate attention from authorities.',
      color: 'yellow',
      bgColor: 'bg-yellow-400',
      iconColor: 'text-blue-900'
    },
    {
      icon: CheckCircle,
      title: 'Track & Resolve',
      description: 'Monitor your complaint status in real-time and get notified when issues are resolved.',
      color: 'green',
      bgColor: 'bg-emerald-600',
      iconColor: 'text-white'
    }
  ];

  return (
    <section className="container mx-auto px-6 py-20 max-w-7xl">
      <h3 className="text-5xl font-black text-center mb-16 text-blue-900">
        Why Choose CitySolve?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card-hover bg-white rounded-3xl p-10 text-center shadow-2xl border border-blue-100"
          >
            <div className={`w-24 h-24 ${card.bgColor} rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl`}>
              <card.icon size={48} className={card.iconColor} />
            </div>
            <h4 className="text-2xl font-bold text-blue-900 mb-6">{card.title}</h4>
            <p className="text-lg text-slate-600 leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoCards;