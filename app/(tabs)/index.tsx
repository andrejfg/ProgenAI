import { MonoText } from '@/components/StyledText'
import tw from '@/lib/tailwind'
import { View, Text } from 'react-native'

export default function TabOneScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center gap-2`}>
      <Text style={tw`text-xl font-bold`}>Tab One</Text>
      <MonoText style={tw`text-base`}>Tab One Info</MonoText>
    </View>
  )
}
