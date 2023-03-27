import { Aurelia } from 'aurelia-framework';
import environment from '../config/environment.json';
import { PLATFORM } from 'aurelia-pal';
import { HttpClient } from 'aurelia-fetch-client';

import 'bootstrap';
import '@popperjs/core';
import 'app.scss';
import { apiEndpoint } from "./environment";
import { ApiInterceptor } from "./services/api-interceptor";

/*
Material Web Components
 */
import '@material/web/button/filled-button';

export function configure(aurelia: Aurelia): void {
    aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName('@aurelia-mdc-web/all'))
        .plugin(PLATFORM.moduleName('aurelia-validation'))
        .feature(PLATFORM.moduleName('resources/index'));

    aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

    aurelia.container.get(HttpClient).configure(config => {
        config
            .withBaseUrl(apiEndpoint())
            .withInterceptor(aurelia.container.get(ApiInterceptor))
            .withDefaults({
                headers: {
                    'Accept': 'application/json'
                }
            });
    });

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
