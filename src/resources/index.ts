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
        PLATFORM.moduleName('./elements/discord-channel-selector/discord-channel-selector'),
        PLATFORM.moduleName('./elements/discord-embed-preview/discord-embed-preview'),
        PLATFORM.moduleName('./elements/discord-feature-header/discord-feature-header'),
        PLATFORM.moduleName('./elements/discord-message-creator/discord-message-creator'),
        PLATFORM.moduleName('./elements/discord-message-preview/discord-message-preview'),
        PLATFORM.moduleName('./elements/discord-form-creator/discord-form-creator'),
        PLATFORM.moduleName('./elements/discord-form-preview/discord-form-preview'),
        PLATFORM.moduleName('./elements/discord-form-selector/discord-form-selector'),
        PLATFORM.moduleName('./elements/discord-form-submission-list/discord-form-submission-list'),
        PLATFORM.moduleName('./elements/feature-item-list/feature-item-list'),
        PLATFORM.moduleName('./elements/tracked-message-creator/tracked-message-creator'),

        PLATFORM.moduleName('./value-converters/discord-markup'),
        PLATFORM.moduleName('./value-converters/date-formatter'),
    ]);
}
