import { inject } from "aurelia";
import { DiscordService } from "../../../services/discord-service";
import { toast } from "lets-toast";
import { IRouteViewModel } from "@aurelia/router-lite";

@inject(DiscordService)
export class ChannelCleaners implements IRouteViewModel {
    constructor(private discordService: DiscordService) {}

    cleaners;

    freshRequest = {
        channelId: "",
        ageInHours: "",
        discordServerId: "",
        active: true,
    };
    request = this.freshRequest;
    channels;

    async attached() {
        this.cleaners = await this.discordService.getChannelCleaners(
            this.discordService.getLocalDiscordGuildId()
        );
    }

    async addChannelCleaner() {
        try {
            this.request.discordServerId =
                await this.discordService.getLocalServerId();
            const response = await this.discordService.createChannelCleaner(
                this.request
            );
            this.cleaners.push(response);
            this.request = this.freshRequest;
            toast("Created channel cleaner", { severity: "success" });
        } catch (e) {
            toast("Failed to create channel cleaner", { severity: "error" });
        }
    }

    async deleteChannelCleaner(id) {
        try {
            await this.discordService.deleteChannelCleaner(id);
            const index = this.cleaners.findIndex((x) => x.id == id);
            this.cleaners.splice(index, 1);
            this.request = null;
            toast("Deleted channel cleaner", { severity: "success" });
        } catch (e) {
            toast("Failed to delete channel cleaner", { severity: "error" });
        }
    }

    async manuallyClean(cleanerId) {
        if (
            window.confirm(
                "This will run the channel cleaner. If improperly configured you may lose data. Confirm you want to test your cleaner?"
            )
        ) {
            try {
                const response =
                    await this.discordService.testCleanChannelCleaner(
                        cleanerId
                    );
                toast(`Channel Cleaned. Deleted ${response} Messages`, {
                    severity: "success",
                });
            } catch (e) {
                toast("Failed to clean channel", { severity: "error" });
            }
        } else {
            console.log("cancel");
        }
    }

    async updateCleaner(cleaner) {
        try {
            await this.discordService.updateChannelCleaner(cleaner);
            this.request = this.freshRequest;
            toast("Updated channel cleaner", { severity: "success" });
        } catch (e) {
            toast("Failed to update channel cleaner", { severity: "error" });
        }
    }

    getChannelName(channelId) {
        const channel = this.channels.find((x) => x.id == channelId);
        if (!channel) {
            return channelId;
        }
        return channel.name;
    }
}
