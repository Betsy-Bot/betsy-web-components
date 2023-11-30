# Betsy Bot Material 3 Aurelia Web Components
For use in Aurelia 2 only. Does not support Aurelia 1.

Originally created for [Betsy Bot](https://betsybot.xyz/) but now available for anyone to use.
## Consume the plugin

Install the npm package

    npm install @betsybot/betsy-web-components

Register the components in your `main.ts` or `main.js` file
```js
import * as BetsyWebComponentsPlugin from '@betsybot/betsy-web-components';
//Don't forget the styles!
import '@betsybot/betsy-web-components/dist/style.css';

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
* ✅ Checkbox
* ✅ Chipset
* * ✅ Chip (With variants)
* ✅ Icon
* ✅ Fab
* ✅ List
  * ✅ List item
* ✅ Menu
  * ✅ Menu Item
* ✅ Progress (With variants)
* ✅ Select
* ✅ Switch
* ✅ Tabs
  * ✅ Tab (With variants)
* ✅ Text Field

#### Material 2
* 💤 Accordion
* 💤 Banner
* 💤 Card (Card Content - Card Footer - Card Header)
* 🟡 Chipset
* 💤 Dialog
* 💤 Drawer
* 🟡 Form Field
* 🟡 Radio
* 💤 Topbar
