import env from '../config/environment.json';

function redirectUrl() {
    return env.redirectUrl;
}

function botClientId() {
    return env.botClientId;
}

function apiEndpoint() {
    return env.apiEndpoint;
}

export default this;

export {
    redirectUrl,
    botClientId,
    apiEndpoint
};
