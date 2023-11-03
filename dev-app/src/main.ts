import Aurelia from 'aurelia';
import {MyApp} from './my-app';
import * as BetsyWebComponentsPlugin from '@worm425/betsy-web-components';
import '@worm425/betsy-web-components/dist/style.css';

Aurelia
    .register(BetsyWebComponentsPlugin)
    .app(MyApp)
    .start();
