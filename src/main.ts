import Aurelia, { RouterConfiguration } from 'aurelia';
import { App } from './app';

Aurelia
    .register(RouterConfiguration)
    .app(App)
    .start();
