import { inject } from "aurelia-framework";
import { SessionService } from "../../services/session-service";
import { toast } from "lets-toast";
import { Router } from "aurelia-router";
import './login.scss';

@inject(SessionService, Router)
export class Login {
    constructor(private sessionService: SessionService, private router: Router) {
    }

    code;
    async activate(params) {
        this.code = params.code as string;
    }

    async attached() {
        if (this.code) {
            try {
                await this.sessionService.loginWithOAuthCode(this.code);
                this.router.navigate('');
            } catch(e) {
                toast("Failed to exchange code", { severity: 'error' });
            }
        }
    }

    detaching(): void | Promise<void> {
        const params = new URLSearchParams(window.location.search);
        params.delete('code')
    }
}
