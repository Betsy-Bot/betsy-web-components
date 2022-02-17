import { inject } from 'aurelia';
import { ApiService } from './api-service';

@inject(ApiService)
export class DiscordService {
    constructor(private api: ApiService) {
    }

    async getToken(code: string): Promise<string> {
        return await this.api.doGet('Discord/getToken', {code: code})
    }
}
