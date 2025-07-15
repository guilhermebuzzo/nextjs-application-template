"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockDemands, mockPeople, mockCycles, mockSquads } from '@/lib/mock-data'

export default function Dashboard() {
  const activeCycle = mockCycles.find(cycle => cycle.status === 'Aberto')
  const totalPeople = mockPeople.filter(person => person.status === 'Ativo').length
  const totalDemands = mockDemands.length
  const totalSquads = mockSquads.length
  
  const demandsByStatus = mockDemands.reduce((acc, demand) => {
    acc[demand.status] = (acc[demand.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const demandsByPriority = mockDemands.reduce((acc, demand) => {
    acc[demand.priority] = (acc[demand.priority] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Visão geral do sistema de gestão de capacidade
          </p>
        </div>

        {/* Ciclo Ativo */}
        {activeCycle && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Ciclo Ativo</CardTitle>
              <CardDescription>
                {activeCycle.name} - {new Date(activeCycle.startDate).toLocaleDateString('pt-BR')} até {new Date(activeCycle.endDate).toLocaleDateString('pt-BR')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {activeCycle.status}
              </Badge>
              {activeCycle.observation && (
                <p className="text-sm text-gray-600 mt-2">{activeCycle.observation}</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total de Pessoas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalPeople}</div>
              <p className="text-xs text-gray-500">Colaboradores ativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total de Squads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalSquads}</div>
              <p className="text-xs text-gray-500">Equipes ativas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total de Demandas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalDemands}</div>
              <p className="text-xs text-gray-500">Demandas cadastradas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Capacidade Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {mockPeople.reduce((total, person) => total + person.weeklyHours, 0)}h
              </div>
              <p className="text-xs text-gray-500">Horas semanais</p>
            </CardContent>
          </Card>
        </div>

        {/* Status das Demandas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Demandas por Status</CardTitle>
              <CardDescription>Distribuição atual das demandas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(demandsByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={status === 'Backlog' ? 'secondary' : status === 'Em Andamento' ? 'default' : 'outline'}
                    >
                      {status}
                    </Badge>
                  </div>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Demandas por Prioridade</CardTitle>
              <CardDescription>Classificação de prioridades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(demandsByPriority).map(([priority, count]) => (
                <div key={priority} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={priority === 'Alta' ? 'destructive' : priority === 'Média' ? 'default' : 'secondary'}
                    >
                      {priority}
                    </Badge>
                  </div>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Demandas Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Demandas Recentes</CardTitle>
            <CardDescription>Últimas demandas cadastradas no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDemands.slice(0, 3).map((demand) => (
                <div key={demand.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">{demand.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{demand.journey}</span>
                      <span>•</span>
                      <span>{demand.squad}</span>
                      <span>•</span>
                      <span>{demand.cycle}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={demand.priority === 'Alta' ? 'destructive' : 'secondary'}>
                      {demand.priority}
                    </Badge>
                    <Badge variant="outline">
                      {demand.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
