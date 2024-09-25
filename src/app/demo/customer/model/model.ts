export interface customer {
  id:number
  count: string
  rows: Row[]
}

export interface Row {
  id: number
  name: string
  address: string
  userName: string
  email: string
  createdBy: any
  phoneNumber: string
  deleted: boolean
}