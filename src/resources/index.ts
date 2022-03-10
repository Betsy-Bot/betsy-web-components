import {FrameworkConfiguration} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

export function configure(config: FrameworkConfiguration): void {
  config.globalResources([
    PLATFORM.moduleName('./elements/navigation/navigation'),
    PLATFORM.moduleName('./elements/embed-editor/embed-editor'),
    PLATFORM.moduleName('./elements/color-picker/color-picker'),
    PLATFORM.moduleName('./elements/server-card/server-card'),
    PLATFORM.moduleName('./elements/discord-action-creator/discord-action-creator'),
    PLATFORM.moduleName('./elements/discord-command-creator/discord-command-creator'),
    PLATFORM.moduleName('./elements/discord-embed-preview/discord-embed-preview'),
    PLATFORM.moduleName('./elements/discord-message-creator/discord-message-creator'),
    PLATFORM.moduleName('./elements/discord-message-preview/discord-message-preview'),
  ]);
}
