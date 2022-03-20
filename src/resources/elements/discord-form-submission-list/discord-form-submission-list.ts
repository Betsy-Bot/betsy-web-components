import {bindable} from "aurelia-framework";

export class DiscordFormSubmissionList {
    @bindable formData;
    @bindable submissions;

    created() {
        console.log(this.submissions);
    }

    getLabel(answer) {
        if (answer.label) {
            return answer.label;
        }
        return 'No Label Found'
    }
}
