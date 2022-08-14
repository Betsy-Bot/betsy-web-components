import {bindable} from "aurelia-framework";

export class SupportTicketTranscript {
    @bindable supportTicket
    participants = [];

    attached() {
        this.generateParticipants();
        this.replaceMentioned();
    }

    generateParticipants() {
        for (const message of this.supportTicket.transcript.messages) {
            if (message.discordUserId != "943260131599220856" && message.discordUserId != "946433944390340688") {
                if (!this.participants.includes(message.discordUserName)) {
                    this.participants.push({name: message.discordUserName, id: message.discordUserId});
                }
            }
        }
    }
    
    replaceMentioned() {
        for (const participant of this.participants) {
            for (const message of this.supportTicket.transcript.messages) {
                message.message = message.message.replace(`<@${participant.id}>`, `@${participant.name}`)
            }
        }
    }
}
