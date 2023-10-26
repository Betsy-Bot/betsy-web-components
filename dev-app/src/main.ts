import Aurelia from 'aurelia';
import {MyApp} from './my-app';
import * as BetsyWebComponentsPlugin from '@worm425/betsy-web-components';

import '../../dist/style.css'; //This works fine
//import '@worm425/betsy-web-components/dist/style.css'; //This does not work

Aurelia
    .register(BetsyWebComponentsPlugin)
    .app(MyApp)
    .start();
