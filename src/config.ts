// API Configuration
const config = {
  apiUrl: import.meta.env.PROD 
    ? 'https://artis-romae-api.onrender.com'  // Renderà questo URL dopo il deploy
    : 'http://localhost:5011'
};

export default config;