import {Router} from 'aurelia-router';
import {inject, PLATFORM} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "../../services/discord-service";

@inject(EventAggregator, DiscordService, Router)
export class Guild {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    guild;
    params;

    activate(params) {
        this.params = params;
        this.guildId = this.params.guildId;
        this.guild = this.discordService.getDiscordServerInformation(this.guildId);
    }

    attached() {
        this.eventAggregator.publish('guild-updated', this.params.guildId);
    }

    configureRouter(config, router) {
        config.options.pushState = true;
        this.router = router;

        config.map([
            {
                name: 'guild-dashboard',
                route: ['', ':guildId', 'dashboard'],
                moduleId: PLATFORM.moduleName('pages/guild/dashboard/dashboard'),
                title: 'Dashboard',
                settings: {
                    auth: true
                }
            },
            {
                name: 'guild-response-message',
                route: 'response-message',
                moduleId: PLATFORM.moduleName('pages/guild/response-message/response-message'),
                title: 'Response Messages',
                settings: {
                    auth: true
                }
            },
            {
                name: 'guild-response-message-create',
                route: 'response-message/create',
                moduleId: PLATFORM.moduleName('pages/guild/response-message/create-response-message/create-response-message'),
                title: 'Response Messages',
                settings: {
                    auth: true
                }
            },
            {
                name: 'guild-response-message-edit',
                route: 'response-message/:discordApplicationCommandId',
                moduleId: PLATFORM.moduleName('pages/guild/response-message/edit-response-message/edit-response-message'),
                title: 'Response Messages',
                settings: {
                    auth: true
                }
            },
            {
                name: 'guild-manage-message-invite-links',
                route: 'invite-links',
                moduleId: PLATFORM.moduleName('pages/guild/invite-links/invite-links'),
                title: 'Invite Links',
                settings: {
                    auth: true
                }
            },
            {
                name: 'guild-send-message',
                route: 'send-message',
                moduleId: PLATFORM.moduleName('pages/guild/send-message/send-message'),
                title: 'Send Message',
                settings: {
                    auth: true
                }
            },
        ]);

        config.mapUnknownRoutes(() => {
            return {redirect: 'guild-dashboard'};
        });
    }
}
