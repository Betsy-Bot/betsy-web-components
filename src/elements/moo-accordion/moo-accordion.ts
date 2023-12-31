import { bindable, capture, containerless, ICustomElementViewModel } from 'aurelia';

import './moo-accordion.scss';

@containerless()
@capture()
export class MooAccordion implements ICustomElementViewModel {
    @bindable header: string;
    accordionItemEl: HTMLElement;
    accordionHeaderEl: HTMLElement;

    closeAllOtherAccordions(element) {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            if (header !== element) {
                // @ts-ignore
                header.parentElement.classList.remove('accordion-expanded');
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                header.nextElementSibling.style.maxHeight = 0;
            }
        });
    }

    attached() {
        this.accordionHeaderEl.addEventListener('click', () => {
            const content = this.accordionHeaderEl.nextElementSibling as HTMLElement;
            // @ts-ignore
            const isOpen = this.accordionHeaderEl.parentElement.classList.contains('accordion-expanded');

            this.closeAllOtherAccordions(this.accordionHeaderEl);

            if (isOpen) {
                content.style.maxHeight = '0';
            } else {
                content.style.maxHeight = (content.scrollHeight + 50) + 'px';
            }

            // @ts-ignore
            this.accordionHeaderEl.parentElement.classList.toggle('accordion-expanded');
        });
    }
}
