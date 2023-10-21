import { bindable, containerless, ICustomElementViewModel } from 'aurelia';


@containerless()
export class MooCardContent implements ICustomElementViewModel {
    @bindable outlined: boolean;
}
