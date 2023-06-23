function redirectUrl(): string {
    return import.meta.env.VITE_REDIRECT_URL as string;
}

function verifyRedirectUrl(): string {
    return import.meta.env.VITE_VERIFY_REDIRECT_URL as string;
}

function botClientId(): string {
    return import.meta.env.VITE_BOT_CLIENT_ID as string;
}

function apiEndpoint(): string {
    return import.meta.env.VITE_API_ENDPOINT as string;
}

export default this;

export { redirectUrl, botClientId, apiEndpoint, verifyRedirectUrl };
