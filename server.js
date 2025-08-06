import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5011;

// Global error handlers
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.use(cors());
app.use(express.json());

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  if (!res.headersSent) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Database completo con tutte le mostre temporanee e musei permanenti di Roma 2025
const exhibitionsDB = [
  // MOSTRE TEMPORANEE ESTATE 2025
  {
    id: 1,
    type: 'temporary',
    category: 'painting',
    title: {
      en: "Caravaggio - The Conversion of Saul",
      it: "Caravaggio - La conversione di Saulo"
    },
    shortDescription: {
      en: "Exhibition-dossier dedicated to Caravaggio's 'Conversion of Saul', exceptionally displayed at Palazzo Barberini with infrared reflectography revealing technical details.",
      it: "Esposizione-dossier dedicata alla 'Conversione di Saulo' di Caravaggio, eccezionalmente esposta a Palazzo Barberini con riflettografia infrarossa che svela dettagli tecnici."
    },
    fullDescription: {
      en: "Exhibition-dossier dedicated to Caravaggio's 'Conversion of Saul' (known as 'Pala Odescalchi'), a masterpiece by Merisi exceptionally displayed at Palazzo Barberini. In dialogue with the original work are presented a high-resolution copy of the 'Conversion' made for the Cerasi Chapel and the infrared reflectography of the painting, which reveals technical and compositional details.",
      it: "Esposizione-dossier dedicata alla 'Conversione di Saulo' di Caravaggio (nota come 'Pala Odescalchi'), capolavoro del Merisi eccezionalmente esposto a Palazzo Barberini. In dialogo con l'opera originale sono presentate una copia ad altissima risoluzione della 'Conversione' realizzata per la Cappella Cerasi e la riflettografia infrarossa del dipinto, che ne svela dettagli tecnici e compositivi."
    },
    dates: {
      en: "July 24 - September 30, 2025",
      it: "24 luglio - 30 settembre 2025"
    },
    venue: {
      name: {
        en: "Palazzo Barberini",
        it: "Palazzo Barberini"
      },
      address: "Via delle Quattro Fontane 13, Roma",
      location: { lat: 41.9017, lon: 12.4874 }
    },
    ticketLink: "https://www.coopculture.it/it/poi/palazzo-barberini/",
    officialLink: "https://barberinicorsini.org/evento/caravaggio-la-conversione-di-saulo/",
    imageUrl: "https://images.pexels.com/photos/1292241/pexels-photo-1292241.jpeg?auto=compress&cs=tinysrgb&w=800",
    highlights: {
      en: [
        "Original 'Conversion of Saul' by Caravaggio",
        "High-resolution copy from Cerasi Chapel",
        "Infrared reflectography revealing technical secrets",
        "Dialogue between original and reproduction"
      ],
      it: [
        "Originale 'Conversione di Saulo' di Caravaggio",
        "Copia ad alta risoluzione dalla Cappella Cerasi",
        "Riflettografia infrarossa che svela segreti tecnici",
        "Dialogo tra originale e riproduzione"
      ]
    }
  },
  {
    id: 2,
    type: 'temporary',
    category: 'mixed',
    title: {
      en: "FLOWERS. From Renaissance to Artificial Intelligence",
      it: "FLOWERS. Dal Rinascimento all'intelligenza artificiale"
    },
    shortDescription: {
      en: "Major thematic exhibition dedicated to flowers in art, through over 90 works from the 16th to 21st century, uniting art, science and technology.",
      it: "Grande mostra tematica dedicata al fiore nell'arte, attraverso oltre 90 opere dal XVI al XXI secolo, unendo arte, scienza e tecnologia."
    },
    fullDescription: {
      en: "Major thematic exhibition dedicated to flowers in art, through over 90 works from the 16th to 21st century. The path unites art, science and technology, presenting ancient masterpieces (from Jan Brueghel the Elder to Burne-Jones) alongside contemporary installations (Ai Weiwei, Kapwani Kiwanga, Studio Drift, Kehinde Wiley, Rebecca Louise Law, etc.) that explore the evocative and symbolic power of flowers.",
      it: "Grande mostra tematica dedicata al fiore nell'arte, attraverso oltre 90 opere dal XVI al XXI secolo. Il percorso unisce arte, scienza e tecnologia, presentando capolavori antichi (da Jan Brueghel il Vecchio a Burne-Jones) accanto a installazioni contemporanee (Ai Weiwei, Kapwani Kiwanga, Studio Drift, Kehinde Wiley, Rebecca Louise Law, etc.) che esplorano il potere evocativo e simbolico dei fiori."
    },
    dates: {
      en: "February 14, 2025 - January 18, 2026",
      it: "14 febbraio 2025 - 18 gennaio 2026"
    },
    venue: {
      name: {
        en: "Chiostro del Bramante",
        it: "Chiostro del Bramante"
      },
      address: "Arco della Pace 5, Roma",
      location: { lat: 41.9028, lon: 12.4731 }
    },
    ticketLink: "https://www.2tickets.it/TitoliEse.aspx?ide=894&idc=9&set=M",
    officialLink: "https://www.chiostrodelbramante.it/post_mostra/flowers-fiori-nell-arte/",
    imageUrl: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800",
    highlights: {
      en: [
        "Over 90 works from 16th to 21st century",
        "Jan Brueghel the Elder masterpieces",
        "Contemporary installations by Ai Weiwei",
        "Dialogue between art, science and technology"
      ],
      it: [
        "Oltre 90 opere dal XVI al XXI secolo",
        "Capolavori di Jan Brueghel il Vecchio",
        "Installazioni contemporanee di Ai Weiwei",
        "Dialogo tra arte, scienza e tecnologia"
      ]
    }
  },
  {
    id: 3,
    type: 'temporary',
    category: 'contemporary',
    title: {
      en: "Helga Vockenhuber - CORONA GLORIAE",
      it: "Helga Vockenhuber - CORONA GLORIAE"
    },
    shortDescription: {
      en: "Contemporary installation placed under the Pantheon's oculus: a monumental bronze crown of thorns, broken into seven fragments, for Jubilee 2025.",
      it: "Installazione contemporanea collocata sotto l'oculo del Pantheon: una monumentale corona di spine in bronzo, spezzata in sette frammenti, per il Giubileo 2025."
    },
    fullDescription: {
      en: "Contemporary installation placed under the Pantheon's oculus: a monumental bronze crown of thorns, broken into seven fragments, symbolizing the drama of human existence and the hope of redemption. The work, commissioned for Jubilee 2025, creates a powerful dialogue between contemporary art and spirituality in the Pantheon space.",
      it: "Installazione contemporanea collocata sotto l'oculo del Pantheon: una monumentale corona di spine in bronzo, spezzata in sette frammenti, che simboleggia il dramma dell'esistenza umana e la speranza di redenzione. L'opera, voluta per il Giubileo 2025, crea un potente dialogo tra arte contemporanea e spiritualità nello spazio del Pantheon."
    },
    dates: {
      en: "July 2 - September 16, 2025",
      it: "2 luglio - 16 settembre 2025"
    },
    venue: {
      name: {
        en: "Pantheon",
        it: "Pantheon"
      },
      address: "Piazza della Rotonda, Roma",
      location: { lat: 41.8986, lon: 12.4769 }
    },
    ticketLink: "https://portale.museiitaliani.it/b2c/buyTicketless/33f77159-0acd-40c4-8524-701f33aae108",
    officialLink: "https://direzionemuseiroma.cultura.gov.it/helga-vockenhuber-corona-gloriae/",
    imageUrl: "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800",
    highlights: {
      en: [
        "Monumental bronze crown of thorns",
        "Installation under Pantheon's oculus",
        "Seven symbolic fragments",
        "Jubilee 2025 special commission"
      ],
      it: [
        "Monumentale corona di spine in bronzo",
        "Installazione sotto l'oculo del Pantheon",
        "Sette frammenti simbolici",
        "Commissione speciale Giubileo 2025"
      ]
    }
  },
  {
    id: 4,
    type: 'temporary',
    category: 'photography',
    title: {
      en: "Elliott Erwitt - Icons",
      it: "Elliott Erwitt - Icons"
    },
    shortDescription: {
      en: "Extensive retrospective dedicated to Elliott Erwitt, master of 20th century photography known for irony and humanity in his shots.",
      it: "Ampia retrospettiva dedicata a Elliott Erwitt, maestro della fotografia del Novecento noto per l'ironia e l'umanità dei suoi scatti."
    },
    fullDescription: {
      en: "Extensive retrospective dedicated to Elliott Erwitt, master of 20th century photography known for irony and humanity in his shots. On display over 80 iconic photographs that trace Erwitt's long career, transforming everyday moments into unforgettable images. Present are famous portraits (Marilyn Monroe, Che Guevara, Sophia Loren, etc.), historical photos (the kiss from the car in Times Square, the Nixon-Khrushchev argument) and life scenes captured with humor and empathy - a unique look at the 'human comedy'.",
      it: "Ampia retrospettiva dedicata a Elliott Erwitt, maestro della fotografia del Novecento noto per l'ironia e l'umanità dei suoi scatti. In mostra oltre 80 fotografie iconiche che ripercorrono la lunga carriera di Erwitt, trasformando attimi quotidiani in immagini indimenticabili. Presenti celebri ritratti (Marilyn Monroe, Che Guevara, Sophia Loren, etc.), foto storiche (il bacio dall'auto a Times Square, il diverbio Nixon-Krusciov) e scene di vita colte con humor e empatia - uno sguardo unico sulla 'commedia umana'."
    },
    dates: {
      en: "June 28 - September 21, 2025",
      it: "28 giugno - 21 settembre 2025"
    },
    venue: {
      name: {
        en: "Palazzo Bonaparte",
        it: "Palazzo Bonaparte"
      },
      address: "Piazza Venezia 5, Roma",
      location: { lat: 41.8958, lon: 12.4823 }
    },
    ticketLink: "https://www.ticket.it/mostre/evento/elliott-erwitt.aspx",
    officialLink: "https://www.mostrepalazzobonaparte.it/mostra-erwitt.php",
    imageUrl: "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800",
    highlights: {
      en: [
        "Over 80 iconic photographs",
        "Famous portraits: Marilyn Monroe, Che Guevara",
        "Historical moments: Times Square kiss",
        "Unique perspective on human comedy"
      ],
      it: [
        "Oltre 80 fotografie iconiche",
        "Ritratti celebri: Marilyn Monroe, Che Guevara",
        "Momenti storici: bacio a Times Square",
        "Sguardo unico sulla commedia umana"
      ]
    }
  },
  {
    id: 5,
    type: 'temporary',
    category: 'archaeology',
    title: {
      en: "Treasures of the Pharaohs",
      it: "Tesori dei Faraoni"
    },
    shortDescription: {
      en: "Event exhibition on Ancient Egypt with 130 masterpieces from major Egyptian museums, some displayed in Italy for the first time.",
      it: "Mostra-evento sull'Antico Egitto con 130 capolavori dai più importanti musei egiziani, alcuni esposti in Italia per la prima volta."
    },
    fullDescription: {
      en: "Event exhibition on Ancient Egypt with 130 masterpieces from the most important Egyptian museums (Egyptian Museum of Cairo, Luxor, etc.), some displayed in Italy for the first time. A journey through 3000 years of pharaonic civilization: monumental statues (like the Triad of Mycerinus), precious golden sarcophagi (of queens like Ahhotep and Thuya), legendary jewels (Golden Flies Necklace of Ahhotep) and artifacts from the latest archaeological discoveries. The exhibition, of historical significance, is the result of an Italy-Egypt cultural agreement and offers the public a unique experience in the era of the Pharaohs.",
      it: "Mostra-evento sull'Antico Egitto con 130 capolavori provenienti dai più importanti musei egiziani (Museo Egizio del Cairo, Luxor, ecc.), alcuni esposti in Italia per la prima volta. Un viaggio attraverso 3000 anni di civiltà faraonica: statue monumentali (come la Triade di Micerino), preziosi sarcofagi d'oro (di regine come Ahhotep e Thuya), gioielli leggendari (Collana delle Mosche d'Oro di Ahhotep) e reperti delle ultime scoperte archeologiche. La mostra, di portata storica, è frutto di un accordo culturale Italia–Egitto e offre al pubblico un'esperienza unica nell'epoca dei Faraoni."
    },
    dates: {
      en: "October 24, 2025 - May 3, 2026",
      it: "24 ottobre 2025 - 3 maggio 2026"
    },
    venue: {
      name: {
        en: "Scuderie del Quirinale",
        it: "Scuderie del Quirinale"
      },
      address: "Via XXIV Maggio 16, Roma",
      location: { lat: 41.8955, lon: 12.4890 }
    },
    ticketLink: "https://scuderiequirinale.vivaticket.it",
    officialLink: "https://www.ales-spa.com/i-capolavori-del-museo-egizio-del-cairo-alle-scuderie-del-quirinale-di-roma-dal-24-ottobre-2025-al-3-maggio-2026/",
    imageUrl: "https://images.pexels.com/photos/262780/pexels-photo-262780.jpeg?auto=compress&cs=tinysrgb&w=800",
    highlights: {
      en: [
        "130 masterpieces from Egyptian museums",
        "Triad of Mycerinus monumental statue",
        "Golden sarcophagi of queens Ahhotep and Thuya",
        "Golden Flies Necklace legendary jewel"
      ],
      it: [
        "130 capolavori dai musei egiziani",
        "Statua monumentale Triade di Micerino",
        "Sarcofagi d'oro delle regine Ahhotep e Thuya",
        "Gioiello leggendario Collana delle Mosche d'Oro"
      ]
    }
  },

  // MUSEI PERMANENTI
  {
    id: 20,
    type: 'permanent',
    category: 'classical',
    title: {
      en: "Vatican Museums & Sistine Chapel",
      it: "Musei Vaticani e Cappella Sistina"
    },
    shortDescription: {
      en: "One of the world's greatest art collections accumulated by the Popes since the Renaissance. Over 20,000 exhibited works including Michelangelo's Sistine Chapel.",
      it: "Una delle più grandi collezioni d'arte del mondo, accumulata dai Papi dal Rinascimento. Oltre 20.000 opere esposte inclusa la Cappella Sistina di Michelangelo."
    },
    fullDescription: {
      en: "The Vatican museum complex houses one of the world's greatest art collections, accumulated by the Popes since the Renaissance. Over 20,000 exhibited works offer a journey spanning from Ancient Egypt and Etruscan civilization, to Greco-Roman classical art, from the Middle Ages to the Renaissance up to contemporary art. Among the masterpieces not to be missed: Raphael's Rooms, the collection of antiquities (statues like the Laocoön and Apollo Belvedere), the Gallery of Tapestries and Maps, and naturally the Sistine Chapel frescoed by Michelangelo (with the Last Judgment and the vault with the Creation of Adam).",
      it: "Il complesso museale del Vaticano custodisce una delle più grandi collezioni d'arte del mondo, accumulata dai Papi dal Rinascimento ad oggi. Oltre 20.000 opere esposte offrono un percorso che spazia dall'Antico Egitto e dalla civiltà etrusca, all'arte classica greco-romana, dal Medioevo al Rinascimento fino all'arte contemporanea. Tra i capolavori da non perdere: le Stanze di Raffaello, la collezione di antichità (statue come il Laocoonte e l'Apollo del Belvedere), la Galleria degli Arazzi e delle Carte Geografiche, e naturalmente la Cappella Sistina affrescata da Michelangelo (con il Giudizio Universale e la volta con la Creazione di Adamo)."
    },
    venue: {
      name: {
        en: "Vatican Museums",
        it: "Musei Vaticani"
      },
      address: "Viale Vaticano, Città del Vaticano",
      location: { lat: 41.9065, lon: 12.4536 }
    },
    ticketLink: "https://tickets.museivaticani.va",
    officialLink: "https://www.museivaticani.va",
    imageUrl: "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800",
    highlights: {
      en: [
        "Sistine Chapel with Michelangelo's frescoes",
        "Raphael Rooms with Renaissance masterpieces",
        "Classical antiquities: Laocoön and Apollo Belvedere",
        "Gallery of Maps and Tapestries"
      ],
      it: [
        "Cappella Sistina con gli affreschi di Michelangelo",
        "Stanze di Raffaello con capolavori rinascimentali",
        "Antichità classiche: Laocoonte e Apollo del Belvedere",
        "Galleria delle Carte Geografiche e degli Arazzi"
      ]
    }
  },
  {
    id: 21,
    type: 'permanent',
    category: 'classical',
    title: {
      en: "Borghese Gallery",
      it: "Galleria Borghese"
    },
    shortDescription: {
      en: "Historic private collection of Cardinal Scipione Borghese with exceptional Baroque sculptures by Bernini and paintings by Caravaggio.",
      it: "Storica collezione privata del Cardinale Scipione Borghese con eccezionali sculture barocche del Bernini e dipinti di Caravaggio."
    },
    fullDescription: {
      en: "Historic private collection of Cardinal Scipione Borghese, housed in the splendid Villa Borghese. The museum displays an exceptional ensemble of classical and Baroque sculptures (famous marble groups by Bernini: Apollo and Daphne, The Rape of Proserpina, David, and Canova's Paolina Borghese) alongside paintings from the 15th to 19th centuries by absolute masters. Among the masterpieces: Caravaggio (the Gallery possesses the richest collection of Caravaggio canvases in Rome - e.g. Bacchus, Boy with Fruit Basket, David with Goliath's Head), Raphael (Lady with Unicorn, Borghese Deposition), Titian (Sacred and Profane Love), Correggio (Danae), Rubens, Bellini, Antonello da Messina, etc., plus ancient marbles and mosaics from the archaeological collection.",
      it: "Storica collezione privata del Cardinale Scipione Borghese, ospitata nella splendida Villa Borghese. Il museo espone un eccezionale insieme di sculture classiche e barocche (famosi i gruppi marmorei di Bernini: Apollo e Dafne, Il Ratto di Proserpina, David, e la Paolina Borghese di Canova) accanto a dipinti dal XV al XIX secolo di maestri assoluti. Tra i capolavori: Caravaggio (la Galleria possiede la più ricca collezione di tele caravaggesche a Roma – es. Bacco, Fanciullo con canestro di frutta, Davide con testa di Golia), Raffaello (Dama con liocorno, Deposizione Borghese), Tiziano (Amor Sacro e Amor Profano), Correggio (Danae), Rubens, Bellini, Antonello da Messina, ecc., oltre ai marmi antichi e ai mosaici della collezione archeologica."
    },
    venue: {
      name: {
        en: "Borghese Gallery",
        it: "Galleria Borghese"
      },
      address: "Piazzale del Museo Borghese 5, Roma",
      location: { lat: 41.9146, lon: 12.4921 }
    },
    ticketLink: "https://www.tosc.it",
    officialLink: "https://galleriaborghese.beniculturali.it/",
    imageUrl: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=800",
    highlights: {
      en: [
        "Bernini's masterpieces: Apollo and Daphne, David",
        "Richest Caravaggio collection in Rome",
        "Canova's Paolina Borghese sculpture",
        "Titian's Sacred and Profane Love"
      ],
      it: [
        "Capolavori del Bernini: Apollo e Dafne, David",
        "Più ricca collezione di Caravaggio a Roma",
        "Paolina Borghese del Canova",
        "Amor Sacro e Amor Profano di Tiziano"
      ]
    }
  },
  {
    id: 22,
    type: 'permanent',
    category: 'archaeology',
    title: {
      en: "Colosseum Archaeological Park",
      it: "Parco Archeologico del Colosseo"
    },
    shortDescription: {
      en: "Rome's most famous archaeological complex including the Colosseum, Roman Forum and Palatine Hill with imperial palaces.",
      it: "Il complesso archeologico più famoso di Roma che include il Colosseo, il Foro Romano e il Palatino con i palazzi imperiali."
    },
    fullDescription: {
      en: "Rome's most famous archaeological complex: includes the Flavian Amphitheatre (Colosseum) - icon of the city and Roman world, visitable in its underground areas, arena and tiers - and the area of the Roman Forum and Palatine, with the remains of temples, basilicas and triumphal arches that constituted the monumental center of ancient Rome. On the Palatine are the imperial palaces and a breathtaking view of the Forum.",
      it: "Il complesso archeologico più famoso di Roma: include l'Anfiteatro Flavio (Colosseo) – icona della città e del mondo romano, visitabile nei suoi sotterranei, arena e gradinate – e l'area del Foro Romano e Palatino, con i resti dei templi, basiliche e archi trionfali che costituivano il centro monumentale dell'antica Roma. Sul Palatino si trovano i palazzi imperiali e una vista mozzafiato sul Foro."
    },
    venue: {
      name: {
        en: "Colosseum",
        it: "Colosseo"
      },
      address: "Piazza del Colosseo, Roma",
      location: { lat: 41.8902, lon: 12.4922 }
    },
    ticketLink: "https://www.coopculture.it/it/colosseo-e-shop/",
    officialLink: "https://parcocolosseo.it",
    imageUrl: "https://images.pexels.com/photos/161104/pexels-photo-161104.jpeg?auto=compress&cs=tinysrgb&w=800",
    highlights: {
      en: [
        "Colosseum Arena and Underground chambers",
        "Roman Forum archaeological complex",
        "Palatine Hill imperial palaces",
        "Arch of Constantine and Temple of Venus"
      ],
      it: [
        "Arena e Sotterranei del Colosseo",
        "Complesso archeologico del Foro Romano",
        "Palazzi imperiali del Palatino",
        "Arco di Costantino e Tempio di Venere"
      ]
    }
  },
  {
    id: 23,
    type: 'permanent',
    category: 'contemporary',
    title: {
      en: "MAXXI - National Museum of 21st Century Arts",
      it: "MAXXI - Museo Nazionale delle Arti del XXI Secolo"
    },
    shortDescription: {
      en: "Major museum dedicated to contemporary art and architecture, designed by Zaha Hadid, with works from 2000 to today.",
      it: "Grande museo dedicato all'arte contemporanea e all'architettura, progettato da Zaha Hadid, con opere dal 2000 ad oggi."
    },
    fullDescription: {
      en: "Major museum dedicated to contemporary art and architecture, designed by Zaha Hadid. The permanent collections (partly on rotation) and temporary exhibitions present artworks from 2000 to today and modern architecture projects. MAXXI hosts installations, photography, video art and painting by Italian and international artists (e.g. Alighiero Boetti, William Kentridge, Anish Kapoor, Gilbert & George, etc.), and a rich program of cultural events.",
      it: "Grande museo dedicato all'arte contemporanea e all'architettura, progettato da Zaha Hadid. Le collezioni permanenti (in parte a rotazione) e le mostre temporanee presentano opere d'arte dal 2000 ad oggi e progetti di architettura moderna. Il MAXXI ospita installazioni, fotografia, video-arte e pittura di artisti italiani e internazionali (es. Alighiero Boetti, William Kentridge, Anish Kapoor, Gilbert & George, ecc.), e una ricca programmazione di eventi culturali."
    },
    venue: {
      name: {
        en: "MAXXI Museum",
        it: "Museo MAXXI"
      },
      address: "Via Guido Reni 4A, Roma",
      location: { lat: 41.9208, lon: 12.4729 }
    },
    ticketLink: "https://www.maxxi.art/",
    officialLink: "https://www.maxxi.art/",
    imageUrl: "https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg?auto=compress&cs=tinysrgb&w=800",
    highlights: {
      en: [
        "Zaha Hadid's architectural masterpiece",
        "Contemporary art from 2000 onwards",
        "Works by Boetti, Kentridge, Kapoor",
        "Rich cultural events program"
      ],
      it: [
        "Capolavoro architettonico di Zaha Hadid",
        "Arte contemporanea dal 2000 in poi",
        "Opere di Boetti, Kentridge, Kapoor",
        "Ricca programmazione di eventi culturali"
      ]
    }
  }
];

