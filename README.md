# Betsy Bot Material 3 Aurelia Web Components
For use in Aurelia 2 only. Does not support Aurelia 1.

Originally created for [Betsy Bot](https://betsybot.xyz/) but now available for anyone to use.

## Start dev web server
**Currently not implemented.**

    pnpm start

Note this plugin project comes with a dev-app. The above command starts the dev app in `dev-app/` folder. The plugin source code is in `src/` folder.

## Consume the plugin

Install the npm package

    npm install @worm425/betsy-web-components

Register the components in your `main.ts` or `main.js` file
```js
import * as BetsyWebComponentsPlugin from '@worm425/betsy-web-components';
//Don't forget the styles!
import '@worm425/betsy-web-components/dist/style.css';

Aurelia
    // Load all exports from the plugin
    .register(BetsyWebComponentsPlugin)
    .app(App)
    .start();
```

### Using Icons?
Add to your index.html
```html
    <link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Rounded" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Sharp" rel="stylesheet">
```


### Component List

*   💤 Waiting for Material Web Component
*   🟡 In progress
*   ✅ Complete

#### Material 3
* ✅ Button
* ✅ Select
* ✅ Switch
* ✅ Fab
* ✅ Icon
* ✅ List
  * ✅ List item
* ✅ Menu
  * ✅ Menu Item
* ✅ Tabs
  * ✅ Tab (With variants)

#### Material 2
* 💤 Accordion
* 💤 Banner
* 💤 Card (Card Content - Card Footer - Card Header)
* 🟡 Checkbox
* 🟡 Chip
* 🟡 Chipset
* 🟡 Circular Progress
* 💤 Dialog
* 💤 Drawer
* 🟡 Form Field
* 🟡 Radio
* 🟡 Text Field
* 💤 Topbar
