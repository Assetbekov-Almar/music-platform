export const CLIENT_ID = '8757a4840e454ead9e0825c449dd79c5'
export const CLIENT_SECRET = '60542b2c07e647e5995445c6239f78ab'
export const REDIRECT_URI = 'http://localhost:3000'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
export const TOKENS_ENDPOINT = 'https://accounts.spotify.com/api/token'
const RESPONSE_TYPE = 'code'
export const AUTH = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-library-read`