// Database delle proprietà dell'host (aggiornato)
const myPropertiesDB = [
  {
    id: 1,
    name: {
      en: "Vatican Elegant Residence",
      it: "Dimora Vaticana Elegante"
    },
    baseNightlyPrice: 120,
    location: { lat: 41.9080, lon: 12.4519 },
    bookingLinks: {
      airbnb: "https://www.airbnb.it/hosting/listings/editor/1381673546089400028/view-your-space",
      booking: "https://www.booking.com/hotel/it/roma-caput-mundi-guest-house.it.html?label=gen173bo-10CAsocUIccm9tYS1jYXB1dC1tdW5kaS1ndWVzdC1ob3VzZUgzWANocYgBAZgBM7gBF8gBDNgBA-gBAfgBAYgCAZgCBqgCAbgC55TNxAbAAgHSAiRkZGI1MTBkNS1hZTU0LTQwYWEtOGY2MC1mMjZlM2VkZjI2YzDYAgHgAgE&sid=e8b1587fb7ca635399789691b1882b75&dist=0&keep_landing=1&sb_price_type=total&type=total&",
      vrbo: "https://www.booking.com/hotel/it/roma-caput-mundi-guest-house.it.html?label=gen173bo-10CAsocUIccm9tYS1jYXB1dC1tdW5kaS1ndWVzdC1ob3VzZUgzWANocYgBAZgBM7gBF8gBDNgBA-gBAfgBAYgCAZgCBqgCAbgC55TNxAbAAgHSAiRkZGI1MTBkNS1hZTU0LTQwYWEtOGY2MC1mMjZlM2VkZjI2YzDYAgHgAgE&sid=e8b1587fb7ca635399789691b1882b75&dist=0&keep_landing=1&sb_price_type=total&type=total&"
    }
  },
  {
    id: 2,
    name: {
      en: "Colosseum View House",
      it: "Casa Vista Colosseo"
    },
    baseNightlyPrice: 95,
    location: { lat: 41.8925, lon: 12.4900 },
    bookingLinks: {
      airbnb: "https://www.airbnb.it/hosting/listings/editor/1381673546089400028/view-your-space",
      booking: "https://www.booking.com/hotel/it/roma-caput-mundi-guest-house.it.html?label=gen173bo-10CAsocUIccm9tYS1jYXB1dC1tdW5kaS1ndWVzdC1ob3VzZUgzWANocYgBAZgBM7gBF8gBDNgBA-gBAfgBAYgCAZgCBqgCAbgC55TNxAbAAgHSAiRkZGI1MTBkNS1hZTU0LTQwYWEtOGY2MC1mMjZlM2VkZjI2YzDYAgHgAgE&sid=e8b1587fb7ca635399789691b1882b75&dist=0&keep_landing=1&sb_price_type=total&type=total&",
      vrbo: "https://www.booking.com/hotel/it/roma-caput-mundi-guest-house.it.html?label=gen173bo-10CAsocUIccm9tYS1jYXB1dC1tdW5kaS1ndWVzdC1ob3VzZUgzWANocYgBAZgBM7gBF8gBDNgBA-gBAfgBAYgCAZgCBqgCAbgC55TNxAbAAgHSAiRkZGI1MTBkNS1hZTU0LTQwYWEtOGY2MC1mMjZlM2VkZjI2YzDYAgHgAgE&sid=e8b1587fb7ca635399789691b1882b75&dist=0&keep_landing=1&sb_price_type=total&type=total&"
    }
  },
  {
    id: 3,
    name: {
      en: "Borghese Garden Apartment",
      it: "Appartamento Giardini Borghese"
    },
    baseNightlyPrice: 140,
    location: { lat: 41.9120, lon: 12.4890 },
    bookingLinks: {
      airbnb: "https://www.airbnb.it/hosting/listings/editor/1381673546089400028/view-your-space",
      booking: "https://www.booking.com/hotel/it/roma-caput-mundi-guest-house.it.html?label=gen173bo-10CAsocUIccm9tYS1jYXB1dC1tdW5kaS1ndWVzdC1ob3VzZUgzWANocYgBAZgBM7gBF8gBDNgBA-gBAfgBAYgCAZgCBqgCAbgC55TNxAbAAgHSAiRkZGI1MTBkNS1hZTU0LTQwYWEtOGY2MC1mMjZlM2VkZjI2YzDYAgHgAgE&sid=e8b1587fb7ca635399789691b1882b75&dist=0&keep_landing=1&sb_price_type=total&type=total&",
      vrbo: "https://www.booking.com/hotel/it/roma-caput-mundi-guest-house.it.html?label=gen173bo-10CAsocUIccm9tYS1jYXB1dC1tdW5kaS1ndWVzdC1ob3VzZUgzWANocYgBAZgBM7gBF8gBDNgBA-gBAfgBAYgCAZgCBqgCAbgC55TNxAbAAgHSAiRkZGI1MTBkNS1hZTU0LTQwYWEtOGY2MC1mMjZlM2VkZjI2YzDYAgHgAgE&sid=e8b1587fb7ca635399789691b1882b75&dist=0&keep_landing=1&sb_price_type=total&type=total&"
    }
  },
  {
    id: 4,
    name: {
      en: "Historic Center Loft",
      it: "Loft Centro Storico"
    },
    baseNightlyPrice: 110,
    location: { lat: 41.8950, lon: 12.4800 },
    bookingLinks: {
      airbnb: "https://www.airbnb.it/hosting/listings/editor/1381673546089400028/view-your-space",
      booking: "https://www.booking.com/hotel/it/roma-caput-mundi-guest-house.it.html?label=gen173bo-10CAsocUIccm9tYS1jYXB1dC1tdW5kaS1ndWVzdC1ob3VzZUgzWANocYgBAZgBM7gBF8gBDNgBA-gBAfgBAYgCAZgCBqgCAbgC55TNxAbAAgHSAiRkZGI1MTBkNS1hZTU0LTQwYWEtOGY2MC1mMjZlM2VkZjI2YzDYAgHgAgE&sid=e8b1587fb7ca635399789691b1882b75&dist=0&keep_landing=1&sb_price_type=total&type=total&",
      vrbo: "https://www.booking.com/hotel/it/roma-caput-mundi-guest-house.it.html?label=gen173bo-10CAsocUIccm9tYS1jYXB1dC1tdW5kaS1ndWVzdC1ob3VzZUgzWANocYgBAZgBM7gBF8gBDNgBA-gBAfgBAYgCAZgCBqgCAbgC55TNxAbAAgHSAiRkZGI1MTBkNS1hZTU0LTQwYWEtOGY2MC1mMjZlM2VkZjI2YzDYAgHgAgE&sid=e8b1587fb7ca635399789691b1882b75&dist=0&keep_landing=1&sb_price_type=total&type=total&"
    }
  }
];

