import {  TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'
import { styles } from './styles'
import { FilterStatus } from '@/types/FilterStatus'
import { StatusIcon } from '../StatusIcon'

type FilterProps = TouchableOpacityProps & {
  status: FilterStatus
  isActive?: boolean
}

export function Filter({status, isActive, ...props}: FilterProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, {opacity: isActive ? 1: 0.5}]} 
      activeOpacity={0.6}
      {...props}
    >
      <StatusIcon status={status}/>
      <Text style={styles.title}>
        {status === FilterStatus.DONE ? 'Comprados' : 'Pendentes'}
      </Text>
    </TouchableOpacity>
  )
}