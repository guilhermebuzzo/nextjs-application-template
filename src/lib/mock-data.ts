import { Person, Squad, Journey, Cycle, Demand, VP, ResourceAllocation } from '@/types';

export const mockVPs: VP[] = [
  { id: '1', name: 'VP Finanças e Risco', area: 'Finanças' },
  { id: '2', name: 'VP Modelo de Gestão e Estratégia', area: 'Estratégia' },
  { id: '3', name: 'VP Cadeia de Suprimentos', area: 'Suprimentos' },
];

export const mockJourneys: Journey[] = [
  { id: '1', name: 'SAP Tech', vpAssociated: 'VP Finanças e Risco', description: 'Jornada focada em soluções SAP' },
  { id: '2', name: 'Cadeia de Suprimentos', vpAssociated: 'VP Cadeia de Suprimentos', description: 'Processos de suprimentos' },
  { id: '3', name: 'Apuração de Negócios', vpAssociated: 'VP Finanças e Risco', description: 'Processos financeiros' },
];

export const mockSquads: Squad[] = [
  { id: '1', name: 'SAP TechCorp', journey: 'SAP Tech', vpAssociated: 'VP Finanças e Risco', leaders: ['Ana Oliveira', 'Fábio'], description: 'Squad focada em controles financeiros' },
  { id: '2', name: 'Suprimentos Tech', journey: 'Cadeia de Suprimentos', vpAssociated: 'VP Cadeia de Suprimentos', leaders: ['Lucas Pereira', 'Carla'], description: 'Débitos técnicos' },
];

export const mockPeople: Person[] = [
  {
    id: '1',
    name: 'Ana Oliveira',
    email: 'ana.silva@ifood.com',
    role: 'Analista Funcional',
    squad: 'SAP TechCorp',
    journey: 'SAP Tech',
    skills: ['SAP MM'],
    weeklyHours: 40,
    status: 'Ativo'
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'joao@ifood.com',
    role: 'Desenvolvedor ABAP',
    squad: 'SAP TechCorp',
    journey: 'SAP Tech',
    skills: ['ABAP'],
    weeklyHours: 40,
    status: 'Ativo'
  },
  {
    id: '3',
    name: 'Lucas Pereira',
    email: 'lucas@ifood.com',
    role: 'Consultor SAP FI',
    squad: 'Suprimentos Tech',
    journey: 'Cadeia de Suprimentos',
    skills: ['SAP FI', 'Integrações'],
    weeklyHours: 40,
    status: 'Ativo'
  },
  {
    id: '4',
    name: 'Fábio Souza',
    email: 'fabio@ifood.com',
    role: 'PM',
    squad: 'SAP TechCorp',
    journey: 'Apuração de Negócios',
    skills: ['Gestão de Projetos'],
    weeklyHours: 40,
    status: 'Ativo'
  }
];

export const mockCycles: Cycle[] = [
  {
    id: '1',
    name: 'FY26 - MB1',
    startDate: '2026-01-01',
    endDate: '2026-03-31',
    status: 'Aberto',
    observation: 'Novo planejamento'
  },
  {
    id: '2',
    name: 'FY26 - MB2',
    startDate: '2026-04-01',
    endDate: '2026-06-30',
    status: 'Planejamento',
    observation: 'Reforço nas jornadas'
  }
];

export const mockDemands: Demand[] = [
  {
    id: '1',
    name: 'Gaps nas funcionalidades MM antigas',
    cycle: 'FY26 - MB1',
    journey: 'Cadeia de Suprimentos',
    squad: 'Suprimentos Tech',
    vpAssociated: 'VP Modelo de Gestão e Estratégia',
    capexOpex: 'Capex',
    type: 'Projeto',
    status: 'Backlog',
    priority: 'Alta',
    mainProblem: 'Gaps nas funcionalidades MM antigas',
    bet: 'Reduzir falhas no abastecimento em 30%',
    initialSolution: 'Implantar S/4 HANA MM com novo processo compras',
    observation: 'Integração com compras global',
    continuityItem: false,
    matureSolution: false,
    preDiscovery: true,
    dependencies: 'Integração com sistema pedidos externos',
    businessDependency: true,
    pmResponsible: 'Ana Oliveira',
    emResponsible: 'Lucas Pereira',
    nomadResponsible: 'João Silva'
  },
  {
    id: '2',
    name: 'Automatizar Fiscalização',
    cycle: 'FY26 - MB2',
    journey: 'Apuração de Negócios',
    squad: 'SAP TechCorp',
    vpAssociated: 'VP Finanças e Risco',
    capexOpex: 'Opex',
    type: 'Melhoria',
    status: 'Em Andamento',
    priority: 'Média',
    mainProblem: 'Muitos apontamentos manuais de fiscais',
    bet: 'Eliminar input manual e retrabalho',
    initialSolution: 'Robô para leitura de notas fiscais',
    observation: 'Rodar piloto até Maio',
    continuityItem: true,
    matureSolution: true,
    preDiscovery: false,
    businessDependency: false,
    pmResponsible: 'Fábio Souza',
    emResponsible: 'Camila Castro',
    nomadResponsible: 'Ana Oliveira'
  }
];

export const mockResourceAllocations: ResourceAllocation[] = [
  {
    id: '1',
    demandId: '1',
    personId: '1',
    role: 'Consultor SAP FI',
    tracking: 10,
    discovery: 10,
    technicalConfig: 30,
    businessTesting: 20,
    delivery: 10,
    totalEstimate: 80,
    observation: 'Foco fiscal'
  },
  {
    id: '2',
    demandId: '1',
    personId: '2',
    role: 'Desenvolvedor ABAP',
    tracking: 5,
    discovery: 15,
    technicalConfig: 50,
    businessTesting: 20,
    delivery: 30,
    totalEstimate: 120,
    observation: 'Automação S/4HANA'
  },
  {
    id: '3',
    demandId: '2',
    personId: '3',
    role: 'Analista Fiscal',
    tracking: 4,
    discovery: 8,
    technicalConfig: 15,
    businessTesting: 25,
    delivery: 8,
    totalEstimate: 60,
    observation: 'Teste inicial piloto'
  }
];
