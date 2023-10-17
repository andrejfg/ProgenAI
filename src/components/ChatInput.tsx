import tw from '@/lib/tailwind'
import { FontAwesome } from '@expo/vector-icons'
import {
  View,
  TextInput,
  TouchableOpacity,
  TextInputKeyPressEventData,
} from 'react-native'

interface ChatInputProps {
  disable: boolean
  userInput: string
  setUserInput: React.Dispatch<React.SetStateAction<string>>
  sendMessage: () => Promise<void>
  handleKeyDown: (e: TextInputKeyPressEventData) => void
}

export default function ChatInput({
  disable,
  userInput,
  setUserInput,
  sendMessage,
  handleKeyDown,
}: ChatInputProps) {
  const regex = /^\s*$/
  return (
    <View
      style={tw`h-16 w-full flex-row items-center justify-center gap-2 rounded-full p-2`}
    >
      <View
        style={tw`h-full flex-1 justify-center rounded-full bg-white px-4 shadow-lg`}
      >
        <TextInput
          value={userInput}
          onChangeText={setUserInput}
          cursorColor={'#363636'}
          onKeyPress={(e) => handleKeyDown(e.nativeEvent)}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => sendMessage()}
        disabled={userInput === '' || regex.test(userInput) || disable}
        style={tw`bg-chat-send-button h-12 w-12 items-center justify-center rounded-full shadow-lg`}
      >
        <FontAwesome
          style={tw`text-chat-send-icon -ml-1 text-xl`}
          name="send"
        />
      </TouchableOpacity>
    </View>
  )
}
