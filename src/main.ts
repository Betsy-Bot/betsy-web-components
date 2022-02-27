import Aurelia, { RouterConfiguration } from 'aurelia';
import { AllConfiguration } from '@aurelia-mdc-web/all';
import { StandardConfiguration, SVGAnalyzer } from '@aurelia/runtime-html';
import { AuthHook } from "./resources/router-hooks/auth-hook";
import { ValidationHtmlConfiguration } from '@aurelia/validation-html';
import { App } from './app';

import { Navigation } from "./resources/elements/navigation/navigation";
import { ServerCard } from "./resources/elements/server-card/server-card";
import { DiscordMessageCreator } from "./resources/elements/discord-message-creator/discord-message-creator";
import { EmbedEditor } from "./resources/elements/embed-editor/embed-editor";
import {ColorPicker} from "./resources/elements/color-picker/color-picker";

import 'bootstrap';

Aurelia
    .register(RouterConfiguration, ValidationHtmlConfiguration,
        AuthHook,
        AllConfiguration,
        StandardConfiguration,
        SVGAnalyzer,
        Navigation,
        ServerCard,
        DiscordMessageCreator,
        EmbedEditor,
        ColorPicker
    ).app(App)
    .start();
