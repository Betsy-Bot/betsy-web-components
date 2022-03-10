import { inject} from "aurelia-framework";
import { SessionService } from "../../services/session-service";
import {toast} from "lets-toast";
import { Router } from "aurelia-router";
import './login.scss';

@inject(SessionService, Router)
export class Login {
    constructor(private sessionService: SessionService, private router: Router) {
    }

    async activate(params) {
        const code = params.code as string;
        if (code) {
            try {
                await this.sessionService.loginWithOAuthCode(code);
                this.router.navigate('');
            } catch(e) {
                toast("Failed to exchange code", {severity: 'error'});
            }
        }
        return true;
    }

    detaching(): void | Promise<void> {
        const params = new URLSearchParams(window.location.search);
        params.delete('code')
    }
}
