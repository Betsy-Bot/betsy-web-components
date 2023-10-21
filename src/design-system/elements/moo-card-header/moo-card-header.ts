import { bindable, containerless, ICustomElementViewModel } from 'aurelia';


@containerless()
export class MooCardHeader implements ICustomElementViewModel {
    @bindable outlined: boolean;
}
