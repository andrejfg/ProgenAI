import { View, Text, ActivityIndicator } from 'react-native'
import DocumentPicker from '@/components/DocumentPicker'
import { DocumentPickerAsset } from 'expo-document-picker'
import tw from '@/lib/tailwind'
import { useEffect, useState } from 'react'
import getPrompt from '@/lib/api/getPrompt'
import { router } from 'expo-router'
import { useAtom } from 'jotai'
import { data } from 'atom'
import { Image } from 'expo-image'
import Logo from '@/assets/images/LogoIAPLUS_black.png'

export default function HomeScreen() {
  const [docInfo, setDocInfo] = useState<DocumentPickerAsset | null>(null)
  const [loading, setLoading] = useState(false)
  const [, setDataFromPDF] = useAtom(data)

  useEffect(() => {
    async function readPDFtoPrompt(docInfo: DocumentPickerAsset) {
      setLoading(true)
      setDataFromPDF(await getPrompt(docInfo))
      router.push('/chat')
      setLoading(false)
    }

    if (docInfo) {
      readPDFtoPrompt(docInfo)
      setDocInfo(null)
    }
  }, [docInfo, setDataFromPDF])

  return (
    <View style={tw`flex-1 justify-between bg-white`}>
      <View style={tw`items-center justify-center gap-2 px-4 py-8`}>
        <View style={tw`my-8`}>
          <Text style={tw`font-robotoMono text-center text-xl`}>Bem vindo</Text>
          <Text style={tw`font-robotoMono text-center text-xl`}>ao</Text>
          <Text style={tw`text-center font-space text-4xl`}> ProgenAI</Text>
        </View>
        <View style={tw`items-center gap-8`}>
          <Text style={tw`font-robotoMono text-center text-base`}>
            Selecione um exame de sangue criado pelo Progenos
          </Text>
          <DocumentPicker setDocInfo={setDocInfo} />
        </View>
      </View>
      <View style={tw`h-16 w-full flex-row items-center justify-center gap-2`}>
        <Text style={tw`font-robotoMono text-center text-sm`}>Criado pela</Text>
        <Image
          style={tw`h-10 w-20`}
          contentFit="contain"
          source={Logo}
          alt="IAPlus"
        />
      </View>
      {loading && (
        <View
          style={tw`absolute z-20 h-full w-full items-center justify-center`}
        >
          <View
            style={tw`h-32 w-56 items-center justify-center bg-white shadow-2xl`}
          >
            <Text style={tw`text-center font-space`}>Carregando PDF</Text>
            <ActivityIndicator size="small" />
          </View>
        </View>
      )}
    </View>
  )
}
