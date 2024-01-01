import { Meta, StoryObj } from '@beggars/aurelia2';
import { MooAccordion } from './moo-accordion';

const meta: Meta<MooAccordion> = {
    title: 'Components/MooAccordion',
    component: MooAccordion,
    tags: ['autodocs'],
    argTypes: {
        header: { control: 'text' },
    },
    args: {
        header: '',
    },
    render: () => ({
        template: '<moo-accordion header.bind>Moo Accordion</moo-accordion>',
    })
};
export default meta;

type Story = StoryObj<MooAccordion>;

export const HeaderText: Story = {
    args: {
        header: 'Accordion Header',
    },
};