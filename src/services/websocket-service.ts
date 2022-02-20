import { inject } from 'aurelia';
import { ApiService } from './api-service';
import { SessionService } from "./session-service";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import * as discordModels from "./models/discord";

@inject(ApiService, SessionService)
export class WebhookService {
    constructor(private api: ApiService, private sessionService: SessionService) {
    }

    subscribeToGuildInvite(): any {
        return new HubConnectionBuilder()
            .withUrl(`${process.env.API_ENDPOINT}GuildHub`, {
                accessTokenFactory: () => window.localStorage['jwt_token']
            })
            .configureLogging(LogLevel.Information)
            .build();
    }
}
