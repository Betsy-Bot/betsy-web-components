import {Router} from 'aurelia-router';
import {inject, PLATFORM} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {toast} from "lets-toast";
import {SessionService} from "services/session-service";

@inject(EventAggregator, DiscordService, Router, SessionService)
export class Guild {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router, private sessionService: SessionService) {
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
            this.eventAggregator.publish('guild-updated', this.params.guildId);
            this.eventAggregator.publish('drawer-updated', this.sessionService.getStorageItem(SessionService.SIDEBAR_STATUS_KEY));
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
                route: 'response-message/:id',
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
                route: 'messages/send-message',
                moduleId: PLATFORM.moduleName('pages/guild/messages/send-message/send-message'),
                title: 'Send Message',
                settings: {
                    auth: true
                }
            },
            {
                name: 'guild-tracked-messages',
                route: 'messages/tracked-messages',
                moduleId: PLATFORM.moduleName('pages/guild/messages/tracked-message/tracked-message'),
                title: 'Tracked Messages',
                settings: {
                    auth: true
                }
            },
            {
                name: 'managed-tracked-message',
                route: 'messages/tracked-messages/:messageId',
                moduleId: PLATFORM.moduleName('pages/guild/messages/tracked-message/manage-tracked-message/manage-tracked-message'),
                title: 'Manage Tracked Message',
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
                name: 'guild-messages',
                route: 'resources/messages',
                moduleId: PLATFORM.moduleName('pages/guild/resources/messages/messages'),
                title: 'Manage Server Messages',
                settings: {
                    auth: true
                }
            },
            {
                name: 'guild-create-messages',
                route: 'resources/messages/edit/:messageId',
                moduleId: PLATFORM.moduleName('pages/guild/resources/messages/edit-message/edit-message'),
                title: 'Edit Server Message',
                settings: {
                    auth: true
                }
            },
            {
                name: 'guild-messages-create',
                route: 'resources/messages/create',
                moduleId: PLATFORM.moduleName('pages/guild/resources/messages/create-message/create-message'),
                title: 'Create Server Message',
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
                route: 'support-tickets/:supportTicketSettingsId',
                moduleId: PLATFORM.moduleName('pages/guild/support-ticket-message/edit-ticket-message/edit-ticket-message'),
                title: 'Edit Support Ticket Message',
                settings: {
                    auth: true
                }
            },
            {
                name: 'support-ticket-submissions',
                route: 'support-tickets/:settingsId/submissions',
                moduleId: PLATFORM.moduleName('pages/guild/support-ticket-message/edit-ticket-message/support-tickets/support-tickets'),
                title: 'Support Tickets',
                settings: {
                    auth: true
                }
            },
            {
                name: 'support-ticket-submission',
                route: 'support-tickets/:settingsId/submissions/:ticketId',
                moduleId: PLATFORM.moduleName('pages/guild/support-ticket-message/edit-ticket-message/support-tickets/support-ticket/support-ticket'),
                title: 'Support Ticket Submission',
                settings: {
                    auth: true
                }
            },
            {
                name: 'action-log',
                route: 'action-log',
                moduleId: PLATFORM.moduleName('pages/guild/action-log/action-log'),
                title: 'Action Log',
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
            {
                name: 'auto-role',
                route: 'auto-role',
                moduleId: PLATFORM.moduleName('pages/guild/auto-role/auto-role'),
                title: 'Auto Role Containers',
                settings: {
                    auth: true
                }
            },
            {
                name: 'auto-role-manage',
                route: 'auto-role/:containerId',
                moduleId: PLATFORM.moduleName('pages/guild/auto-role/manage-autorole-container/manage-autorole-container'),
                title: 'Auto Role Container',
                settings: {
                    auth: true
                }
            },
            {
                name: 'settings',
                route: 'settings',
                moduleId: PLATFORM.moduleName('pages/guild/settings/settings'),
                title: 'Guild Settings',
                settings: {
                    auth: true
                }
            },
            {
                name: 'channel-cleaners',
                route: 'channel-cleaners',
                moduleId: PLATFORM.moduleName('pages/guild/channel-cleaners/channel-cleaners'),
                title: 'Channel Cleaners',
                settings: {
                    auth: true
                }
            },
            {
                name: 'payments',
                route: 'payments',
                moduleId: PLATFORM.moduleName('pages/guild/payments/payments'),
                title: 'Payments',
                settings: {
                    auth: true
                }
            },
            {
                name: 'welcome-messages',
                route: 'messages/welcome-messages',
                moduleId: PLATFORM.moduleName('pages/guild/messages/welcome-messages/welcome-messages'),
                title: 'Welcome Messages',
                settings: {
                    auth: true
                }
            },
            {
                name: 'manage-welcome-messages',
                route: 'messages/welcome-messages/:messageId',
                moduleId: PLATFORM.moduleName('pages/guild/messages/welcome-messages/manage-welcome-message/manage-welcome-message'),
                title: 'Manage Welcome Messages',
                settings: {
                    auth: true
                }
            },
            {
                name: 'auto-responders',
                route: 'messages/auto-responders',
                moduleId: PLATFORM.moduleName('pages/guild/messages/auto-responders/auto-responders'),
                title: 'Auto Responders',
                settings: {
                    auth: true
                }
            },
            {
                name: 'manage-auto-responders',
                route: 'messages/auto-responders/:responderId',
                moduleId: PLATFORM.moduleName('pages/guild/messages/auto-responders/manage-auto-responder/manage-auto-responder'),
                title: 'Manage Auto Responder',
                settings: {
                    auth: true
                }
            },
            {
                name: 'giveaways',
                route: 'giveaways',
                moduleId: PLATFORM.moduleName('pages/guild/giveaways/giveaways'),
                title: 'Giveaways',
                settings: {
                    auth: true
                }
            },
            {
                name: 'manage-giveaway',
                route: 'giveaways/:giveawayId',
                moduleId: PLATFORM.moduleName('pages/guild/giveaways/manage-giveaways/manage-giveaways'),
                title: 'Manage Giveaways',
                settings: {
                    auth: true
                }
            },
            {
                name: 'verification',
                route: 'verification',
                moduleId: PLATFORM.moduleName('pages/guild/verification/verification'),
                title: 'Verification',
                settings: {
                    auth: true
                }
            },
            {
                name: 'guild-users',
                route: 'resources/users',
                moduleId: PLATFORM.moduleName('pages/guild/resources/users/users'),
                title: 'Guild Users',
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
