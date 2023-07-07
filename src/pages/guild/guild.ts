import { inject } from "aurelia";
import { IRouteViewModel, Params, route } from "@aurelia/router-lite";

import { DiscordService } from "../../services/discord-service";

import { ActionLog } from "./action-log/action-log";
import { AutoRole } from "./auto-role/auto-role";
import { ManageAutoroleContainer } from "./auto-role/manage-autorole-container/manage-autorole-container";
import { ChannelCleaners } from "./channel-cleaners/channel-cleaners";
import { CustomCommands } from "./custom-commands/custom-commands";
import { ManageCustomCommand } from "./custom-commands/manage-custom-command/manage-custom-command";
import { Dashboard } from "./dashboard/dashboard";
import { DeleteInviteLinks } from "./delete-invite-links/delete-invite-links";
import { Giveaways } from "./giveaways/giveaways";
import { ManageGiveaways } from "./giveaways/manage-giveaways/manage-giveaways";
import { ImportExport } from "./import-export/import-export";
import { AutoResponders } from "./messages/auto-responders/auto-responders";
import { ManageAutoResponder } from "./messages/auto-responders/manage-auto-responder/manage-auto-responder";
import { SendMessage } from "./messages/send-message/send-message";
import { ManageTrackedMessage } from "./messages/tracked-message/manage-tracked-message/manage-tracked-message";
import { TrackedMessages } from "./messages/tracked-message/tracked-messages";
import { ManageWelcomeMessage } from "./messages/welcome-messages/manage-welcome-message/manage-welcome-message";
import { WelcomeMessages } from "./messages/welcome-messages/welcome-messages";
import { Payments } from "./payments/payments";
import { ManagePolls } from "./polls/manage-polls/manage-polls";
import { Polls } from "./polls/polls";
import { AuditLogs } from "./resources/audit-logs/audit-logs";
import { ChannelBackup } from "./resources/channel-backups/channel-backup/channel-backup";
import { ChannelBackups } from "./resources/channel-backups/channel-backups";
import { Forms } from "./resources/forms/forms";
import { ManageForm } from "./resources/forms/manage-form/manage-form";
import { Invites } from "./resources/invites/invites";
import { KeyValueStorage } from "./resources/key-value-storage/key-value-storage";
import { ManageKeyValueStorage } from "./resources/key-value-storage/manage-key-value-storage/manage-key-value-storage";
import { CreateMessage } from "./resources/messages/create-message/create-message";
import { EditMessage } from "./resources/messages/edit-message/edit-message";
import { Messages } from "./resources/messages/messages";
import { Users } from "./resources/users/users";
import { Reviews } from "./reviews/reviews";
import { Settings } from "./settings/settings";
import { Twitch } from "./social-connections/twitch/twitch";
import { ManageTicketMessage } from "./support-ticket-message/manage-ticket-message/manage-ticket-message";
import { SupportTicket } from "./support-ticket-message/manage-ticket-message/support-tickets/support-ticket/support-ticket";
import { SupportTickets } from "./support-ticket-message/manage-ticket-message/support-tickets/support-tickets";
import { SupportTicketMessage } from "./support-ticket-message/support-ticket-message";
import { ManageThreadChannel } from "./thread-channels/manage-thread-channel/manage-thread-channel";
import { ThreadChannels } from "./thread-channels/thread-channels";
import { Verification } from "./verification/verification";

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
    Payments,
    ActionLog,
    DeleteInviteLinks,
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
    ManageForm,
    KeyValueStorage,
    ManageKeyValueStorage,
    AuditLogs,
    Twitch,
    ChannelBackups,
    ChannelBackup,
    ImportExport,
    Reviews,
    CustomCommands,
    ManageCustomCommand,
    Invites
];

@route({
    title: "Guild",
    routes: routes,
    path: "guild/:guildId",
})
@inject(DiscordService)
export class Guild implements IRouteViewModel {
    constructor(private discordService: DiscordService) {}

    guildId: string;

    canLoad(params: Params) {
        this.guildId = params.guildId!;
        this.discordService.setGuildId(this.guildId);
        return true;
    }

    async binding() {
        await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId),
            await this.discordService.getDiscordChannels(),
        ]);
    }
}