// Funzione helper per calcolare la distanza
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Endpoint: GET /api/exhibitions - Tutte le mostre e musei
app.get('/api/exhibitions', (req, res) => {
  try {
    console.log('GET /api/exhibitions - Request received');
    const lang = req.query.lang || 'en';
    const type = req.query.type; // 'temporary' o 'permanent' o undefined per tutti
    
    let filteredExhibitions = exhibitionsDB;
    if (type) {
      filteredExhibitions = exhibitionsDB.filter(exp => exp.type === type);
    }
    
    console.log(`Filtered exhibitions count: ${filteredExhibitions.length}`);
    
    // Ensure we have a valid array
    if (!Array.isArray(filteredExhibitions)) {
      console.error('filteredExhibitions is not an array');
      return res.status(500).json({ error: 'Internal server error - invalid data structure' });
    }
    
    const localizedExhibitions = filteredExhibitions.map(exp => ({
      id: exp.id,
      type: exp.type,
      category: exp.category,
      title: exp.title?.[lang] || exp.title?.en || 'Untitled',
      shortDescription: exp.shortDescription?.[lang] || exp.shortDescription?.en || '',
      dates: exp.dates ? (exp.dates?.[lang] || exp.dates?.en) : null,
      venue: {
        name: exp.venue?.name?.[lang] || exp.venue?.name?.en || 'Unknown venue',
        address: exp.venue?.address || '',
        location: exp.venue?.location || { lat: 0, lon: 0 }
      },
      ticketLink: exp.ticketLink || '',
      officialLink: exp.officialLink || '',
      imageUrl: exp.imageUrl || ''
    }));
    
    // Validate the final array before sending
    if (!Array.isArray(localizedExhibitions)) {
      console.error('localizedExhibitions is not an array after mapping');
      return res.status(500).json({ error: 'Internal server error - mapping failed' });
    }
    
    console.log(`Sending ${localizedExhibitions.length} exhibitions`);
    
    // Ensure response headers are set correctly
    res.setHeader('Content-Type', 'application/json');
    res.json(localizedExhibitions);
  } catch (error) {
    console.error('Error in /api/exhibitions:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Endpoint: GET /api/exhibition/:id - Dettagli singola mostra/museo
app.get('/api/exhibition/:id', (req, res) => {
  try {
    const exhibitionId = parseInt(req.params.id);
    const lang = req.query.lang || 'en';
    
    const exhibition = exhibitionsDB.find(exp => exp.id === exhibitionId);
    
    if (!exhibition) {
      return res.status(404).json({ error: 'Exhibition not found' });
    }
    
    // Trova la proprietà più vicina
    let closestProperty = null;
    let minDistance = Infinity;
    
    myPropertiesDB.forEach(property => {
      const distance = calculateDistance(
        exhibition.venue?.location?.lat || 0,
        exhibition.venue?.location?.lon || 0,
        property.location?.lat || 0,
        property.location?.lon || 0
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestProperty = property;
      }
    });
    
    const suggestedNights = exhibition.type === 'permanent' ? 2 : 1;
    const estimatedStayPrice = closestProperty?.baseNightlyPrice ? closestProperty.baseNightlyPrice * suggestedNights : 0;
    
    const localizedExhibition = {
      id: exhibition.id,
      type: exhibition.type,
      category: exhibition.category,
      title: exhibition.title?.[lang] || exhibition.title?.en || 'Untitled',
      shortDescription: exhibition.shortDescription?.[lang] || exhibition.shortDescription?.en || '',
      fullDescription: exhibition.fullDescription?.[lang] || exhibition.fullDescription?.en || '',
      dates: exhibition.dates ? (exhibition.dates?.[lang] || exhibition.dates?.en) : null,
      venue: {
        name: exhibition.venue?.name?.[lang] || exhibition.venue?.name?.en || 'Unknown venue',
        address: exhibition.venue?.address || '',
        location: exhibition.venue?.location || { lat: 0, lon: 0 }
      },
      ticketLink: exhibition.ticketLink || '',
      officialLink: exhibition.officialLink || '',
      imageUrl: exhibition.imageUrl || '',
      highlights: exhibition.highlights?.[lang] || exhibition.highlights?.en || []
    };
    
    const localizedProperty = closestProperty ? {
      ...closestProperty,
      name: closestProperty.name?.[lang] || closestProperty.name?.en || 'Unknown property'
    } : null;
    
    res.json({
      exhibitionDetails: localizedExhibition,
      recommendedProperty: localizedProperty,
      estimatedStayPrice: estimatedStayPrice,
      suggestedNights: suggestedNights,
      distanceToAttraction: minDistance.toFixed(1)
    });
  } catch (error) {
    console.error('Error in /api/exhibition/:id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});