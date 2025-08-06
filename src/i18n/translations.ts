export interface Translation {
  // Header
  tagline: string;
  navigation: {
    experiences: string;
    collections: string;
    about: string;
  };
  
  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  
  // Experience List
  experiences: {
    readyTitle: string;
    readyDescription: string;
    discoverMore: string;
  };
  
  // Package Detail
  packageDetail: {
    backToExperiences: string;
    completeExperience: string;
    experienceOverview: string;
    nightsRecommended: string;
    bookYourExperience: string;
    getTickets: string;
    bookTickets: string;
    bookYourStay: string;
    bookOn: string;
    yourStay: string;
    kmFromAttraction: string;
    estimatedTotal: string;
    night: string;
    nights: string;
    strategicallyLocated: string;
    locationOverview: string;
    walkingDistance: string;
    estimatedTime: string;
    minutes: string;
    artisticDestination: string;
    yourAccommodation: string;
  };
  
  // Common
  loading: string;
  error: string;
  unableToLoad: string;
  
  // Footer
  footer: {
    allRightsReserved: string;
    contact: {
      title: string;
      location: string;
    };
    experiences: {
      vatican: string;
      colosseum: string;
      borghese: string;
      maxxi: string;
    };
  };
}

export const translations: Record<string, Translation> = {
  en: {
    // Header
    tagline: "Curated Art Experiences",
    navigation: {
      experiences: "Experiences",
      collections: "Collections",
      about: "About"
    },
    
    // Hero Section
    hero: {
      title: "Rome Art Experiences 2025",
      subtitle: "",
      description: "Discover Rome's artistic treasures through carefully curated experiences featuring current exhibitions, permanent collections, and perfectly located accommodations."
    },
    
    // Experience List
    experiences: {
      readyTitle: "Ready to explore Rome's art scene in 2025?",
      readyDescription: "Each experience includes current temporary exhibitions, permanent masterpieces, and is thoughtfully designed to immerse you in Rome's cultural treasures while ensuring comfort and convenience throughout your stay.",
      discoverMore: "Discover More"
    },
    
    // Package Detail
    packageDetail: {
      backToExperiences: "Back to Experiences",
      completeExperience: "Complete experience with curated accommodation",
      experienceOverview: "Experience Overview",
      nightsRecommended: "nights recommended",
      bookYourExperience: "Book Your Experience",
      getTickets: "Get Your Tickets",
      bookTickets: "Book Tickets",
      bookYourStay: "Book Your Stay",
      bookOn: "Book on",
      yourStay: "Your Stay",
      kmFromAttraction: "km from attraction",
      estimatedTotal: "Estimated total",
      night: "night",
      nights: "nights",
      strategicallyLocated: "Strategically located near",
      locationOverview: "Location Overview",
      walkingDistance: "Walking distance",
      estimatedTime: "Estimated time",
      minutes: "minutes",
      artisticDestination: "Your artistic destination",
      yourAccommodation: "Your accommodation"
    },
    
    // Common
    loading: "Loading...",
    error: "Error loading experiences:",
    unableToLoad: "Unable to load experience details",
    
    // Footer
    footer: {
      allRightsReserved: "All rights reserved",
      contact: {
        title: "Contact",
        location: "Rome, Italy"
      },
      experiences: {
        vatican: "Vatican Museums",
        colosseum: "Colosseum",
        borghese: "Borghese Gallery",
        capitoline: "Capitoline Museums",
        maxxi: "MAXXI Museum"
      }
    }
  },
  
  it: {
    // Header
    tagline: "Esperienze d'Arte Curate",
    navigation: {
      experiences: "Esperienze",
      collections: "Collezioni",
      about: "Chi Siamo"
    },
    
    // Hero Section
    hero: {
      title: "Esperienze d'Arte Roma 2025",
      subtitle: "",
      description: "Scopri i tesori artistici di Roma attraverso esperienze accuratamente curate con mostre attuali, collezioni permanenti e alloggi perfettamente posizionati."
    },
    
    // Experience List
    experiences: {
      readyTitle: "Pronto ad esplorare la scena artistica di Roma nel 2025?",
      readyDescription: "Ogni esperienza include mostre temporanee attuali, capolavori permanenti ed è progettata con cura per immergerti nei tesori culturali di Roma garantendo comfort e convenienza durante tutto il soggiorno.",
      discoverMore: "Scopri di Più"
    },
    
    // Package Detail
    packageDetail: {
      backToExperiences: "Torna alle Esperienze",
      completeExperience: "Esperienza completa con alloggio curato",
      experienceOverview: "Panoramica dell'Esperienza",
      nightsRecommended: "notti consigliate",
      bookYourExperience: "Prenota la Tua Esperienza",
      getTickets: "Ottieni i Biglietti",
      bookTickets: "Prenota Biglietti",
      bookYourStay: "Prenota il Soggiorno",
      bookOn: "Prenota su",
      yourStay: "Il Tuo Soggiorno",
      kmFromAttraction: "km dall'attrazione",
      estimatedTotal: "Totale stimato",
      night: "notte",
      nights: "notti",
      strategicallyLocated: "Posizionato strategicamente vicino a",
      locationOverview: "Panoramica della Posizione",
      walkingDistance: "Distanza a piedi",
      estimatedTime: "Tempo stimato",
      minutes: "minuti",
      artisticDestination: "La tua destinazione artistica",
      yourAccommodation: "Il tuo alloggio"
    },
    
    // Common
    loading: "Caricamento...",
    error: "Errore nel caricamento delle esperienze:",
    unableToLoad: "Impossibile caricare i dettagli dell'esperienza",
    
    // Footer
    footer: {
      allRightsReserved: "Tutti i diritti riservati",
      contact: {
        title: "Contatti",
        location: "Roma, Italia"
      },
      experiences: {
        vatican: "Musei Vaticani",
        colosseum: "Colosseo",
        borghese: "Galleria Borghese",
        capitoline: "Musei Capitolini",
        maxxi: "Museo MAXXI"
      }
    }
  }
};