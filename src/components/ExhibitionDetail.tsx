import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { ArrowLeft, MapPin, Home, ExternalLink, Euro, Calendar, Ticket } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix per le icone di Leaflet
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ExhibitionData {
  exhibitionDetails: {
    id: number;
    type: 'temporary' | 'permanent';
    category: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    dates?: string;
    venue: {
      name: string;
      address: string;
      location: { lat: number; lon: number };
    };
    ticketLink: string;
    officialLink: string;
    imageUrl: string;
    highlights: string[];
  };
  recommendedProperty: {
    id: number;
    name: string;
    baseNightlyPrice: number;
    location: { lat: number; lon: number };
    bookingLinks: {
      airbnb: string;
      booking: string;
      vrbo: string;
    };
  };
  estimatedStayPrice: number;
  suggestedNights: number;
  distanceToAttraction: string;
}

interface ExhibitionDetailProps {
  exhibitionId: number;
  onBack: () => void;
}

const ExhibitionDetail: React.FC<ExhibitionDetailProps> = ({ exhibitionId, onBack }) => {
  const [exhibitionData, setExhibitionData] = useState<ExhibitionData | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    fetchExhibitionData();
  }, [exhibitionId, currentLanguage]);

  const fetchExhibitionData = async () => {
    try {
      const response = await fetch(`/api/exhibition/${exhibitionId}?lang=${currentLanguage}`);
      const data = await response.json();
      setExhibitionData(data);
    } catch (error) {
      console.error('Error loading exhibition:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-800"></div>
          <p className="mt-4 text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (!exhibitionData) {
    return (
      <div className="text-center py-32">
        <p className="text-xl text-gray-600 mb-6">Unable to load exhibition details</p>
        <button 
          onClick={onBack}
          className="text-gray-800 hover:text-gray-600 font-medium flex items-center mx-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Exhibitions
        </button>
      </div>
    );
  }

  const { exhibitionDetails, recommendedProperty, estimatedStayPrice, suggestedNights, distanceToAttraction } = exhibitionData;

  // Coordinate per la mappa
  const attractionCoords: [number, number] = [
    exhibitionDetails.venue.location.lat,
    exhibitionDetails.venue.location.lon
  ];
  const propertyCoords: [number, number] = [
    recommendedProperty.location.lat,
    recommendedProperty.location.lon
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 sm:mb-12 font-medium transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        {currentLanguage === 'it' ? 'Torna alle Mostre' : 'Back to Exhibitions'}
      </button>

      {/* Hero Section */}
      <div className="mb-8 sm:mb-16">
        <div className="relative h-60 sm:h-80 rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-8">
          <img 
            src={exhibitionDetails.imageUrl}
            alt={exhibitionDetails.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-4">
              <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit ${
                exhibitionDetails.type === 'temporary' 
                  ? 'bg-red-500' 
                  : 'bg-blue-500'
              }`}>
                {exhibitionDetails.type === 'temporary' 
                  ? (currentLanguage === 'it' ? 'Mostra Temporanea' : 'Temporary Exhibition')
                  : (currentLanguage === 'it' ? 'Museo Permanente' : 'Permanent Museum')
                }
              </div>
              {exhibitionDetails.dates && (
                <div className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center w-fit">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">{exhibitionDetails.dates}</span>
                  <span className="sm:hidden">{exhibitionDetails.dates.split(' ').slice(0, 2).join(' ')}</span>
                </div>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 tracking-tight leading-tight">
              {exhibitionDetails.title}
            </h1>
            <p className="text-base sm:text-xl opacity-90 font-light">
              {exhibitionDetails.venue.name}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-16">
        {/* Exhibition Details */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              {currentLanguage === 'it' ? 'Panoramica' : 'Overview'}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
              {exhibitionDetails.fullDescription}
            </p>
            
            {/* Highlights Section */}
            {exhibitionDetails.highlights && exhibitionDetails.highlights.length > 0 && (
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                  {currentLanguage === 'it' ? 'Punti Salienti:' : 'Highlights:'}
                </h3>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  {exhibitionDetails.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-600 rounded-full mt-2 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-gray-600 text-xs sm:text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{exhibitionDetails.venue.address}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-8">
              {currentLanguage === 'it' ? 'Prenota la Tua Visita' : 'Book Your Visit'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <a
                href={exhibitionDetails.ticketLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 text-white font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center group text-sm sm:text-base"
              >
                <Ticket className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                {currentLanguage === 'it' ? 'Acquista Biglietti' : 'Buy Tickets'}
              </a>
              
              <a
                href={exhibitionDetails.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 text-gray-700 font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center group text-sm sm:text-base"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                {currentLanguage === 'it' ? 'Sito Ufficiale' : 'Official Website'}
              </a>
            </div>

            {/* Accommodation Booking */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                {currentLanguage === 'it' ? 'Prenota il Soggiorno' : 'Book Your Stay'}
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                <a
                  href="https://www.airbnb.it/rooms/1381673546089400028"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  {currentLanguage === 'it' ? 'Prenota su' : 'Book on'} Airbnb
                </a>
                <a
                  href="https://www.booking.com/hotel/it/roma-caput-mundi-guest-house.it.html?label=gen173bo-10CAsocUIccm9tYS1jYXB1dC1tdW5kaS1ndWVzdC1ob3VzZUgzWANocYgBAZgBM7gBF8gBDNgBA-gBAfgBAYgCAZgCBqgCAbgC55TNxAbAAgHSAiRkZGI1MTBkNS1hZTU0LTQwYWEtOGY2MC1mMjZlM2VkZjI2YzDYAgHgAgE&sid=e8b1587fb7ca635399789691b1882b75&dist=0&keep_landing=1&sb_price_type=total&type=total&"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  {currentLanguage === 'it' ? 'Prenota su' : 'Book on'} Booking.com
                </a>
                <a
                  href="https://www.booking.com/hotel/it/roma-caput-mundi-guest-house.it.html?label=gen173bo-10CAsocUIccm9tYS1jYXB1dC1tdW5kaS1ndWVzdC1ob3VzZUgzWANocYgBAZgBM7gBF8gBDNgBA-gBAfgBAYgCAZgCBqgCAbgC55TNxAbAAgHSAiRkZGI1MTBkNS1hZTU0LTQwYWEtOGY2MC1mMjZlM2VkZjI2YzDYAgHgAgE&sid=e8b1587fb7ca635399789691b1882b75&dist=0&keep_landing=1&sb_price_type=total&type=total&"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  {currentLanguage === 'it' ? 'Prenota su' : 'Book on'} Vrbo
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Accommodation Sidebar */}
        <div className="space-y-6 sm:space-y-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 lg:sticky lg:top-24">
            <div className="flex items-center mb-3 sm:mb-4">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 mr-2 sm:mr-3" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                {currentLanguage === 'it' ? 'Il Tuo Soggiorno' : 'Your Stay'}
              </h3>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
              {recommendedProperty.name}
            </h4>
            
            <div className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 space-y-1">
              <div className="flex items-center">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span>{distanceToAttraction} km {currentLanguage === 'it' ? 'dall\'attrazione' : 'from attraction'}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span>{suggestedNights} {currentLanguage === 'it' ? 'notti consigliate' : 'nights recommended'}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs sm:text-sm text-gray-600">
                  {currentLanguage === 'it' ? 'Totale stimato' : 'Estimated total'}
                </span>
                <div className="flex items-center">
                  <Euro className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 mr-1" />
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">€{estimatedStayPrice}</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                €{recommendedProperty.baseNightlyPrice}/{currentLanguage === 'it' ? 'notte' : 'night'} × {suggestedNights} {currentLanguage === 'it' ? 'notti' : 'nights'}
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              {currentLanguage === 'it' 
                ? `Posizionato strategicamente vicino a ${exhibitionDetails.venue.name}, questo alloggio massimizza il tuo tempo esplorando i tesori artistici di Roma.`
                : `Strategically located near ${exhibitionDetails.venue.name}, this accommodation maximizes your time exploring Rome's artistic treasures.`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 mr-2 sm:mr-3" />
          {currentLanguage === 'it' ? 'Panoramica della Posizione' : 'Location Overview'}
        </h2>
        <div className="h-64 sm:h-96 rounded-lg sm:rounded-xl overflow-hidden">
          <MapContainer
            center={attractionCoords}
            zoom={14}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            <Marker position={attractionCoords}>
              <Popup>
                <div className="text-center">
                  <strong>{exhibitionDetails.venue.name}</strong>
                  <br />
                  <span className="text-sm text-gray-600">
                    {currentLanguage === 'it' ? 'La tua destinazione artistica' : 'Your artistic destination'}
                  </span>
                </div>
              </Popup>
            </Marker>
            
            <Marker position={propertyCoords}>
              <Popup>
                <div className="text-center">
                  <strong>{recommendedProperty.name}</strong>
                  <br />
                  <span className="text-sm text-gray-600">
                    {currentLanguage === 'it' ? 'Il tuo alloggio' : 'Your accommodation'}
                  </span>
                </div>
              </Popup>
            </Marker>
            
            <Polyline
              positions={[attractionCoords, propertyCoords]}
              color="#1e293b"
              weight={3}
              opacity={0.7}
              dashArray="8, 8"
            />
          </MapContainer>
        </div>
        <p className="text-gray-500 text-center mt-3 sm:mt-4 text-xs sm:text-sm px-2">
          {currentLanguage === 'it' ? 'Distanza a piedi' : 'Walking distance'}: {distanceToAttraction} km • 
          {currentLanguage === 'it' ? ' Tempo stimato' : ' Estimated time'}: {Math.ceil(parseFloat(distanceToAttraction) * 12)} {currentLanguage === 'it' ? 'minuti' : 'minutes'}
        </p>
      </div>
    </div>
  );
};

export default ExhibitionDetail;