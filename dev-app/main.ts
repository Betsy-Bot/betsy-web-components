import Aurelia from 'aurelia';
import {App} from './app';
import * as Plugin from "../src";
import {RouterConfiguration} from "@aurelia/router-lite";

Aurelia
    .register(
        RouterConfiguration.customize({
            useUrlFragmentHash: false,
        }),
    )
    .register(Plugin)
    .app(App)
    .start();
