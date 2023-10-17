import tw from '@/lib/tailwind'
import formatDate from '@/utils/formatDate'
import { View, Text, TouchableOpacity } from 'react-native'
import { useDeviceContext } from 'twrnc'
import * as Clipboard from 'expo-clipboard'
import Toast from 'react-native-root-toast'

interface BalaoMensagemProps {
  dataHora?: Date
  role: string
  texto?: string
}

export default function BalaoMensagem({
  texto,
  dataHora,
  role,
}: BalaoMensagemProps) {
  useDeviceContext(tw)

  const copyToClipboard = async () => {
    if (texto) {
      await Clipboard.setStringAsync(texto)
      Toast.show('Mensagem Copiada', {
        position: -75,
        backgroundColor: 'gray',
        duration: Toast.durations.SHORT,
      })
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onLongPress={copyToClipboard}
      style={[
        tw`flex-row`,
        role === 'user' && tw` self-end`,
        role === 'system' && tw`self-start`,
      ]}
    >
      {role === 'system' && (
        <View style={[tw`bg-balloon-system h-2 w-2 rounded-bl-full`]} />
      )}
      <View
        style={[
          tw`min-h-10 flex-row items-center justify-between p-1.5`,
          role === 'user' &&
            tw`bg-balloon-user self-end rounded-l-lg rounded-br-lg`,
          role === 'system' &&
            tw`bg-balloon-system self-start rounded-r-lg rounded-bl-lg`,
        ]}
      >
        <View
          style={[
            tw`max-w-4/5 min-w-8 p-1.5`,
            role === 'user' && tw`self-end`,
            role === 'system' && tw`self-start`,
          ]}
        >
          {texto ? (
            <Text style={[tw` text-light-c10_alt`]}>{texto}</Text>
          ) : (
            <Text style={[tw` text-light-c10_alt text-xl font-bold`]}>...</Text>
          )}
        </View>
        <View style={tw`self-end  p-1`}>
          {dataHora && (
            <Text
              style={[
                tw` text-xs`,
                role === 'user' && tw`text-balloon-date-user`,
                role === 'system' && tw`text-balloon-date-system`,
              ]}
            >
              {formatDate(dataHora)}
            </Text>
          )}
        </View>
      </View>
      {role === 'user' && (
        <View style={[tw`bg-balloon-user h-2 w-2 rounded-br-full`]} />
      )}
    </TouchableOpacity>
  )
}
