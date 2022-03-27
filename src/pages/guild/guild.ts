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
            {
                name: 'guild-forms',
                route: 'resources/forms',
                moduleId: PLATFORM.moduleName('pages/guild/resources/forms/forms'),
                title: 'Manage Server Forms',
                settings: {
                    auth: true
                }
            },
            {
                name: 'guild-forms-create',
                route: 'resources/forms/create',
                moduleId: PLATFORM.moduleName('pages/guild/resources/forms/create-form/create-form'),
                title: 'Create Server Form',
                settings: {
                    auth: true
                }
            },
            {
                name: 'guild-forms-edit',
                route: 'resources/forms/:formId',
                moduleId: PLATFORM.moduleName('pages/guild/resources/forms/edit-form/edit-form'),
                title: 'Edit Server Form',
                settings: {
                    auth: true
                }
            },
            {
                name: 'guild-data-commands',
                route: 'data-commands',
                moduleId: PLATFORM.moduleName('pages/guild/data-commands/data-commands'),
                title: 'Manage Data Commands',
                settings: {
                    auth: true
                }
            },
            {
                name: 'guild-data-commands',
                route: 'data-commands/create',
                moduleId: PLATFORM.moduleName('pages/guild/data-commands/create-data-command/create-data-command'),
                title: 'Create Data Command',
                settings: {
                    auth: true
                }
            },
            {
                name: 'guild-data-commands',
                route: 'data-commands/:discordApplicationCommandId',
                moduleId: PLATFORM.moduleName('pages/guild/data-commands/edit-data-command/edit-data-command'),
                title: 'Edit Data Command',
                settings: {
                    auth: true
                }
            },
            {
                name: 'guild-support-tickets',
                route: 'support-tickets',
                moduleId: PLATFORM.moduleName('pages/guild/support-tickets/support-tickets'),
                title: 'Support Tickets',
                settings: {
                    auth: true
                }
            },
            {
                name: 'message-tracking',
                route: 'message-tracking',
                moduleId: PLATFORM.moduleName('pages/guild/message-tracking/message-tracking'),
                title: 'Message Tracking',
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
