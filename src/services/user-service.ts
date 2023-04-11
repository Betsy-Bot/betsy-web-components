import { inject } from 'aurelia';
import { ApiService } from './api-service';

@inject(ApiService)
export class UserService {
    constructor(private api: ApiService) {
    }

    async getGuilds() {
        return this.api.doGet('User/Guilds');
    }
}
