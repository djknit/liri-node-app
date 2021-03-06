// console.log('keys.js is loaded');

// Grab the values (api keys) from the process.env variable and export them so that they can be used in liri.js
//  (These values are grabbed from the '.env' file using the 'dotenv' Node module.)
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
exports.bandsInTown = {
  id: process.env.BANDSINTOWN_APP_ID
}
exports.omdb = {
  apiKey: process.env.OMDB_API_KEY
}