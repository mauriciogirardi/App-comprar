import {TextInput, TextInputProps} from 'react-native'
import { styles } from './styles'

type TInputProps = TextInputProps

export function Input({ ...props}: TInputProps) {
  return <TextInput style={styles.container} {...props}/>
}