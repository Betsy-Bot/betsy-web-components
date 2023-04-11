import { bindable, inject } from "aurelia";
import { IRouteViewModel, Params, route } from "@aurelia/router-lite";

import { DiscordService } from "../../services/discord-service";

import { Dashboard } from "./dashboard/dashboard";
import { Giveaways } from "./giveaways/giveaways";
import { ManageGiveaways } from "./giveaways/manage-giveaways/manage-giveaways";
import { SendMessage } from "./messages/send-message/send-message";
import { ManagePolls } from "./polls/manage-polls/manage-polls";
import { Polls } from "./polls/polls";
import { CreateTicketMessage } from "./support-ticket-message/create-ticket-message/create-ticket-message";
import { EditTicketMessage } from "./support-ticket-message/edit-ticket-message/edit-ticket-message";
import { SupportTicket } from "./support-ticket-message/edit-ticket-message/support-tickets/support-ticket/support-ticket";
import { SupportTickets } from "./support-ticket-message/edit-ticket-message/support-tickets/support-tickets";
import { SupportTicketMessage } from "./support-ticket-message/support-ticket-message";
import { ManageThreadChannel } from "./thread-channels/manage-thread-channel/manage-thread-channel";
import { ThreadChannels } from "./thread-channels/thread-channels";
import { TrackedMessages } from "./messages/tracked-message/tracked-messages";
import { AutoResponders } from "./messages/auto-responders/auto-responders";
import { ManageAutoResponder } from "./messages/auto-responders/manage-auto-responder/manage-auto-responder";
import { ManageTrackedMessage } from "./messages/tracked-message/manage-tracked-message/manage-tracked-message";
import { WelcomeMessages } from "./messages/welcome-messages/welcome-messages";
import { ManageWelcomeMessage } from "./messages/welcome-messages/manage-welcome-message/manage-welcome-message";
import { ResponseMessage } from "./response-message/response-message";
import { EditResponseMessage } from "./response-message/edit-response-message/edit-response-message";
import { CreateResponseMessage } from "./response-message/create-response-message/create-response-message";
import { DataCommands } from "./data-commands/data-commands";
import { EditDataCommand } from "./data-commands/edit-data-command/edit-data-command";
import { Payments } from "./payments/payments";
import { ActionLog } from "./action-log/action-log";
import { InviteLinks } from "./invite-links/invite-links";
import { AutoRole } from "./auto-role/auto-role";
import { ManageAutoroleContainer } from "./auto-role/manage-autorole-container/manage-autorole-container";
import { ChannelCleaners } from "./channel-cleaners/channel-cleaners";
import { Verification } from "./verification/verification";
import { Settings } from "./settings/settings";
import { Users } from "./resources/users/users";
import { Messages } from "./resources/messages/messages";
import { GuildForms } from "./resources/forms/forms";
import { KeyValueStorage } from "./resources/key-value-storage/key-value-storage";
import { AuditLogs } from "./resources/audit-logs/audit-logs";
import { Twitch } from "./social-connections/twitch/twitch";
import { CreateMessage } from "./resources/messages/create-message/create-message";
import { EditMessage } from "./resources/messages/edit-message/edit-message";

const routes = [
    Dashboard,
    SupportTicketMessage,
    {
        component: CreateTicketMessage,
        path: "support-tickets/0",
        title: "Create",
    },
    {
        component: EditTicketMessage,
        path: "support-tickets/:supportTicketSettingsId",
        title: "Edit Ticket",
    },
    {
        component: SupportTickets,
        path: "support-tickets/:supportTicketSettingsId/submissions",
        title: "Support Tickets",
    },
    {
        component: SupportTicket,
        path: "support-tickets/:supportTicketSettingsId/submissions/:ticketId",
        title: "View Support Ticket",
    },
    Giveaways,
    {
        component: ManageGiveaways,
        path: "giveaways/:giveawayId",
        title: "Manage Giveaway",
    },
    Polls,
    {
        component: ManagePolls,
        path: "polls/:pollId",
        title: "Manage Poll",
    },
    ThreadChannels,
    {
        component: ManageThreadChannel,
        path: "thread-channels/:threadChannelId",
        title: "Manage Thread Channel",
    },
    SendMessage,
    AutoResponders,
    {
        component: ManageAutoResponder,
        path: "auto-responders/:responderId",
        title: "Manage Auto Responder",
    },
    {
        component: TrackedMessages,
        path: "tracked-messages",
        title: "Tracked Messages",
    },
    {
        component: ManageTrackedMessage,
        path: "tracked-messages/:messageId",
        title: "Manage Tracked Message",
    },
    {
        component: WelcomeMessages,
        path: "welcome-messages",
        title: "Welcome Messages",
    },
    {
        component: ManageWelcomeMessage,
        path: "welcome-messages/:messageId",
        title: "Manage Welcome Message",
    },
    {
        component: ResponseMessage,
        path: "response-messages",
        title: "Response Messages",
    },
    {
        component: CreateResponseMessage,
        path: "response-messages/0",
        title: "Create Response Messages",
    },
    {
        component: EditResponseMessage,
        path: "response-messages/:messageId",
        title: "Response Message",
    },
    {
        component: DataCommands,
        path: "data-commands",
        title: "Data Commands",
    },
    {
        component: EditDataCommand,
        path: "data-commands/:commandId",
        title: "Manage Data Command",
    },
    {
        component: Payments,
        path: "payments",
        title: "Payments",
    },
    {
        component: ActionLog,
        path: "action-log",
        title: "Action Log",
    },
    {
        component: InviteLinks,
        path: "invite-links",
        title: "Delete Invite Links",
    },
    {
        component: AutoRole,
        path: "role-selector",
        title: "Role Selector",
    },
    {
        component: ManageAutoroleContainer,
        path: "role-selector/:containerId",
        title: "Manage Role Selector",
    },
    {
        component: ChannelCleaners,
        path: "channel-cleaners",
        title: "Channel Cleaners",
    },
    {
        component: Verification,
        path: "verification",
        title: "Verification Settings",
    },
    {
        component: Settings,
        path: "settings",
        title: "Settings",
    },
    {
        component: Users,
        path: "users",
        title: "Users",
    },
    {
        component: Messages,
        path: "messages",
        title: "Messages",
    },
    {
        component: CreateMessage,
        path: "messages/create",
        title: "Create Message",
    },
    {
        component: EditMessage,
        path: "messages/:messageId",
        title: "Manage Message",
    },
    // {
    //     component: GuildForms,
    //     path: "forms",
    //     title: "forms",
    // },
    {
        component: KeyValueStorage,
        path: "key-value-storage",
        title: "Key Value Storage",
    },
    {
        component: AuditLogs,
        path: "audit-logs",
        title: "Audit Logs",
    },
    {
        component: Twitch,
        path: "twitch",
        title: "Twitch",
    },
];

@route({
    title: "Guild",
    routes: routes,
})
@inject(DiscordService)
export class Guild implements IRouteViewModel {
    constructor(private discordService: DiscordService) {}

    guildId: string;
    @bindable testValue = "tickets";

    canLoad(params: Params) {
        this.guildId = params.guildId;
        this.discordService.setGuildId(this.guildId);
        return true;
    }

    async binding() {
        await Promise.all([await this.discordService.getDiscordServerInformation(this.guildId), await this.discordService.getDiscordChannels(this.guildId)]);
    }
}
