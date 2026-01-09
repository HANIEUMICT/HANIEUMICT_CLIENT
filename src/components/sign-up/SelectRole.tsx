'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'

interface RoleOption {
  title: string
  type: 'person' | 'company'
  img: string
}

const ROLE_OPTIONS: RoleOption[] = [
  { title: '개인 회원', type: 'person', img: '/person-graphic.svg' },
  { title: '기업 회원', type: 'company', img: '/company-graphic.svg' },
]

const SelectRole = () => {
  const selectedRole = useAuthStore((state) => state.selectedUserRole)
  const setState = useAuthStore((state) => state.setState)

  const handleSelect = (type: 'person' | 'company') => {
    const nextRole = selectedRole === type ? undefined : type
    setState({ selectedUserRole: nextRole })
  }

  return (
    <div className="mt-8 flex w-[600px] gap-x-4">
      {ROLE_OPTIONS.map((role) => (
        <RoleCard
          key={role.type}
          role={role}
          isSelected={selectedRole === role.type}
          onClick={() => handleSelect(role.type)}
        />
      ))}
    </div>
  )
}

const RoleCard = ({ role, isSelected, onClick }: { role: RoleOption; isSelected: boolean; onClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex flex-1 flex-col items-center gap-y-4 rounded-[24px] border bg-white p-6 transition-all',
        'hover:border-conic-red-20',
        isSelected ? 'border-conic-red-30 ring-conic-red-30' : 'border-gray-20'
      )}
    >
      <div className="relative h-[220px] w-[220px]">
        <Image src={role.img} alt={role.title} fill sizes="220px" priority={role.type === 'person'} />
      </div>
      <p className="h3 transition-colors">{role.title}</p>
    </button>
  )
}

export default SelectRole
