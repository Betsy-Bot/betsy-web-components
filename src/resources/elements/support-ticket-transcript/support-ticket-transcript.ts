import {bindable} from "aurelia-framework";

export class SupportTicketTranscript {
    @bindable supportTicket
    participants = [];

    attached() {
        this.generateParticipants();
    }

    generateParticipants() {
        for (let message of this.supportTicket.transcript.messages) {
            if (message.discordUserId != "943260131599220856" && message.discordUserId != "946433944390340688") {
                if (!this.participants.includes(message.discordUserName)) {
                    this.participants.push(message.discordUserName);
                }
            }
        }
    }
}
