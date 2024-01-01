import { Meta, StoryObj } from '@beggars/aurelia2';
import { MooBanner } from './moo-banner';

const meta: Meta<MooBanner> = {
    title: 'Components/MooBanner',
    component: MooBanner,
    tags: ['autodocs'],
    argTypes: {
        primaryAction: { control: 'text' },
        secondaryAction: { control: 'text' },
        open: { control: 'boolean' },
    },
    args: {
        primaryAction: 'Primary action',
        secondaryAction: 'Secondary action',
        open: false,
    },
    render: () => ({
        template: '<moo-banner primary-action.bind secondary-action.bind open.bind>Moo Banner</moo-banner>',
    })
};
export default meta;

type Story = StoryObj<MooBanner>;

export const Open: Story = {
    args: {
        open: true,
    },
};