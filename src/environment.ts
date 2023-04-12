function redirectUrl() {
    if (typeof process === 'undefined') {
        return import.meta.env.VITE_REDIRECT_URL;
    }
    return process.env.VITE_REDIRECT_URL;
}

function verifyRedirectUrl() {
    if (typeof process === 'undefined') {
        return import.meta.env.VITE_VERIFY_REDIRECT_URL;
    }
    return process.env.VITE_VERIFY_REDIRECT_URL;
}

function botClientId() {
    if (typeof process === 'undefined') {
        return import.meta.env.VITE_BOT_CLIENT_ID;
    }
    return process.env.VITE_BOT_CLIENT_ID;
}

function apiEndpoint() {
    if (typeof process === 'undefined') {
        return import.meta.env.VITE_API_ENDPOINT;
    }
    return process.env.VITE_API_ENDPOINT;
}

export default this;

export { redirectUrl, botClientId, apiEndpoint, verifyRedirectUrl };
