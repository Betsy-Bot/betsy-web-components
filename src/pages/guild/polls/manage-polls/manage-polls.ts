import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from "services/discord-service";
import { Router } from "aurelia-router";
import { toast } from "lets-toast";
import { bindable, inject } from "aurelia-framework";
import { DiscordButtonStyle, DiscordComponentType } from "../../../../services/models/discord";

@inject(EventAggregator, DiscordService, Router)
export class ManagePolls {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    activate(params) {
        this.guildId = params.guildId;
        this.pollId = params.pollId;
    }

    guildId: string;
    @bindable poll;
    pollId;
    isNew: boolean;
    answers = [];
    option = {
        label: '',
        description: '',
        value: '',
        emoji: {}
    }
    pollTemplate = {
        name: '',
        discordServerId: '',
        type: 3,
        active: true,
        containerMessage: {
            message: {
                embeds: [
                    {
                        title: "A new Poll has started!",
                        color: 5726933
                    }
                ],
                components: [
                    {
                        type: DiscordComponentType.ActionRow,
                        components: [{
                            type: DiscordComponentType.MenuSelect,
                            customId: "PollAnswer:",
                            label: "Select your Answer...",
                            min_values: 1,
                            max_values: 1,
                            options: []
                        }]
                    }
                ]
            }
        }
    }
    tab = "settings";

    async attached() {
        if (!this.pollId || this.pollId == 0) {
            this.isNew = true;
            this.poll = this.pollTemplate;
        } else {
            this.poll = await this.discordService.getPollById(this.pollId);
        }
        this.pollTemplate.discordServerId = this.discordService.getLocalGuild().id;
        for (const participant of this.poll.participants) {
            const index = this.answers.findIndex(x => x.answer === participant.answer);
            if (index === -1) {
                this.answers.push({ answer: participant.answer, count: 1 });
            } else {
                this.answers[index].count++;
            }
        }
    }

    async save() {
        try {
            if (this.isNew) {
                this.poll = await this.discordService.createPoll(this.poll);
            } else {
                this.poll = await this.discordService.updatePoll(this.poll);
            }
            toast(`Poll ${this.isNew ? 'Created' : 'Updated'}!`);
            this.router.navigateBack();
        } catch(e) {
            console.log(e);
            toast('Failed to create poll', { severity: 'error' })
        }
    }

    async deletePoll(event) {
        if (event.detail.action == 'ok') {
            try {
                await this.discordService.deleteGiveawayById(this.poll.id);
                toast("Deleted poll!", { severity: "success" })
                this.router.navigateBack();
            } catch(e) {
                toast("Failed to delete poll", { severity: "error" });
                throw e;
            }
        }
    }

    async addOption() {
        this.poll.containerMessage.message.components[0].components[0].options.push(this.option);
        this.option = {
            label: '',
            description: '',
            value: '',
            emoji: {}
        }
    }

    removeOption(index) {
        this.poll.containerMessage.message.components[0].components[0].options.splice(index, 1);
    }
}
