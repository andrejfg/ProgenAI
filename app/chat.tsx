import { useAtom } from 'jotai'
import { data } from 'atom'
import Chat from '@/components/Chat'
import { View, Text, TouchableOpacity } from 'react-native'
import tw from '@/lib/tailwind'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import HeaderChat from '@/components/HeaderChat'

export default function ChatScreen() {
  const [dataFromPDF] = useAtom(data)

  return (
    <View style={tw`flex-1`}>
      {dataFromPDF && (
        <>
          <HeaderChat {...dataFromPDF} />
          <Chat dataFromPDF={dataFromPDF} />
        </>
      )}
    </View>
  )
}
