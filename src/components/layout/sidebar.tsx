"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Pessoas', href: '/pessoas', icon: '👥' },
  { name: 'Squads', href: '/squads', icon: '🏢' },
  { name: 'Jornadas', href: '/jornadas', icon: '🛤️' },
  { name: 'Ciclos', href: '/ciclos', icon: '🔄' },
  { name: 'Demandas', href: '/demandas', icon: '📋' },
  { name: 'Análise de Custos', href: '/custos', icon: '💰' },
  { name: 'Auditoria', href: '/auditoria', icon: '🔍' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Capacity Manager</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-gray-200 p-4">
        <div className="text-xs text-gray-500">
          iFood Digital Transformation
        </div>
      </div>
    </div>
  )
}
