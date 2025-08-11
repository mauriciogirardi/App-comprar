import { FilterStatus } from "./FilterStatus"

export type Item = {
  id: string
  status: FilterStatus 
  description: string
}

export type Items = Item[]