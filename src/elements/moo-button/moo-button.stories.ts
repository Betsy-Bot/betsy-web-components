import { Meta, StoryObj } from '@beggars/aurelia2';
import { MooButton } from './moo-button';

const meta: Meta<MooButton> = {
    title: 'Components/MooButton',
    component: MooButton,
    tags: ['autodocs'],
    argTypes: {
        icon: { control: 'text' },
        disabled: { control: 'boolean' },
        variant: { control: 'text' },
    },
    args: {
        icon: '',
        disabled: false,
        variant: 'filled',
    },
    render: () => ({
        template: '<moo-button icon.bind disabled.bind variant.bind>Moo Button</moo-button>',
    })
};
export default meta;

type Story = StoryObj<MooButton>;

export const Filled: Story = {
    args: {
        variant: 'filled',
    },
};

export const FilledTonal: Story = {
    args: {
        variant: 'filled-tonal',
    },
};

export const Text: Story = {
    args: {
        variant: 'text',
    },
};

export const Elevated: Story = {
    args: {
        variant: 'elevated',
    },
};