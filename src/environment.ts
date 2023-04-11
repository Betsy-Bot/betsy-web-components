function redirectUrl() {
  return process.env.VITE_REDIRECT_URL;
}

function verifyRedirectUrl() {
  return process.env.VITE_VERIFY_REDIRECT_URL;
}

function botClientId() {
  return process.env.VITE_BOT_CLIENT_ID;
}

function apiEndpoint() {
  return process.env.VITE_API_ENDPOINT;
}

export default this;

export { redirectUrl, botClientId, apiEndpoint, verifyRedirectUrl };
