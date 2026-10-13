export interface Role { id: string; title: string; team: string; reportsTo: string; human?: boolean; mission: string; description?: string; domain?: string }
export const roles: Role[];
