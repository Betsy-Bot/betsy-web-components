import { inject } from 'aurelia';
import { ApiService } from './api-service';

import * as discordModels from "./models/discord";
import {BaseDiscordCommand} from "./models/discord";

@inject(ApiService)
export class DiscordService {
    constructor(private api: ApiService) {
    }

    async exchangeCode(code: string): Promise<discordModels.ExchangeCodeResponse> {
        return this.api.doPost('Discord/OAuth/ExchangeCode', {code: code})
    }

    async createServer(guildId: string): Promise<discordModels.BaseDiscordServer> {
        return this.api.doPost('Discord/Guilds', {guildId: guildId})
    }

    async createResponseMessageCommand(command: BaseDiscordCommand): Promise<discordModels.BaseDiscordCommand> {
        return this.api.doPost('Discord/ApplicationCommand', command);
    }

    async updateResponseMessageCommand(command: BaseDiscordCommand): Promise<discordModels.BaseDiscordCommand> {
        return this.api.doPatch('Discord/ApplicationCommand', command);
    }

    async getResponseMessagesForGuild(guildId: string): Promise<discordModels.BaseDiscordCommand[]> {
        return this.api.doGet(`Discord/Guilds/${guildId}/ResponseMessages`);
    }

    async toggleDiscordCommandActive(guildId: string, discordApplicationCommandId, active: boolean) {
        return this.api.doPatch(`Discord/Guilds/${guildId}/DiscordCommand/${discordApplicationCommandId}/ToggleActive`, { active: active });
    }

    async getDiscordCommandDetails(discordApplicationCommandId: string): Promise<discordModels.BaseDiscordCommand> {
        return this.api.doGet(`Discord/ApplicationCommand?discordApplicationCommandId=${discordApplicationCommandId}`);
    }
}
