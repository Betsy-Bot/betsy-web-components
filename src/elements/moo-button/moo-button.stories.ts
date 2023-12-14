import { Meta, StoryObj } from '@beggars/aurelia2';
import { MooButton, IMooButtonProps } from './moo-button';

const meta = {
    title: 'Components/MooButton',
    component: MooButton,
    args: {
        icon: '',
        disabled: false,
    }
} satisfies Meta<IMooButtonProps>;
export default meta;

type Story = StoryObj<IMooButtonProps>;

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