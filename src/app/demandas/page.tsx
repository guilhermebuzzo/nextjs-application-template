"use client"

import { useState } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockDemands, mockCycles, mockJourneys, mockSquads, mockVPs, mockPeople, mockResourceAllocations } from '@/lib/mock-data'
import { Demand, ResourceAllocation } from '@/types'

export default function DemandasPage() {
  const [demands, setDemands] = useState<Demand[]>(mockDemands)
  const [resourceAllocations, setResourceAllocations] = useState<ResourceAllocation[]>(mockResourceAllocations)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null)
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false)
  const [newDemand, setNewDemand] = useState<Partial<Demand>>({
    name: '',
    cycle: '',
    journey: '',
    squad: '',
    vpAssociated: '',
    capexOpex: 'Capex',
    type: 'Projeto',
    status: 'Backlog',
    priority: 'Média',
    mainProblem: '',
    bet: '',
    initialSolution: '',
    observation: '',
    continuityItem: false,
    matureSolution: false,
    preDiscovery: false,
    dependencies: '',
    businessDependency: false,
    pmResponsible: '',
    emResponsible: '',
    nomadResponsible: ''
  })

  const [newResource, setNewResource] = useState<Partial<ResourceAllocation>>({
    personId: '',
    role: '',
    tracking: 0,
    discovery: 0,
    technicalConfig: 0,
    businessTesting: 0,
    delivery: 0,
    observation: ''
  })

  const filteredDemands = demands.filter(demand =>
    demand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demand.journey.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demand.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddDemand = () => {
    if (newDemand.name && newDemand.cycle && newDemand.journey) {
      const demand: Demand = {
        ...newDemand as Demand,
        id: Date.now().toString()
      }
      setDemands([...demands, demand])
      setNewDemand({
        name: '',
        cycle: '',
        journey: '',
        squad: '',
        vpAssociated: '',
        capexOpex: 'Capex',
        type: 'Projeto',
        status: 'Backlog',
        priority: 'Média',
        mainProblem: '',
        bet: '',
        initialSolution: '',
        observation: '',
        continuityItem: false,
        matureSolution: false,
        preDiscovery: false,
        dependencies: '',
        businessDependency: false,
        pmResponsible: '',
        emResponsible: '',
        nomadResponsible: ''
      })
      setIsDialogOpen(false)
    }
  }

  const handleAddResource = () => {
    if (selectedDemand && newResource.personId && newResource.role) {
      const totalEstimate = (newResource.tracking || 0) + (newResource.discovery || 0) + 
                           (newResource.technicalConfig || 0) + (newResource.businessTesting || 0) + 
                           (newResource.delivery || 0)
      
      const resource: ResourceAllocation = {
        id: Date.now().toString(),
        demandId: selectedDemand.id,
        personId: newResource.personId,
        role: newResource.role,
        tracking: newResource.tracking || 0,
        discovery: newResource.discovery || 0,
        technicalConfig: newResource.technicalConfig || 0,
        businessTesting: newResource.businessTesting || 0,
        delivery: newResource.delivery || 0,
        totalEstimate,
        observation: newResource.observation
      }
      
      setResourceAllocations([...resourceAllocations, resource])
      setNewResource({
        personId: '',
        role: '',
        tracking: 0,
        discovery: 0,
        technicalConfig: 0,
        businessTesting: 0,
        delivery: 0,
        observation: ''
      })
      setIsResourceDialogOpen(false)
    }
  }

  const getDemandResources = (demandId: string) => {
    return resourceAllocations.filter(resource => resource.demandId === demandId)
  }

  const getPersonName = (personId: string) => {
    const person = mockPeople.find(p => p.id === personId)
    return person ? person.name : 'Pessoa não encontrada'
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Demandas</h1>
            <p className="text-gray-600 mt-2">
              Cadastro e gerenciamento de demandas e recursos
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Cadastrar Demanda</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Cadastrar Nova Demanda</DialogTitle>
                <DialogDescription>
                  Preencha os dados da nova demanda
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome da Demanda *</Label>
                    <Input
                      id="name"
                      value={newDemand.name}
                      onChange={(e) => setNewDemand({...newDemand, name: e.target.value})}
                      placeholder="Nome da demanda"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cycle">Ciclo *</Label>
                    <Select onValueChange={(value) => setNewDemand({...newDemand, cycle: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um ciclo" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCycles.map((cycle) => (
                          <SelectItem key={cycle.id} value={cycle.name}>
                            {cycle.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="journey">Jornada *</Label>
                    <Select onValueChange={(value) => setNewDemand({...newDemand, journey: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma jornada" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockJourneys.map((journey) => (
                          <SelectItem key={journey.id} value={journey.name}>
                            {journey.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="squad">Squad</Label>
                    <Select onValueChange={(value) => setNewDemand({...newDemand, squad: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um squad" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockSquads.map((squad) => (
                          <SelectItem key={squad.id} value={squad.name}>
                            {squad.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="capexOpex">Capex/Opex *</Label>
                    <Select onValueChange={(value) => setNewDemand({...newDemand, capexOpex: value as 'Capex' | 'Opex'})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Capex/Opex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Capex">Capex</SelectItem>
                        <SelectItem value="Opex">Opex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Tipo *</Label>
                    <Select onValueChange={(value) => setNewDemand({...newDemand, type: value as any})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Projeto">Projeto</SelectItem>
                        <SelectItem value="Melhoria">Melhoria</SelectItem>
                        <SelectItem value="Manutenção">Manutenção</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Prioridade *</Label>
                    <Select onValueChange={(value) => setNewDemand({...newDemand, priority: value as any})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alta">Alta</SelectItem>
                        <SelectItem value="Média">Média</SelectItem>
                        <SelectItem value="Baixa">Baixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="mainProblem">Problema Principal *</Label>
                  <Textarea
                    id="mainProblem"
                    value={newDemand.mainProblem}
                    onChange={(e) => setNewDemand({...newDemand, mainProblem: e.target.value})}
                    placeholder="Descreva o problema principal"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bet">Aposta *</Label>
                  <Textarea
                    id="bet"
                    value={newDemand.bet}
                    onChange={(e) => setNewDemand({...newDemand, bet: e.target.value})}
                    placeholder="Descreva o resultado esperado"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="initialSolution">Solução Inicial Proposta *</Label>
                  <Textarea
                    id="initialSolution"
                    value={newDemand.initialSolution}
                    onChange={(e) => setNewDemand({...newDemand, initialSolution: e.target.value})}
                    placeholder="Descreva a solução proposta"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="continuityItem"
                      checked={newDemand.continuityItem}
                      onCheckedChange={(checked) => setNewDemand({...newDemand, continuityItem: checked})}
                    />
                    <Label htmlFor="continuityItem">Item de Continuidade</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="matureSolution"
                      checked={newDemand.matureSolution}
                      onCheckedChange={(checked) => setNewDemand({...newDemand, matureSolution: checked})}
                    />
                    <Label htmlFor="matureSolution">Solução Madura</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="preDiscovery"
                      checked={newDemand.preDiscovery}
                      onCheckedChange={(checked) => setNewDemand({...newDemand, preDiscovery: checked})}
                    />
                    <Label htmlFor="preDiscovery">Pre Discovery</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddDemand}>
                  Cadastrar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="Buscar por nome, jornada ou status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Lista de Demandas */}
        <Card>
          <CardHeader>
            <CardTitle>Demandas ({filteredDemands.length})</CardTitle>
            <CardDescription>
              Lista de todas as demandas cadastradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDemands.map((demand) => {
                const resources = getDemandResources(demand.id)
                const totalHours = resources.reduce((sum, resource) => sum + resource.totalEstimate, 0)
                
                return (
                  <div key={demand.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-lg">{demand.name}</h4>
                          <Badge variant={demand.priority === 'Alta' ? 'destructive' : demand.priority === 'Média' ? 'default' : 'secondary'}>
                            {demand.priority}
                          </Badge>
                          <Badge variant="outline">
                            {demand.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div><strong>Ciclo:</strong> {demand.cycle}</div>
                          <div><strong>Jornada:</strong> {demand.journey}</div>
                          <div><strong>Squad:</strong> {demand.squad || 'N/A'}</div>
                          <div><strong>Tipo:</strong> {demand.type}</div>
                        </div>
                        
                        <div className="text-sm">
                          <p><strong>Problema:</strong> {demand.mainProblem}</p>
                          <p><strong>Aposta:</strong> {demand.bet}</p>
                        </div>
                        
                        {resources.length > 0 && (
                          <div className="text-sm">
                            <strong>Recursos Alocados:</strong> {resources.length} pessoa(s) - {totalHours}h total
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedDemand(demand)
                            setIsResourceDialogOpen(true)
                          }}
                        >
                          Alocar Recursos
                        </Button>
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                    
                    {/* Recursos da Demanda */}
                    {resources.length > 0 && (
                      <div className="border-t pt-4">
                        <h5 className="font-medium mb-2">Recursos Alocados:</h5>
                        <div className="space-y-2">
                          {resources.map((resource) => (
                            <div key={resource.id} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                              <div>
                                <strong>{getPersonName(resource.personId)}</strong> - {resource.role}
                              </div>
                              <div className="text-right">
                                <div>{resource.totalEstimate}h total</div>
                                <div className="text-xs text-gray-500">
                                  Acomp: {resource.tracking}h | Discovery: {resource.discovery}h | 
                                  Config: {resource.technicalConfig}h | Testes: {resource.businessTesting}h | 
                                  Entrega: {resource.delivery}h
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Dialog para Alocar Recursos */}
        <Dialog open={isResourceDialogOpen} onOpenChange={setIsResourceDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Alocar Recurso</DialogTitle>
              <DialogDescription>
                Demanda: {selectedDemand?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="person">Pessoa *</Label>
                <Select onValueChange={(value) => setNewResource({...newResource, personId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma pessoa" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPeople.map((person) => (
                      <SelectItem key={person.id} value={person.id}>
                        {person.name} - {person.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="role">Papel na Demanda *</Label>
                <Input
                  id="role"
                  value={newResource.role}
                  onChange={(e) => setNewResource({...newResource, role: e.target.value})}
                  placeholder="Ex: Consultor SAP FI"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tracking">Acompanhamento (h)</Label>
                  <Input
                    id="tracking"
                    type="number"
                    value={newResource.tracking}
                    onChange={(e) => setNewResource({...newResource, tracking: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="discovery">Discovery (h)</Label>
                  <Input
                    id="discovery"
                    type="number"
                    value={newResource.discovery}
                    onChange={(e) => setNewResource({...newResource, discovery: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="technical">Config. Técnicas (h)</Label>
                  <Input
                    id="technical"
                    type="number"
                    value={newResource.technicalConfig}
                    onChange={(e) => setNewResource({...newResource, technicalConfig: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="testing">Testes Negócio (h)</Label>
                  <Input
                    id="testing"
                    type="number"
                    value={newResource.businessTesting}
                    onChange={(e) => setNewResource({...newResource, businessTesting: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="delivery">Entrega (h)</Label>
                <Input
                  id="delivery"
                  type="number"
                  value={newResource.delivery}
                  onChange={(e) => setNewResource({...newResource, delivery: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="observation">Observação</Label>
                <Textarea
                  id="observation"
                  value={newResource.observation}
                  onChange={(e) => setNewResource({...newResource, observation: e.target.value})}
                  placeholder="Observações sobre a alocação"
                />
              </div>
              
              <div className="text-sm text-gray-600">
                <strong>Total Estimado:</strong> {
                  (newResource.tracking || 0) + (newResource.discovery || 0) + 
                  (newResource.technicalConfig || 0) + (newResource.businessTesting || 0) + 
                  (newResource.delivery || 0)
                }h
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsResourceDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddResource}>
                Alocar Recurso
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
