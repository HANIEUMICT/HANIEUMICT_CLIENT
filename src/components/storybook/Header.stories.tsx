import type { Meta, StoryObj } from '@storybook/nextjs'
import Header from '@/components/common/Header'

const meta: Meta = {
  title: 'Components/Header',
  component: Header,
  argTypes: {
    status: {
      control: 'select',
      options: ['default'],
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    headerType: 'default',
  },
}
