import tw from '@/lib/tailwind'
import responsePDF from '@/types/responsePDF'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { View, TouchableOpacity, Text } from 'react-native'

export default function HeaderChat({ exameDeSangue }: responsePDF) {
  return (
    <View
      style={tw`w-full flex-row items-center gap-2 bg-white p-4 pt-10 shadow-md`}
    >
      <TouchableOpacity
        onPress={router.back}
        style={tw`items-center justify-center p-1`}
      >
        <MaterialIcons name="arrow-back-ios" style={tw`text-xl`} />
      </TouchableOpacity>
      <View>
        <Text style={tw`font-space text-base`}>{exameDeSangue.nome}</Text>
        <Text style={tw`font-space text-sm`}>{exameDeSangue.data}</Text>
      </View>
    </View>
  )
}
