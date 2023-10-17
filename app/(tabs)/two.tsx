import { View, Text } from 'react-native'
import tw from '@/lib/tailwind'
import React from 'react'
import { MonoText } from '@/components/StyledText'

export default function TabTwoScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-xl font-bold`}>Tab Two</Text>
      <MonoText style={tw`text-base`}>Tab Two Info</MonoText>
    </View>
  )
}
