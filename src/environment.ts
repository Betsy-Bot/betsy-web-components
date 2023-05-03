function redirectUrl() {
    return import.meta.env.VITE_REDIRECT_URL;
}

function verifyRedirectUrl() {
    return import.meta.env.VITE_VERIFY_REDIRECT_URL;
}

function botClientId() {
    return import.meta.env.VITE_BOT_CLIENT_ID;
}

function apiEndpoint() {
    return import.meta.env.VITE_API_ENDPOINT;
}

export default this;

export { redirectUrl, botClientId, apiEndpoint, verifyRedirectUrl };
