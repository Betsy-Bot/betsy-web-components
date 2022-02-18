import { inject } from 'aurelia';
import { ApiService } from './api-service';

@inject(ApiService)
export class DiscordService {
    constructor(private api: ApiService) {
    }

    async exchangeCode(code: string): Promise<ExchangeCodeResponse> {
        return this.api.doPost('Discord/OAuth/ExchangeCode', {code: code})
    }
}

interface ExchangeCodeResponse {
    token: string,
    id: string
}
