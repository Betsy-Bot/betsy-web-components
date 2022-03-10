import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import {apiEndpoint} from "../environment";

export class WebhookService {
    subscribeToGuildInvite(): any {
        return new HubConnectionBuilder()
            .withUrl(`${apiEndpoint()}GuildHub`, {
                accessTokenFactory: () => window.localStorage['jwt_token']
            })
            .configureLogging(LogLevel.Information)
            .build();
    }
}
