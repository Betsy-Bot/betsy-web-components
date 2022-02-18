import { inject } from 'aurelia';
import { ApiService } from './api-service';

import * as discordModels from "./models/discord";

@inject(ApiService)
export class DiscordService {
    constructor(private api: ApiService) {
    }

    async exchangeCode(code: string): Promise<discordModels.ExchangeCodeResponse> {
        return this.api.doPost('Discord/OAuth/ExchangeCode', {code: code})
    }
}
