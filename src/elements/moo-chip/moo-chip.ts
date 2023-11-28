import { bindable, customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

export type MOO_CHIP_SET_VARIANT = 'assist' | 'filter' | 'input' | 'suggestion';
import template from './moo-chip.html?raw';

import { MdAssistChip, MdFilterChip, MdInputChip, MdSuggestionChip } from '@material/web/all';

@customElement({ name: 'moo-chip', template, containerless: true, capture: true })
export class MooChip implements ICustomElementViewModel {
    @bindable variant: MOO_CHIP_SET_VARIANT = 'input';
    @bindable remove: () => void;
    chipEl: MdAssistChip | MdInputChip | MdSuggestionChip | MdFilterChip;

    attached() {
        this.chipEl.addEventListener('remove', () => this.handleRemove());
    }

    handleRemove() {
        if (this.remove) {
            this.remove();
        }
    }
}
