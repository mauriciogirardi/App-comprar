import { FilterStatus } from '@/types/FilterStatus'
import { Item, Items } from '@/types/Items'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ITEMS_STORAGE_KEY = '@purchase:items'

async function get(): Promise<Items> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)
    return storage ? JSON.parse(storage): []
  } catch (error) {
    throw new Error("GET_ITEMS: " + error)
  }
}

async function getByStatus(status: FilterStatus): Promise<Items> {
  const items = await get()
  return items.filter(item => item.status === status)
}

async function save(items: Items): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    throw new Error("SAVE_ITEMS: " + error)
  }
}

async function add(newItem: Item): Promise<Items> {
  const items = await get()
  const updatedItems = [newItem, ...items]
  await save(updatedItems)
  return updatedItems
}

async function remove(id: string): Promise<void> {
  const items =  await get()
  const updatedItems = items.filter(item => item.id !== id)
  await save(updatedItems)
}

async function clear(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY)
  } catch (error) {
    throw new Error(`ITEM_CLEAR: ${error}`)
  }
}

async function toggleStatus(id: string): Promise<void>  {
  const items = await get()
  const updatedItems = items.map((item) => 
    item.id === id 
    ? {
        ...item, 
        status: item.status === FilterStatus.PENDING
          ? FilterStatus.DONE : FilterStatus.PENDING
      }
    : item
  )

  await save(updatedItems)
}

export {
  get,
  getByStatus,
  add,
  remove,
  clear,
  toggleStatus
}