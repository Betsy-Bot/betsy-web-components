import { Meta, StoryObj } from '@beggars/aurelia2';
import { MooChip } from './moo-chip';

const meta: Meta<MooChip> = {
    title: 'Components/MooChip',
    component: MooChip,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['assist', 'filter', 'input', 'suggestion']
        },
    },
    args: {
        variant: 'input',
    },
    render: () => ({
        template: '<moo-chip variant.bind>Moo Chip</moo-chip>',
    })
};
export default meta;

type Story = StoryObj<MooChip>;

export const Input: Story = {
    args: {
        variant: 'input',
    },
};

export const Assist: Story = {
    args: {
        variant: 'assist',
    },
};


export const Filter: Story = {
    args: {
        variant: 'filter',
    },
};

export const Suggestion: Story = {
    args: {
        variant: 'suggestion',
    },
};
