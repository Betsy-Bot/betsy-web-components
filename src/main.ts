import Aurelia, { RouterConfiguration } from 'aurelia';
import { AllConfiguration } from '@aurelia-mdc-web/all';
import { App } from './app';

import { Navigation } from "./resources/elements/navbar/navigation";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

Aurelia
    .register(RouterConfiguration, AllConfiguration,
        Navigation)
    .app(App)
    .start();
