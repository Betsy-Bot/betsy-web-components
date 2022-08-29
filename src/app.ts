import {activationStrategy, Router} from 'aurelia-router';
import {inject, PLATFORM} from 'aurelia-framework';
import {ScrollPageStep} from "./resources/pipelines/scroll-page-step";
import {SessionService} from "./services/session-service";
import {EventAggregator} from "aurelia-event-aggregator";

@inject(Router, EventAggregator, SessionService)
export class App {
    constructor(private router: Router, private ea: EventAggregator, private sessionService: SessionService) {
    }

    user;
    guildId;
    drawer;

    expandOptions = {
        messaging: true,
        customCommands: true,
        moderation: true,
        resources: true,
        socials: true
    }

    async activate() {
        this.user = await this.sessionService.getUser();
    }

    async attached() {
        this.ea.subscribe('user-updated', payload => {
            this.user = payload;
        });
        this.ea.subscribe('guild-updated', payload => {
            this.guildId = payload;
        });
        this.ea.subscribe('drawer-updated', payload => {
            this.drawer.open = payload;
        });

        if (this.user) {
            this.ea.publish('user-updated', this.user);
        }

        //For some reason without this timeout it fails to bind properly. Race condition
        setTimeout(() => {
            if (this.guildId && this.user) {
                this.drawer.open = this.sessionService.getStorageItem(SessionService.SIDEBAR_STATUS_KEY);
            }
        }, 100)
    }

    openSection(sectionName) {
        this.expandOptions[sectionName] = !this.expandOptions[sectionName];
    }

    configureRouter(config, router) {
        config.options.pushState = true;
        config.title = 'Betsy Bot Panel';
        config.titleSeparator = ' - ';
        config.addPostRenderStep(ScrollPageStep);
        config.map([
            {
                route: '',
                name: 'home',
                moduleId: PLATFORM.moduleName('pages/home/home'),
                title: 'Betsy Bot'
            },
            {
                route: 'login',
                name: 'login',
                moduleId: PLATFORM.moduleName('pages/login/login'),
                title: 'Login'
            },
            {
                route: 'validate',
                name: 'validate',
                moduleId: PLATFORM.moduleName('pages/validate/validate'),
                title: 'Validate'
            },
            {
                route: 'guild/:guildId',
                name: 'guild',
                moduleId: PLATFORM.moduleName('pages/guild/guild'),
                title: 'Guild Manage'
            },
            {
                route: 'transcript/:ticketId',
                name: 'support-ticket-transcript',
                moduleId: PLATFORM.moduleName('pages/transcript/transcript'),
                title: 'Support Ticket Transcript'
            },
            {
                name: 'verify-login',
                route: 'verify',
                moduleId: PLATFORM.moduleName('pages/verify/verify'),
                title: 'Verify Login',
            },
            {
                name: 'verify',
                route: 'verify/:userId',
                moduleId: PLATFORM.moduleName('pages/verify/verify'),
                title: 'Verify User',
            }
        ]);

        config.mapUnknownRoutes(() => {
            return {redirect: '404'};
        });

        this.router = router;
    }
}
