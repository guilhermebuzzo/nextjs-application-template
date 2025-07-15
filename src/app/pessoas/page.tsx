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
import { mockPeople, mockSquads, mockJourneys } from '@/lib/mock-data'
import { Person } from '@/types'

export default function PessoasPage() {
  const [people, setPeople] = useState<Person[]>(mockPeople)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newPerson, setNewPerson] = useState<Partial<Person>>({
    name: '',
    email: '',
    role: '',
    squad: '',
    journey: '',
    skills: [],
    weeklyHours: 40,
    status: 'Ativo'
  })

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddPerson = () => {
    if (newPerson.name && newPerson.email && newPerson.role) {
      const person: Person = {
        id: Date.now().toString(),
        name: newPerson.name,
        email: newPerson.email,
        role: newPerson.role,
        squad: newPerson.squad || '',
        journey: newPerson.journey || '',
        skills: newPerson.skills || [],
        weeklyHours: newPerson.weeklyHours || 40,
        status: newPerson.status as 'Ativo' | 'Inativo' || 'Ativo'
      }
      setPeople([...people, person])
      setNewPerson({
        name: '',
        email: '',
        role: '',
        squad: '',
        journey: '',
        skills: [],
        weeklyHours: 40,
        status: 'Ativo'
      })
      setIsDialogOpen(false)
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Pessoas</h1>
            <p className="text-gray-600 mt-2">
              Cadastro e gerenciamento de colaboradores
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Adicionar Pessoa</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Cadastrar Nova Pessoa</DialogTitle>
                <DialogDescription>
                  Preencha os dados do novo colaborador
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={newPerson.name}
                    onChange={(e) => setNewPerson({...newPerson, name: e.target.value})}
                    placeholder="Nome completo"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newPerson.email}
                    onChange={(e) => setNewPerson({...newPerson, email: e.target.value})}
                    placeholder="email@ifood.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Papel/Função *</Label>
                  <Input
                    id="role"
                    value={newPerson.role}
                    onChange={(e) => setNewPerson({...newPerson, role: e.target.value})}
                    placeholder="Ex: Desenvolvedor ABAP"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="squad">Squad</Label>
                  <Select onValueChange={(value) => setNewPerson({...newPerson, squad: value})}>
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
                <div className="grid gap-2">
                  <Label htmlFor="journey">Jornada</Label>
                  <Select onValueChange={(value) => setNewPerson({...newPerson, journey: value})}>
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
                  <Label htmlFor="hours">Horas Semanais</Label>
                  <Input
                    id="hours"
                    type="number"
                    value={newPerson.weeklyHours}
                    onChange={(e) => setNewPerson({...newPerson, weeklyHours: parseInt(e.target.value)})}
                    placeholder="40"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddPerson}>
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
                placeholder="Buscar por nome, email ou função..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Lista de Pessoas */}
        <Card>
          <CardHeader>
            <CardTitle>Colaboradores ({filteredPeople.length})</CardTitle>
            <CardDescription>
              Lista de todos os colaboradores cadastrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPeople.map((person) => (
                <div key={person.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium">{person.name}</h4>
                      <Badge variant={person.status === 'Ativo' ? 'default' : 'secondary'}>
                        {person.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{person.email}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span><strong>Função:</strong> {person.role}</span>
                      <span><strong>Squad:</strong> {person.squad}</span>
                      <span><strong>Jornada:</strong> {person.journey}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span><strong>Horas/semana:</strong> {person.weeklyHours}h</span>
                      {person.skills.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <strong>Skills:</strong>
                          {person.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
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
