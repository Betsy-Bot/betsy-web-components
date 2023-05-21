import { apiEndpoint } from "../environment";

import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export class WebhookService {
    subscribeToGuildInvite(): any {
        return new HubConnectionBuilder()
            .withUrl(`${apiEndpoint()}GuildHub`, {
                accessTokenFactory: () => window.localStorage.jwt_token
            })
            .configureLogging(LogLevel.Information)
            .build();
    }
}
