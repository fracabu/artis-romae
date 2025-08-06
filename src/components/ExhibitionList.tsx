import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, ExternalLink, Ticket, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Exhibition {
  id: number;
  type: 'temporary' | 'permanent';
  category: string;
  title: string;
  shortDescription: string;
  dates?: string;
  venue: {
    name: string;
    address: string;
    location: { lat: number; lon: number };
  };
  ticketLink: string;
  officialLink: string;
  imageUrl: string;
}

interface ExhibitionListProps {
  onExhibitionSelect: (exhibitionId: number) => void;
}

const ExhibitionList: React.FC<ExhibitionListProps> = ({ onExhibitionSelect }) => {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'temporary' | 'permanent'>('all');
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    fetchExhibitions();
  }, [currentLanguage, filter]);

  const fetchExhibitions = async () => {
    try {
      const filterParam = filter === 'all' ? '' : `?type=${filter}`;
      const langParam = filter === 'all' ? `?lang=${currentLanguage}` : `&lang=${currentLanguage}`;
      const response = await fetch(`/api/exhibitions${filterParam}${langParam}`);
      const data = await response.json();
      setExhibitions(data);
    } catch (error) {
      console.error('Error loading exhibitions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-300 border-t-slate-800"></div>
          <p className="mt-4 text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  const temporaryExhibitions = exhibitions.filter(exp => exp.type === 'temporary');
  const permanentExhibitions = exhibitions.filter(exp => exp.type === 'permanent');

  return (
    <section>
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
          {t.hero.title.split(' ').slice(0, 2).join(' ')}
          <span className="block text-gray-600">{t.hero.title.split(' ').slice(2).join(' ')}</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t.hero.description}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-100 rounded-full p-1 flex">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'all' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {currentLanguage === 'it' ? 'Tutte' : 'All'}
          </button>
          <button
            onClick={() => setFilter('temporary')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'temporary' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {currentLanguage === 'it' ? 'Mostre Temporanee' : 'Temporary Exhibitions'}
          </button>
          <button
            onClick={() => setFilter('permanent')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'permanent' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {currentLanguage === 'it' ? 'Musei Permanenti' : 'Permanent Museums'}
          </button>
        </div>
      </div>

      {/* Temporary Exhibitions Section */}
      {(filter === 'all' || filter === 'temporary') && temporaryExhibitions.length > 0 && (
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {currentLanguage === 'it' ? 'Mostre Temporanee 2025' : 'Temporary Exhibitions 2025'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {temporaryExhibitions.map((exhibition) => (
              <ExhibitionCard 
                key={exhibition.id} 
                exhibition={exhibition} 
                onSelect={onExhibitionSelect}
                currentLanguage={currentLanguage}
              />
            ))}
          </div>
        </div>
      )}

      {/* Permanent Museums Section */}
      {(filter === 'all' || filter === 'permanent') && permanentExhibitions.length > 0 && (
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {currentLanguage === 'it' ? 'Musei e Collezioni Permanenti' : 'Permanent Museums & Collections'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {permanentExhibitions.map((exhibition) => (
              <ExhibitionCard 
                key={exhibition.id} 
                exhibition={exhibition} 
                onSelect={onExhibitionSelect}
                currentLanguage={currentLanguage}
              />
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="text-center mt-20 p-12 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 rounded-3xl border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.experiences.readyTitle}</h3>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          {t.experiences.readyDescription}
        </p>
        <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-full font-medium hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl">
          {t.experiences.discoverMore}
          <ArrowRight className="w-5 h-5 ml-2" />
        </div>
      </div>
    </section>
  );
};

// Exhibition Card Component
const ExhibitionCard: React.FC<{
  exhibition: Exhibition;
  onSelect: (id: number) => void;
  currentLanguage: string;
}> = ({ exhibition, onSelect, currentLanguage }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={exhibition.imageUrl}
          alt={exhibition.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            exhibition.type === 'temporary' 
              ? 'bg-red-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            {exhibition.type === 'temporary' 
              ? (currentLanguage === 'it' ? 'Temporanea' : 'Temporary')
              : (currentLanguage === 'it' ? 'Permanente' : 'Permanent')
            }
          </div>
        </div>

        {/* Dates Badge for temporary exhibitions */}
        {exhibition.dates && (
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-800 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {exhibition.dates}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-slate-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{exhibition.venue.name}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors line-clamp-2">
          {exhibition.title}
        </h3>
        
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {exhibition.shortDescription}
        </p>

        {/* Action Buttons */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <a
              href={exhibition.ticketLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-slate-900 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Ticket className="w-4 h-4 mr-2" />
              {currentLanguage === 'it' ? 'Biglietti' : 'Tickets'}
            </a>
            <a
              href={exhibition.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-100 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {currentLanguage === 'it' ? 'Sito' : 'Site'}
            </a>
          </div>
          
          <button
            onClick={() => onSelect(exhibition.id)}
            className="w-full bg-gradient-to-r from-slate-50 to-gray-50 text-slate-700 text-sm font-medium py-2 px-4 rounded-lg hover:from-slate-100 hover:to-gray-100 transition-all flex items-center justify-center group-hover:shadow-md"
          >
            {currentLanguage === 'it' ? 'Scopri di Più' : 'Discover More'}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionList;