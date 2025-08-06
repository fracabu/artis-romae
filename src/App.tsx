import React, { useState, useEffect } from 'react';
import ExhibitionList from './components/ExhibitionList';
import ExhibitionDetail from './components/ExhibitionDetail';
import Collections from './components/Collections';
import About from './components/About';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useLanguage } from './contexts/LanguageContext';
import { Palette } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'collections' | 'about'>('home');
  const [selectedExhibitionId, setSelectedExhibitionId] = useState<number | null>(null);
  const { t, currentLanguage } = useLanguage();

  const handleExhibitionSelect = (exhibitionId: number) => {
    setSelectedExhibitionId(exhibitionId);
  };

  const handleBackToList = () => {
    setSelectedExhibitionId(null);
  };

  const handleNavigation = (view: 'home' | 'collections' | 'about') => {
    setCurrentView(view);
    setSelectedExhibitionId(null);
  };

  // SEO: Update page title based on current view
  useEffect(() => {
    if (selectedExhibitionId) {
      document.title = `Exhibition Details - Artis Roma | ${currentLanguage === 'it' ? 'Esperienze d\'Arte Curate' : 'Curated Art Experiences'}`;
    } else if (currentView === 'collections') {
      document.title = `Collections - Artis Roma | ${currentLanguage === 'it' ? 'Collezioni' : 'Collections'}`;
    } else if (currentView === 'about') {
      document.title = `About - Artis Roma | ${currentLanguage === 'it' ? 'Chi Siamo' : 'About'}`;
    } else {
      document.title = `Artis Roma - ${currentLanguage === 'it' ? 'Esperienze d\'Arte Curate a Roma' : 'Curated Art Experiences in Rome'}`;
    }
  }, [selectedExhibitionId, currentView, currentLanguage]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO: Structured Data for Breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://artisroma.com"
            },
            ...(selectedExhibitionId ? [{
              "@type": "ListItem",
              "position": 2,
              "name": "Exhibition Details", 
              "item": `https://artisroma.com/exhibition/${selectedExhibitionId}`
            }] : [])
          ]
        })}
      </script>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <Palette className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Artis Roma
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  Curated Art Experiences
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-6">
              <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium text-gray-600">
                <button 
                  onClick={() => handleNavigation('home')}
                  className={`hover:text-gray-900 cursor-pointer transition-colors ${currentView === 'home' ? 'text-gray-900 font-semibold' : ''}`}
                >
                  {t.navigation.experiences}
                </button>
                <button 
                  onClick={() => handleNavigation('collections')}
                  className={`hover:text-gray-900 cursor-pointer transition-colors ${currentView === 'collections' ? 'text-gray-900 font-semibold' : ''}`}
                >
                  {t.navigation.collections}
                </button>
                <button 
                  onClick={() => handleNavigation('about')}
                  className={`hover:text-gray-900 cursor-pointer transition-colors ${currentView === 'about' ? 'text-gray-900 font-semibold' : ''}`}
                >
                  {t.navigation.about}
                </button>
              </nav>
              
              <LanguageSwitcher />
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden mt-3 pt-3 border-t border-gray-100">
            <nav className="flex items-center justify-center space-x-6 text-sm font-medium text-gray-600">
              <button 
                onClick={() => handleNavigation('home')}
                className={`hover:text-gray-900 cursor-pointer transition-colors ${currentView === 'home' ? 'text-gray-900 font-semibold' : ''}`}
              >
                {t.navigation.experiences}
              </button>
              <button 
                onClick={() => handleNavigation('collections')}
                className={`hover:text-gray-900 cursor-pointer transition-colors ${currentView === 'collections' ? 'text-gray-900 font-semibold' : ''}`}
              >
                {t.navigation.collections}
              </button>
              <button 
                onClick={() => handleNavigation('about')}
                className={`hover:text-gray-900 cursor-pointer transition-colors ${currentView === 'about' ? 'text-gray-900 font-semibold' : ''}`}
              >
                {t.navigation.about}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {selectedExhibitionId ? (
          <ExhibitionDetail 
            exhibitionId={selectedExhibitionId} 
            onBack={handleBackToList}
          />
        ) : currentView === 'collections' ? (
          <Collections />
        ) : currentView === 'about' ? (
          <About />
        ) : (
          <ExhibitionList onExhibitionSelect={handleExhibitionSelect} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-gray-900 text-lg">Artis Roma</span>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                {t.hero.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>© 2025 Artis Roma</span>
                <span>•</span>
                <span>{t.footer.allRightsReserved}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {t.navigation.experiences}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>{t.footer.experiences.vatican}</li>
                <li>{t.footer.experiences.colosseum}</li>
                <li>{t.footer.experiences.borghese}</li>
                <li>{t.footer.experiences.maxxi}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {t.footer.contact.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>info@artisroma.com</li>
                <li>+39 06 123 4567</li>
                <li>{t.footer.contact.location}</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;