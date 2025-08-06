import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Palette, Camera, Brush, Aperture as Sculpture } from 'lucide-react';

const Collections: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const collections = [
    {
      id: 1,
      icon: <Palette className="w-8 h-8" />,
      title: {
        en: "Renaissance Masters",
        it: "Maestri del Rinascimento"
      },
      description: {
        en: "Discover the greatest works of Renaissance art in Rome, from Raphael's Rooms in the Vatican to Michelangelo's masterpieces.",
        it: "Scopri le più grandi opere d'arte rinascimentale a Roma, dalle Stanze di Raffaello in Vaticano ai capolavori di Michelangelo."
      },
      count: {
        en: "12 locations",
        it: "12 luoghi"
      }
    },
    {
      id: 2,
      icon: <Sculpture className="w-8 h-8" />,
      title: {
        en: "Baroque Sculptures",
        it: "Sculture Barocche"
      },
      description: {
        en: "Experience Bernini's dynamic sculptures and the baroque movement that transformed Rome in the 17th century.",
        it: "Vivi le sculture dinamiche del Bernini e il movimento barocco che trasformò Roma nel XVII secolo."
      },
      count: {
        en: "8 museums",
        it: "8 musei"
      }
    },
    {
      id: 3,
      icon: <Camera className="w-8 h-8" />,
      title: {
        en: "Contemporary Photography",
        it: "Fotografia Contemporanea"
      },
      description: {
        en: "Explore Rome's vibrant contemporary art scene through major photography exhibitions and installations.",
        it: "Esplora la vivace scena artistica contemporanea di Roma attraverso importanti mostre fotografiche e installazioni."
      },
      count: {
        en: "15 exhibitions",
        it: "15 mostre"
      }
    },
    {
      id: 4,
      icon: <Brush className="w-8 h-8" />,
      title: {
        en: "Ancient Roman Art",
        it: "Arte Romana Antica"
      },
      description: {
        en: "Journey through 2000 years of Roman civilization with archaeological treasures and classical sculptures.",
        it: "Viaggia attraverso 2000 anni di civiltà romana con tesori archeologici e sculture classiche."
      },
      count: {
        en: "20+ sites",
        it: "20+ siti"
      }
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          {currentLanguage === 'it' ? 'Le Nostre' : 'Our'}
          <span className="block text-gray-600">
            {currentLanguage === 'it' ? 'Collezioni' : 'Collections'}
          </span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {currentLanguage === 'it' 
            ? 'Esplora Roma attraverso collezioni tematiche curate che ti guidano attraverso epoche, stili e movimenti artistici che hanno definito la Città Eterna.'
            : 'Explore Rome through curated thematic collections that guide you through the epochs, styles, and artistic movements that have defined the Eternal City.'
          }
        </p>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {collections.map((collection) => (
          <div 
            key={collection.id}
            className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 cursor-pointer"
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-gray-100 rounded-2xl flex items-center justify-center text-slate-700 group-hover:from-slate-900 group-hover:to-slate-800 group-hover:text-white transition-all duration-300">
                {collection.icon}
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-slate-700 transition-colors">
                  {collection.title[currentLanguage] || collection.title.en}
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  {collection.count[currentLanguage] || collection.count.en}
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              {collection.description[currentLanguage] || collection.description.en}
            </p>
            
            <div className="flex items-center text-slate-600 group-hover:text-slate-900 transition-colors">
              <span className="text-sm font-medium">
                {currentLanguage === 'it' ? 'Esplora Collezione' : 'Explore Collection'}
              </span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Collection */}
      <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 rounded-3xl p-12 border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {currentLanguage === 'it' ? 'Collezione in Evidenza' : 'Featured Collection'}
          </h2>
          <h3 className="text-4xl font-bold text-slate-800 mb-6">
            {currentLanguage === 'it' ? 'Roma 2025: Anno Giubilare' : 'Rome 2025: Jubilee Year'}
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            {currentLanguage === 'it' 
              ? 'Una collezione speciale dedicata alle mostre e agli eventi culturali del Giubileo 2025, che celebra la spiritualità e l\'arte nella Città Eterna.'
              : 'A special collection dedicated to the exhibitions and cultural events of Jubilee 2025, celebrating spirituality and art in the Eternal City.'
            }
          </p>
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-full font-medium hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
            {currentLanguage === 'it' ? 'Scopri la Collezione' : 'Discover Collection'}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="text-center mt-16 p-8 bg-white rounded-2xl border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {currentLanguage === 'it' ? 'Prossimamente' : 'Coming Soon'}
        </h3>
        <p className="text-gray-600">
          {currentLanguage === 'it' 
            ? 'Stiamo lavorando su nuove collezioni tematiche per arricchire la tua esperienza artistica a Roma.'
            : 'We\'re working on new thematic collections to enrich your artistic experience in Rome.'
          }
        </p>
      </div>
    </div>
  );
};

export default Collections;