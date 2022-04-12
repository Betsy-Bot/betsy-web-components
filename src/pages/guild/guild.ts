import {Router} from 'aurelia-router';
import {inject, PLATFORM} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "../../services/discord-service";
import {toast} from "lets-toast";

@inject(EventAggregator, DiscordService, Router)
export class Guild {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    guild;
    params;

    async activate(params) {
        this.params = params;
        this.guildId = this.params.guildId;
        [this.guild] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId),
            await this.discordService.getDiscordChannels(this.guildId)
        ]);

        if (!this.guild) {
            this.router.navigateToRoute('home');
        }
    }

    attached() {
        if (this.guild) {
            console.log('published');
            this.eventAggregator.publish('guild-updated', this.params.guildId);
        } else {
            toast("You do not have access to this resource", {severity: 'error'});
        }
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
                moduleId: PLATFORM.moduleName('pages/guild/support-ticket-message/support-ticket-message'),
                title: 'Support Tickets',
                settings: {
                    auth: true
                }
            },
            {
                name: 'create-ticket-message',
                route: 'support-tickets/create',
                moduleId: PLATFORM.moduleName('pages/guild/support-ticket-message/create-ticket-message/create-ticket-message'),
                title: 'Create Support Ticket Message',
                settings: {
                    auth: true
                }
            },
            {
                name: 'edit-ticket-message',
                route: 'support-tickets/:discordMessageId',
                moduleId: PLATFORM.moduleName('pages/guild/support-ticket-message/edit-ticket-message/edit-ticket-message'),
                title: 'Edit Support Ticket Message',
                settings: {
                    auth: true
                }
            },
            {
                name: 'support-ticket-submissions',
                route: 'support-tickets/:discordMessageId/submissions',
                moduleId: PLATFORM.moduleName('pages/guild/support-ticket-message/edit-ticket-message/support-tickets/support-tickets'),
                title: 'Support Tickets',
                settings: {
                    auth: true
                }
            },
            {
                name: 'support-ticket-submission',
                route: 'support-tickets/:discordMessageId/submissions/:ticketId',
                moduleId: PLATFORM.moduleName('pages/guild/support-ticket-message/edit-ticket-message/support-tickets/support-ticket/support-ticket'),
                title: 'Support Ticket Submission',
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
            {
                name: 'twitch',
                route: 'social-connections/twitch',
                moduleId: PLATFORM.moduleName('pages/guild/social-connections/twitch/twitch'),
                title: 'Twitch Connections',
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
