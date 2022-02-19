import Aurelia, { RouterConfiguration } from 'aurelia';
import { AllConfiguration } from '@aurelia-mdc-web/all';
import { AuthHook } from "./resources/router-hooks/auth-hook";
import { App } from './app';

import { Navigation } from "./resources/elements/navigation/navigation";
import { ServerCard } from "./resources/elements/server-card/server-card";

import 'bootstrap';

Aurelia
    .register(RouterConfiguration, AuthHook,
        AllConfiguration,
        Navigation, ServerCard)
    .app(App)
    .start();
