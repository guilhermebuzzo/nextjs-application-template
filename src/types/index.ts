// Core data types for the Capacity Manager Application

export interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
  squad: string;
  journey: string;
  skills: string[];
  weeklyHours: number;
  status: 'Ativo' | 'Inativo';
}

export interface Squad {
  id: string;
  name: string;
  journey: string;
  vpAssociated: string;
  leaders: string[];
  description: string;
}

export interface Journey {
  id: string;
  name: string;
  vpAssociated: string;
  description: string;
}

export interface Cycle {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Aberto' | 'Planejamento' | 'Fechado';
  observation?: string;
}

export interface Demand {
  id: string;
  name: string;
  cycle: string;
  journey: string;
  squad?: string;
  vpAssociated: string;
  capexOpex: 'Capex' | 'Opex';
  type: 'Projeto' | 'Melhoria' | 'Manutenção';
  status: 'Backlog' | 'Em Andamento' | 'Finalizado';
  priority: 'Alta' | 'Média' | 'Baixa';
  mainProblem: string;
  bet: string;
  initialSolution: string;
  observation?: string;
  continuityItem: boolean;
  matureSolution: boolean;
  preDiscovery: boolean;
  dependencies?: string;
  businessDependency: boolean;
  pmResponsible: string;
  emResponsible: string;
  nomadResponsible: string;
}

export interface ResourceAllocation {
  id: string;
  demandId: string;
  personId: string;
  role: string;
  tracking: number;
  discovery: number;
  technicalConfig: number;
  businessTesting: number;
  delivery: number;
  totalEstimate: number;
  observation?: string;
}

export interface VP {
  id: string;
  name: string;
  area: string;
}
