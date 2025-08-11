import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "../StatusIcon";
import { Trash2Icon } from "lucide-react-native";

type ItemProps = {
  status: FilterStatus
  description: string
  onPressRemove?: () => void
  onPressStatus?: () => void
}

export function Item({description, status, onPressRemove, onPressStatus}: ItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressStatus} style={styles.status}>
        <StatusIcon status={status}/>
        <Text style={styles.description}>{description}</Text>
      </TouchableOpacity>
      

      <TouchableOpacity activeOpacity={0.8} onPress={onPressRemove}>
        <Trash2Icon size={18} color="#828282"/>
      </TouchableOpacity>
    </View>
  )
}