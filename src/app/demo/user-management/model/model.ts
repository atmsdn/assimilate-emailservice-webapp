export interface user {
    id: number
    userName: string
    roleId: number
    email: string
    phoneNumber: string
    createdAt: string
    createdBy: any
    updatedAt: string
    updatedBy: any
    deleted: boolean
    role: Role
  }
  
  export interface Role {
    id: number
    name: string
    description: string
    createdAt: string
    createdBy: number
    updatedAt: string
    updatedBy: number
    deleted: boolean
  }
  