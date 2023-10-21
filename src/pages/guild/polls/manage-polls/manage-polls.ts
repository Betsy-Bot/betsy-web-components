import { bindable, inject } from 'aurelia';
import { IRouter, IRouteViewModel, Params, route } from '@aurelia/router-lite';

import { DiscordService } from '../../../../services/discord-service';
import { DiscordComponentType } from '../../../../services/models/discord';

import { toast } from 'lets-toast';

@route({
    path: 'polls/:pollId',
    title: 'Manage Poll',
})
@inject(DiscordService, IRouter)
export class ManagePolls implements IRouteViewModel {
    constructor(
        private discordService: DiscordService,
        private router: IRouter
    ) {}

    loading(params: Params) {
        this.guildId = params.guildId;
        this.pollId = params.pollId;
    }

    guildId: string | undefined;
    @bindable poll;
    pollId: string | undefined;
    isNew: boolean;
    answers = [];
    option = {
        label: '',
        description: '',
        value: '',
        emoji: null,
    };
    pollTemplate = {
        name: '',
        discordServerId: '',
        type: 3,
        active: true,
        participants: [],
        containerMessage: {
            message: {
                embeds: [
                    {
                        title: 'A new Poll has started!',
                        color: 5726933,
                    },
                ],
                components: [
                    {
                        type: DiscordComponentType.ActionRow,
                        components: [
                            {
                                type: DiscordComponentType.MenuSelect,
                                customId: 'PollAnswer:',
                                label: 'Select your Answer...',
                                min_values: 1,
                                max_values: 1,
                                options: [],
                            },
                        ],
                    },
                ],
            },
        },
    };
    tab = 'settings';

    async attached() {
        console.log('attahced');
        this.guildId = this.discordService.getLocalDiscordGuildId();
        if (!this.pollId || this.pollId == 0) {
            this.isNew = true;
            this.poll = this.pollTemplate;
        } else {
            this.poll = await this.discordService.getPollById(this.pollId);
        }
        this.poll.discordServerId = this.discordService.getLocalGuild().id;
        for (const participant of this.poll.participants) {
            const index = this.answers.findIndex(
                (x) => x.answer === participant.answer
            );
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
                await this.router.load('../polls', { context: this });
            } else {
                this.poll = await this.discordService.updatePoll(this.poll);
            }
            toast(`Poll ${this.isNew ? 'Created' : 'Updated'}!`);
        } catch (e) {
            console.log(e);
            toast('Failed to create poll', { severity: 'error' });
        }
    }

    async deletePoll(event) {
        if (event.detail.action == 'ok') {
            try {
                await this.discordService.deletePollById(this.poll.id);
                toast('Deleted poll!', { severity: 'success' });
                await this.router.load('../polls', { context: this });
            } catch (e) {
                toast('Failed to delete poll', { severity: 'error' });
                throw e;
            }
        }
    }

    async addOption() {
        this.poll.containerMessage.message.components[0].components[0].options.push(
            this.option
        );
        this.option = {
            label: '',
            description: '',
            value: '',
            emoji: null,
        };
    }

    removeOption(index) {
        this.poll.containerMessage.message.components[0].components[0].options.splice(
            index,
            1
        );
    }

    clonePoll() {
        this.poll.name = '';
        this.poll.participants = [];
        this.poll.id = undefined;
        this.poll.discordServer = undefined;
        this.poll.containerMessage.id = undefined;
        this.isNew = true;
        toast('Cloned Poll');
    }
}
