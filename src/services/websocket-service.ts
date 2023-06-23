import { apiEndpoint } from "../environment";

import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export class WebhookService {
    subscribeToGuildInvite() {
        return new HubConnectionBuilder()
            .withUrl(`${apiEndpoint()}GuildHub`, {
                accessTokenFactory: () => window.localStorage.jwt_token as string
            })
            .configureLogging(LogLevel.Information)
            .build();
    }
}
