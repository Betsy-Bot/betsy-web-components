import {bindable} from "aurelia-framework";

export class DiscordFormSubmissionList {
    @bindable formData;
    @bindable submissions;

    getLabel(answer) {
        if (answer.label) {
            return answer.label;
        }
        return 'No Label Found'
    }
}
