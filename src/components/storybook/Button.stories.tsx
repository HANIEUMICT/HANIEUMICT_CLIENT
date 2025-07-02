// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs'
import Button1 from '@/components/common/Button1'

const meta: Meta = {
  title: 'Components/Button',
  component: Button1,
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'outline2', 'ghost'],
    },
    status: {
      control: 'select',
      options: ['default', 'hover', 'click', 'disabled'],
    },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm'],
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    children: '버튼',
    styleType: 'ghost',
    styleSize: 'md',
    styleStatus: 'disabled',
  },
}
