import Aurelia from 'aurelia';
import { RouterConfiguration } from '@aurelia/router-lite';

import * as Elements from './resources/elements';
import * as ValueConverters from './resources/value-converters';
import { App } from './app';

import { BetsyWebComponentsPlugin } from '@worm425/betsy-web-components';

await Aurelia
    .register(
        RouterConfiguration.customize({
            //title: "Betsy Bot Admin Panel",
            useUrlFragmentHash: false,
        }),
    )
    .register(BetsyWebComponentsPlugin)
    .register(Elements)
    .register(ValueConverters)
    .app(App)
    .start();
