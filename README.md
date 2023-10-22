# Betsy Bot Material 3 Web Components

## Start dev web server

    pnpm start

Note this plugin project comes with a dev-app. The above command starts the dev app in `dev-app/` folder. The plugin source code is in `src/` folder.

## Consume the plugin

Install the npm package

    pnpm install @betsybot/web-components

Register the components in your `main.ts` or `main.js` file
```js
import * as BetsyWebComponentsPlugin from '@betsybot/web-components';

Aurelia
    // Load all exports from the plugin
    .register(BetsyWebComponentsPlugin)
    .app(App)
    .start();
```
