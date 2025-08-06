// API Configuration
const config = {
  apiUrl: import.meta.env.PROD 
    ? 'https://artis-romae.onrender.com'  // URL corretto di Render
    : 'http://localhost:5011'
};

export default config;