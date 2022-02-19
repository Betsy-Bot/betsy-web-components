import Aurelia, { RouterConfiguration } from 'aurelia';
import { AllConfiguration } from '@aurelia-mdc-web/all';
import { App } from './app';

import { Navigation } from "./resources/elements/navigation/navigation";
import {ServerCard} from "./resources/elements/server-card/server-card";

import 'bootstrap';

Aurelia
    .register(RouterConfiguration, AllConfiguration,
        Navigation, ServerCard)
    .app(App)
    .start();
