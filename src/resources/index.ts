import {FrameworkConfiguration} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

export function configure(config: FrameworkConfiguration): void {
    config.globalResources([
        PLATFORM.moduleName('./elements/navigation/navigation'),
        PLATFORM.moduleName('./elements/embed-editor/embed-editor'),
        PLATFORM.moduleName('./elements/color-picker/color-picker'),
        PLATFORM.moduleName('./elements/confirmation-dialog/confirmation-dialog'),
        PLATFORM.moduleName('./elements/date-time-picker/date-time-picker'),
        PLATFORM.moduleName('./elements/server-card/server-card'),
        PLATFORM.moduleName('./elements/discord-messages-renderer/discord-messages-renderer'),
        PLATFORM.moduleName('./elements/discord-action-creator/discord-action-creator'),
        PLATFORM.moduleName('./elements/discord-button/discord-button'),
        PLATFORM.moduleName('./elements/discord-command-creator/discord-command-creator'),
        PLATFORM.moduleName('./elements/discord-channel-selector/discord-channel-selector'),
        PLATFORM.moduleName('./elements/discord-role-selector/discord-role-selector'),
        PLATFORM.moduleName('./elements/discord-command-parameter-creator/discord-command-parameter-creator'),
        PLATFORM.moduleName('./elements/discord-component-creator/discord-component-creator'),
        PLATFORM.moduleName('./elements/discord-component-preview/discord-component-preview'),
        PLATFORM.moduleName('./elements/discord-embed-preview/discord-embed-preview'),
        PLATFORM.moduleName('./elements/discord-emoji-selector/discord-emoji-selector'),
        PLATFORM.moduleName('./elements/discord-feature-header/discord-feature-header'),
        PLATFORM.moduleName('./elements/discord-message-creator/discord-message-creator'),
        PLATFORM.moduleName('./elements/discord-message-preview/discord-message-preview'),
        PLATFORM.moduleName('./elements/discord-form-creator/discord-form-creator'),
        PLATFORM.moduleName('./elements/discord-form-preview/discord-form-preview'),
        PLATFORM.moduleName('./elements/discord-form-selector/discord-form-selector'),
        PLATFORM.moduleName('./elements/discord-menu/discord-menu'),
        PLATFORM.moduleName('./elements/discord-menu-item/discord-menu-item'),
        PLATFORM.moduleName('./elements/discord-tracked-message-settings/discord-tracked-message-settings'),
        PLATFORM.moduleName('./elements/discord-welcome-message-settings/discord-welcome-message-settings'),
        PLATFORM.moduleName('./elements/feature-item-list/feature-item-list'),
        PLATFORM.moduleName('./elements/message-resource-selector/message-resource-selector'),
        PLATFORM.moduleName('./elements/support-ticket-settings/support-ticket-settings'),
        PLATFORM.moduleName('./elements/support-ticket-transcript/support-ticket-transcript'),
        PLATFORM.moduleName('./elements/validation-error/validation-error'),
        PLATFORM.moduleName('./elements/request-header-creator/request-header-creator'),
        PLATFORM.moduleName('./elements/dx-data-grid/dx-data-grid'),

        PLATFORM.moduleName('./value-converters/discord-markup'),
        PLATFORM.moduleName('./value-converters/date-formatter'),
        PLATFORM.moduleName('./value-converters/object-keys'),
        PLATFORM.moduleName('./value-converters/pascal-spacing'),
        PLATFORM.moduleName('./value-converters/channel-name'),
    ]);
}
