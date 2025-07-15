"use client"

import { useState } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockDemands, mockCycles, mockVPs, mockResourceAllocations, mockPeople } from '@/lib/mock-data'

export default function CustosPage() {
  const [selectedCycle, setSelectedCycle] = useState<string>('all')
  const [selectedVP, setSelectedVP] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  // Calcular custos por demanda (assumindo custo médio por hora)
  const CUSTO_HORA_MEDIA = 150 // R$ por hora (valor fictício)

  const getFilteredDemands = () => {
    return mockDemands.filter(demand => {
      if (selectedCycle !== 'all' && demand.cycle !== selectedCycle) return false
      if (selectedVP !== 'all' && demand.vpAssociated !== selectedVP) return false
      if (selectedType !== 'all' && demand.capexOpex !== selectedType) return false
      return true
    })
  }

  const getDemandCost = (demandId: string) => {
    const resources = mockResourceAllocations.filter(r => r.demandId === demandId)
    const totalHours = resources.reduce((sum, resource) => sum + resource.totalEstimate, 0)
    return totalHours * CUSTO_HORA_MEDIA
  }

  const getGroupedCosts = () => {
    const filteredDemands = getFilteredDemands()
    const grouped: Record<string, Record<string, { capex: number, opex: number, demands: any[] }>> = {}

    filteredDemands.forEach(demand => {
      const vp = demand.vpAssociated
      const journey = demand.journey
      const cost = getDemandCost(demand.id)

      if (!grouped[vp]) {
        grouped[vp] = {}
      }
      if (!grouped[vp][journey]) {
        grouped[vp][journey] = { capex: 0, opex: 0, demands: [] }
      }

      if (demand.capexOpex === 'Capex') {
        grouped[vp][journey].capex += cost
      } else {
        grouped[vp][journey].opex += cost
      }
      
      grouped[vp][journey].demands.push({ ...demand, cost })
    })

    return grouped
  }

  const getTotalCosts = () => {
    const filteredDemands = getFilteredDemands()
    let totalCapex = 0
    let totalOpex = 0

    filteredDemands.forEach(demand => {
      const cost = getDemandCost(demand.id)
      if (demand.capexOpex === 'Capex') {
        totalCapex += cost
      } else {
        totalOpex += cost
      }
    })

    return { totalCapex, totalOpex, total: totalCapex + totalOpex }
  }

  const groupedCosts = getGroupedCosts()
  const totalCosts = getTotalCosts()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const exportToCSV = () => {
    const filteredDemands = getFilteredDemands()
    const csvData = [
      ['VP', 'Jornada', 'Demanda', 'Tipo', 'Custo', 'Horas Estimadas'],
      ...filteredDemands.map(demand => [
        demand.vpAssociated,
        demand.journey,
        demand.name,
        demand.capexOpex,
        getDemandCost(demand.id).toString(),
        mockResourceAllocations
          .filter(r => r.demandId === demand.id)
          .reduce((sum, r) => sum + r.totalEstimate, 0)
          .toString()
      ])
    ]

    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analise-custos-${selectedCycle || 'todos-ciclos'}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Análise de Custos</h1>
            <p className="text-gray-600 mt-2">
              Análise consolidada de custos por VP, Jornada e tipo (Capex/Opex)
            </p>
          </div>
          <Button onClick={exportToCSV}>
            Exportar CSV
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Ciclo</label>
                <Select value={selectedCycle} onValueChange={setSelectedCycle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os ciclos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os ciclos</SelectItem>
                    {mockCycles.map((cycle) => (
                      <SelectItem key={cycle.id} value={cycle.name}>
                        {cycle.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">VP</label>
                <Select value={selectedVP} onValueChange={setSelectedVP}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as VPs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as VPs</SelectItem>
                    {mockVPs.map((vp) => (
                      <SelectItem key={vp.id} value={vp.name}>
                        {vp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tipo</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Capex e Opex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Capex e Opex</SelectItem>
                    <SelectItem value="Capex">Apenas Capex</SelectItem>
                    <SelectItem value="Opex">Apenas Opex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo Total */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Capex</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(totalCosts.totalCapex)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Opex</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalCosts.totalOpex)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalCosts.total)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Análise Detalhada por VP e Jornada */}
        <Card>
          <CardHeader>
            <CardTitle>Análise Detalhada por VP e Jornada</CardTitle>
            <CardDescription>
              Custos agrupados por Vice-presidência e Jornada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(groupedCosts).map(([vp, journeys]) => {
                const vpTotalCapex = Object.values(journeys).reduce((sum, j) => sum + j.capex, 0)
                const vpTotalOpex = Object.values(journeys).reduce((sum, j) => sum + j.opex, 0)
                const vpTotal = vpTotalCapex + vpTotalOpex

                return (
                  <div key={vp} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{vp}</h3>
                      <div className="flex space-x-4 text-sm">
                        <span className="text-blue-600">
                          Capex: {formatCurrency(vpTotalCapex)}
                        </span>
                        <span className="text-green-600">
                          Opex: {formatCurrency(vpTotalOpex)}
                        </span>
                        <span className="font-semibold">
                          Total: {formatCurrency(vpTotal)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {Object.entries(journeys).map(([journey, costs]) => (
                        <div key={journey} className="bg-gray-50 p-3 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{journey}</h4>
                            <div className="flex space-x-3 text-sm">
                              <Badge variant="outline" className="text-blue-600">
                                Capex: {formatCurrency(costs.capex)}
                              </Badge>
                              <Badge variant="outline" className="text-green-600">
                                Opex: {formatCurrency(costs.opex)}
                              </Badge>
                              <Badge variant="default">
                                Total: {formatCurrency(costs.capex + costs.opex)}
                              </Badge>
                            </div>
                          </div>

                          {/* Demandas da Jornada */}
                          <div className="space-y-1">
                            {costs.demands.map((demand) => (
                              <div key={demand.id} className="flex items-center justify-between text-sm text-gray-600 pl-4">
                                <span>{demand.name}</span>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline">
                                    {demand.capexOpex}
                                  </Badge>
                                  <span>{formatCurrency(demand.cost)}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Observações */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Os custos são calculados com base nas horas estimadas dos recursos alocados</li>
              <li>• Valor médio por hora utilizado: {formatCurrency(CUSTO_HORA_MEDIA)}</li>
              <li>• Demandas sem recursos alocados aparecem com custo zero</li>
              <li>• Os valores são estimativas para planejamento e podem variar na execução</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
