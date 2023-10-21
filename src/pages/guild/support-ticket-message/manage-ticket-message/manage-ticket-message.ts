import { IEventAggregator, inject } from 'aurelia';
import {
    IRouteContext,
    IRouter,
    IRouteViewModel,
    Params,
    route,
} from '@aurelia/router-lite';
import { watch } from '@aurelia/runtime-html';

import { DiscordService } from '../../../../services/discord-service';
import {
    DiscordButtonStyle,
    DiscordComponentType,
} from '../../../../services/models/discord';

import { toast } from 'lets-toast';

@route({
    path: 'support-tickets/:supportTicketSettingsId',
    title: 'Manage Ticket',
})
@inject(IEventAggregator, DiscordService, IRouter, IRouteContext)
export class ManageTicketMessage implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: IRouter,
        private context: IRouteContext
    ) {}

    guildId: string;
    supportTicketSettingsId: string;
    confirmDeleteDialog;
    featureActive;
    didLoad = false;

    ticket;

    tab = 'settings';
    isNew = false;
    isLoading = true;

    authorizedRole;

    ticketTemplate = {
        identifier: 'identifier',
        id: undefined,
        logChannelId: '',
        assignedRoles: [],
        initialMessage: {
            embeds: [
                {
                    title: 'Your support channel has been created for you.',
                    description: 'We will be with you shortly!',
                    color: 5726933,
                },
            ],
            components: [
                {
                    type: DiscordComponentType.ActionRow,
                    components: [
                        {
                            type: DiscordComponentType.Button,
                            label: 'Close Ticket',
                            style: DiscordButtonStyle.Danger,
                            custom_id: 'CloseTicket',
                        },
                    ],
                },
            ],
        },
        closeButtonText: 'Close',
        discordMessage: {
            discordChannelId: '',
            discordCategoryId: '',
            type: 1,
            message: {
                embeds: [
                    {
                        title: 'Create a Ticket Using the Button Below!',
                        description: 'We will respond ASAP!',
                        color: 5726933,
                    },
                ],
                components: [
                    {
                        type: DiscordComponentType.ActionRow,
                        components: [
                            {
                                type: DiscordComponentType.Button,
                                label: 'Create Ticket',
                                style: DiscordButtonStyle.Primary,
                            },
                        ],
                    },
                ],
            },
        },
    };

    loading(params: Params) {
        this.supportTicketSettingsId = params.supportTicketSettingsId;
    }

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        if (
            !this.supportTicketSettingsId ||
            this.supportTicketSettingsId == '0'
        ) {
            this.isNew = true;
            this.ticket = this.ticketTemplate;
            this.ticket.discordMessage.message.components[0].components[0].custom_id = `ButtonCreateTicket:${this.ticket.identifier}`;
        } else {
            [this.ticket] = await Promise.all([
                await this.discordService.getSupportTicketSettingsById(
                    this.supportTicketSettingsId
                ),
            ]);
        }
        this.isLoading = false;

        //Temp solution because it wasn't clearing it for some reason
        this.eventAggregator.subscribe('form-cleared', (payload) => {
            this.ticket.discordFormId = null;
            this.ticket.discordForm = null;
        });
    }

    @watch('authorizedRole')
    authorizedRoleChanged() {
        if (!this.ticket.assignedRoles) {
            this.ticket.assignedRoles = [];
        }
        this.ticket.assignedRoles.push(this.authorizedRole);
    }

    async submit() {
        if (this.isNew) {
            await this.setupSupportTicket();
        } else {
            await this.editSupportTicketSettings();
        }
    }

    async editSupportTicketSettings() {
        try {
            this.isLoading = true;
            this.ticket.discordGuildId = this.guildId;
            await this.discordService.updateSupportTicketSettings(this.ticket);
            toast('Updated Support Ticket', { severity: 'success' });
        } catch (e) {
            toast('Failed to update support ticket creation message', {
                severity: 'error',
            });
            throw e;
        } finally {
            this.isLoading = false;
        }
    }

    async deleteSupportTicket(event) {
        if (event.detail.action == 'ok') {
            try {
                await this.discordService.deleteSupportTicketBySettingsId(
                    this.ticket.id
                );
                toast('Deleted support message!', { severity: 'success' });
                await this.router.load('../support-tickets', { context: this });
            } catch (e) {
                toast('Failed to delete support ticket creation message', {
                    severity: 'error',
                });
                throw e;
            }
        }
    }

    @watch('ticket.identifier')
    updateCorrespondingComponents() {
        if (this.ticket?.discordMessage?.message?.components) {
            for (const componentWrapper of this.ticket.discordMessage.message.components) {
                for (const component of componentWrapper.components) {
                    if (component.custom_id) {
                        const split = component.custom_id.split(':');
                        if (split[0] == 'ButtonCreateTicket')  {
                            component.custom_id = `ButtonCreateTicket:${this.ticket.identifier}`;
                        }
                    }
                }
            }
        }
    }

    handleClone() {
        this.isNew = true;
        this.ticket.identifer = 'Clone';
        this.ticket.id = null;
        toast('Cloned Ticket');
    }

    async setupSupportTicket() {
        if (this.didLoad) {
            return;
        }
        try {
            this.didLoad = true;
            await this.discordService.setupSupportTicketMessage(
                this.guildId,
                this.ticket
            );
            toast('Created support message!', { severity: 'success' });
            await this.router.load('../support-tickets', { context: this });
        } catch (e) {
            toast('Failed to setup support ticket creation message', {
                severity: 'error',
            });
            throw e;
        } finally {
            this.didLoad = false;
        }
    }
}
