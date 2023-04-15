import { bindable, inject } from "aurelia";
import { IRouteViewModel, Params, route } from "@aurelia/router-lite";

import { DiscordService } from "../../services/discord-service";

import { Dashboard } from "./dashboard/dashboard";
import { Giveaways } from "./giveaways/giveaways";
import { ManageGiveaways } from "./giveaways/manage-giveaways/manage-giveaways";
import { SendMessage } from "./messages/send-message/send-message";
import { ManagePolls } from "./polls/manage-polls/manage-polls";
import { Polls } from "./polls/polls";
import { SupportTicket } from "./support-ticket-message/manage-ticket-message/support-tickets/support-ticket/support-ticket";
import { SupportTickets } from "./support-ticket-message/manage-ticket-message/support-tickets/support-tickets";
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
import { Forms } from "./resources/forms/forms";
import { KeyValueStorage } from "./resources/key-value-storage/key-value-storage";
import { AuditLogs } from "./resources/audit-logs/audit-logs";
import { Twitch } from "./social-connections/twitch/twitch";
import { CreateMessage } from "./resources/messages/create-message/create-message";
import { EditMessage } from "./resources/messages/edit-message/edit-message";
import { CreateForm } from "./resources/forms/create-form/create-form";
import { EditForm } from "./resources/forms/edit-form/edit-form";
import { ManageTicketMessage } from "./support-ticket-message/manage-ticket-message/manage-ticket-message";
import { ChannelBackups } from "./resources/channel-backups/channel-backups";
import { ChannelBackup } from "./resources/channel-backups/channel-backup/channel-backup";

const routes = [
    Dashboard,
    SupportTicketMessage,
    ManageTicketMessage,
    SupportTickets,
    SupportTicket,
    Giveaways,
    ManageGiveaways,
    Polls,
    ManagePolls,
    ThreadChannels,
    ManageThreadChannel,
    SendMessage,
    AutoResponders,
    ManageAutoResponder,
    TrackedMessages,
    ManageTrackedMessage,
    WelcomeMessages,
    ManageWelcomeMessage,
    ResponseMessage,
    CreateResponseMessage,
    EditResponseMessage,
    DataCommands,
    EditDataCommand,
    Payments,
    ActionLog,
    InviteLinks,
    AutoRole,
    ManageAutoroleContainer,
    ChannelCleaners,
    Verification,
    Settings,
    Users,
    Messages,
    CreateMessage,
    EditMessage,
    Forms,
    CreateForm,
    EditForm,
    KeyValueStorage,
    AuditLogs,
    Twitch,
    ChannelBackups,
    ChannelBackup,
];

@route({
    title: "Guild",
    routes: routes,
})
@inject(DiscordService)
export class Guild implements IRouteViewModel {
    constructor(private discordService: DiscordService) {}

    guildId: string;

    canLoad(params: Params) {
        this.guildId = params.guildId;
        this.discordService.setGuildId(this.guildId);
        return true;
    }

    async binding() {
        await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId),
            await this.discordService.getDiscordChannels(this.guildId),
        ]);
    }
}
