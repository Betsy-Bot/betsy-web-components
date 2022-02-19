import {bindable} from "aurelia";

export class ServerCard {
    @bindable() server;

    getServerText() {
        const matches = this.server.name.match(/\b(\w)/g);
        const acronym = matches.join('').toString();
        console.log(acronym);
        return acronym.length > 4 ? acronym.slice(0, 4) : acronym;
    }
}
