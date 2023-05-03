import { IEventAggregator, inject } from "aurelia";
import { IRouter,route } from "@aurelia/router-lite";

import { FourOhFour } from "./pages/four-oh-four/four-oh-four";
import { Guild } from "./pages/guild/guild";
import { Home } from "./pages/home/home";
import { Transcript } from "./pages/transcript/transcript";
import { Verify } from "./pages/verify/verify";
import { SessionService } from "./services/session-service";

import "./app.scss";

import { toast } from "lets-toast";

const routes = [Home, Guild, FourOhFour, Transcript, Verify];
@route({ title: "Besty Bot", routes: routes, fallback: "404" })
@inject(IEventAggregator, SessionService, IRouter)
export class App {
    constructor(
        private ea: IEventAggregator,
        private sessionService: SessionService,
        private router: IRouter
    ) {}

    user;
    guildId;
    code: string;
    drawerOpen: boolean;
    isLoading = true;

    async attached() {
        try {
            const urlSearchParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlSearchParams.entries());
            this.code = params.code;
            if (this.code) {
                try {
                    this.user = await this.sessionService.loginWithOAuthCode(
                        this.code
                    );
                } catch (e) {
                    toast("Failed to exchange code", { severity: "error" });
                } finally {
                    await this.router.load('');
                }
            } else {
                this.user = await this.sessionService.getUser();
            }
            this.ea.subscribe("user-updated", (payload) => {
                this.user = payload;
            });
            this.ea.subscribe("guild-updated", (payload) => {
                this.guildId = payload;
            });
            this.ea.subscribe("drawer-updated", (payload) => {
                this.drawerOpen = payload as boolean;
            });

            if (this.user) {
                this.ea.publish("user-updated", this.user);
            }

            //For some reason without this timeout it fails to bind properly. Race condition
            setTimeout(() => {
                if (this.guildId && this.user) {
                    this.drawerOpen = this.sessionService.getStorageItem(
                        SessionService.SIDEBAR_STATUS_KEY
                    ) as boolean;
                }
            }, 100);
        } finally {
            this.isLoading = false;
        }
    }
}
