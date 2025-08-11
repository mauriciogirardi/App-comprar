import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/components/Item';
import { useEffect, useState } from 'react';
import { Items } from '@/types/Items';
import { generateId } from '@/utils/ndex';
import { get, getByStatus, add, remove, clear, toggleStatus } from '@/storage/itemsStorage'

const FILTER_STATUS: FilterStatus[] = [
  FilterStatus.PENDING,
  FilterStatus.DONE
]

export function Home() {
  const [status, setStatus] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState('')
  const [items, setItems] = useState<Items>([])

  const getItemsByStatus = async () => {
    try {
      const results = await getByStatus(status)
      setItems(results)
    } catch {
      Alert.alert("Erro", 'Não foi possível buscar os otens.')
    }
  }

  const handleCreateItem = async () => {
    if (!description.trim()) {
      return Alert.alert('Adicionar', 'Informe a descrição para adicionar!')
    }

    const newItem = {
      id: generateId(),
      status: FilterStatus.PENDING,
      description
    }

    await add(newItem)
    await getItemsByStatus()
    
    Alert.alert("Adicionado", `Adicionado ${description}`)
    setStatus(FilterStatus.PENDING)
    setDescription('')

  }

  const handleRemoveItem = async (itemId: string) => {
    try {
      await remove(itemId)
      await getItemsByStatus()
    } catch  {
      Alert.alert("Remover", "Não foi possível remover.")
    }
  }

  const handleChangeStatus = async (itemId: string) => {
    try {
      await toggleStatus(itemId)
      await getItemsByStatus()
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar o status.")
    }
  }

  async function onClear() {
    try {
      await clear()
      setItems([])
    } catch {
      Alert.alert("Erro", "Não foi possível remover todos os itens.")
    }
  }

  const handleClear = () => {
    Alert.alert("Limpar", "Deseja remover todos?", [
      {text: "Não", style: 'cancel'},
      {text: "Sim", onPress: onClear},
    ])
  }

  useEffect(() => {
    getItemsByStatus()
  }, [status])

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo}/>
      <View style={styles.form}>
        <Input 
          placeholder='O que você precisa comprar?' 
          autoComplete='off' 
          onChangeText={setDescription}
          value={description}
        />
        <Button title='Entrar' onPress={handleCreateItem}/>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((filter) => (
            <Filter 
              key={filter} 
              status={filter} 
              isActive={status === filter}
              onPress={() => setStatus(filter)}
            />
          ))}

          <TouchableOpacity activeOpacity={0.6} style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          renderItem={({ item }) => (
            <Item 
              description={item.description} 
              status={item.status} 
              onPressRemove={() => handleRemoveItem(item.id)}
              onPressStatus={() => handleChangeStatus(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
        />
      </View>
    </View>
  );
}
