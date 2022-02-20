import Aurelia, { RouterConfiguration } from 'aurelia';
import { AllConfiguration } from '@aurelia-mdc-web/all';
import { StandardConfiguration, SVGAnalyzer } from '@aurelia/runtime-html';
import { AuthHook } from "./resources/router-hooks/auth-hook";
import { App } from './app';

import { Navigation } from "./resources/elements/navigation/navigation";
import { ServerCard } from "./resources/elements/server-card/server-card";

import 'bootstrap';

Aurelia
    .register(RouterConfiguration,
        AuthHook,
        AllConfiguration,
        StandardConfiguration,
        SVGAnalyzer,
        Navigation,
        ServerCard
    ).app(App)
    .start();
