import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Palette, Heart, Globe, Users, Award, MapPin } from 'lucide-react';

const About: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: {
        en: "Passion for Art",
        it: "Passione per l'Arte"
      },
      description: {
        en: "We believe art has the power to transform lives and create meaningful connections across cultures.",
        it: "Crediamo che l'arte abbia il potere di trasformare le vite e creare connessioni significative tra le culture."
      }
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: {
        en: "Cultural Bridge",
        it: "Ponte Culturale"
      },
      description: {
        en: "We connect travelers with Rome's artistic heritage through carefully curated experiences.",
        it: "Colleghiamo i viaggiatori con il patrimonio artistico di Roma attraverso esperienze accuratamente curate."
      }
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: {
        en: "Excellence",
        it: "Eccellenza"
      },
      description: {
        en: "Every experience is crafted with attention to detail and commitment to quality.",
        it: "Ogni esperienza è creata con attenzione ai dettagli e impegno per la qualità."
      }
    }
  ];

  const team = [
    {
      name: "Marco Rossi",
      role: {
        en: "Art Historian & Founder",
        it: "Storico dell'Arte e Fondatore"
      },
      description: {
        en: "PhD in Renaissance Art from La Sapienza University, with 15 years of experience in Roman museums.",
        it: "Dottorato in Arte Rinascimentale presso l'Università La Sapienza, con 15 anni di esperienza nei musei romani."
      }
    },
    {
      name: "Elena Bianchi",
      role: {
        en: "Cultural Experience Designer",
        it: "Designer di Esperienze Culturali"
      },
      description: {
        en: "Former curator at Palazzo Altemps, specializing in contemporary art and cultural programming.",
        it: "Ex curatrice a Palazzo Altemps, specializzata in arte contemporanea e programmazione culturale."
      }
    },
    {
      name: "Alessandro Conti",
      role: {
        en: "Local Partnerships Manager",
        it: "Manager Partnership Locali"
      },
      description: {
        en: "Native Roman with deep connections to the city's cultural institutions and hidden gems.",
        it: "Romano nativo con profonde connessioni alle istituzioni culturali della città e ai suoi tesori nascosti."
      }
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
          <Palette className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          {currentLanguage === 'it' ? 'Chi Siamo' : 'About Us'}
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {currentLanguage === 'it' 
            ? 'Artis Roma nasce dalla passione per l\'arte e dalla convinzione che ogni viaggio culturale debba essere un\'esperienza trasformativa e indimenticabile.'
            : 'Artis Roma was born from a passion for art and the belief that every cultural journey should be a transformative and unforgettable experience.'
          }
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 rounded-3xl p-12 mb-16 border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {currentLanguage === 'it' ? 'La Nostra Missione' : 'Our Mission'}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {currentLanguage === 'it' 
                ? 'Creiamo esperienze artistiche uniche che combinano i capolavori immortali di Roma con le mostre temporanee più significative, offrendo ai nostri ospiti un accesso privilegiato al patrimonio culturale della Città Eterna.'
                : 'We create unique artistic experiences that combine Rome\'s immortal masterpieces with the most significant temporary exhibitions, offering our guests privileged access to the cultural heritage of the Eternal City.'
              }
            </p>
            <p className="text-gray-600 leading-relaxed">
              {currentLanguage === 'it' 
                ? 'Ogni esperienza è progettata per massimizzare il valore culturale del vostro soggiorno, con alloggi strategicamente posizionati e itinerari personalizzati che rispettano i vostri tempi e interessi.'
                : 'Each experience is designed to maximize the cultural value of your stay, with strategically positioned accommodations and personalized itineraries that respect your time and interests.'
              }
            </p>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-slate-600 mr-3" />
                <span className="font-semibold text-gray-900">
                  {currentLanguage === 'it' ? 'Sede a Roma' : 'Based in Rome'}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-slate-600 mr-3" />
                <span className="font-semibold text-gray-900">
                  {currentLanguage === 'it' ? '1000+ Ospiti Soddisfatti' : '1000+ Satisfied Guests'}
                </span>
              </div>
              <div className="flex items-center">
                <Award className="w-6 h-6 text-slate-600 mr-3" />
                <span className="font-semibold text-gray-900">
                  {currentLanguage === 'it' ? '50+ Partnership Culturali' : '50+ Cultural Partnerships'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          {currentLanguage === 'it' ? 'I Nostri Valori' : 'Our Values'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-700 group-hover:from-slate-900 group-hover:to-slate-800 group-hover:text-white transition-all duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {value.title[currentLanguage] || value.title.en}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description[currentLanguage] || value.description.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          {currentLanguage === 'it' ? 'Il Nostro Team' : 'Our Team'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-700">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                {member.name}
              </h3>
              <p className="text-slate-600 text-center font-medium mb-4">
                {member.role[currentLanguage] || member.role.en}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed text-center">
                {member.description[currentLanguage] || member.description.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {currentLanguage === 'it' ? 'Contattaci' : 'Get in Touch'}
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          {currentLanguage === 'it' 
            ? 'Hai domande sulle nostre esperienze o vuoi creare un itinerario personalizzato? Il nostro team è qui per aiutarti.'
            : 'Have questions about our experiences or want to create a personalized itinerary? Our team is here to help.'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="mailto:info@artisroma.com"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-full font-medium hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            info@artisroma.com
          </a>
          <a 
            href="tel:+390612345678"
            className="inline-flex items-center px-8 py-4 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-all duration-300"
          >
            +39 06 123 4567
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;