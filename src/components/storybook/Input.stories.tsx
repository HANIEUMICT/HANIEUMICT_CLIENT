import type { Meta, StoryObj } from '@storybook/nextjs'
import Input from '@/components/common/Input'

const meta: Meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    status: {
      control: 'select',
      options: ['default', 'hover', 'focus', 'error', 'disabled'],
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    inputBoxStyle: 'default',
    placeholder: '검색어를 입력해주세요.',
  },
}
