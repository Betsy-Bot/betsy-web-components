import Aurelia from 'aurelia';
import {MyApp} from './my-app';
import * as BetsyWebComponentsPlugin from '@betsybot/betsy-web-components';
import '@betsybot/betsy-web-components/dist/style.css';

Aurelia
    .register(BetsyWebComponentsPlugin)
    .app(MyApp)
    .start();
