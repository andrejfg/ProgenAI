import { View, Text, ActivityIndicator } from 'react-native'
import DocumentPicker from '@/components/DocumentPicker'
import { DocumentPickerAsset } from 'expo-document-picker'
import tw from '@/lib/tailwind'
import { useCallback, useEffect, useRef, useState } from 'react'
import getPrompt from '@/lib/api/getPrompt'
import { router } from 'expo-router'
import { useAtom } from 'jotai'
import { data } from 'atom'
import { Image } from 'expo-image'
import Logo from '@/assets/images/LogoIAPLUS_black.png'
import Toast from 'react-native-root-toast'
import { api } from '@/lib/api'

export default function HomeScreen() {
  const [docInfo, setDocInfo] = useState<DocumentPickerAsset | null>(null)
  const [loading, setLoading] = useState(false)
  const [serverDisponivel, setServerDisponivel] = useState(false)
  const [, setDataFromPDF] = useAtom(data)

  const intervalRef = useRef<NodeJS.Timeout>()

  const tryConnection = useCallback(() => {
    api
      .get('/server')
      .then(() => {
        setServerDisponivel(true)
        clearInterval(intervalRef.current)
      })
      .catch(() => semComunicacao)
  }, [])

  useEffect(() => {
    async function readPDFtoPrompt(docInfo: DocumentPickerAsset) {
      setLoading(true)
      await getPrompt(docInfo)
        .then((response) => {
          setDataFromPDF(response)
          setLoading(false)
          router.push('/chat')
        })
        .catch((e) => {
          setLoading(false)
          Toast.show(e.response.data.error, {
            position: Toast.positions.CENTER,
            backgroundColor: 'red',
            duration: Toast.durations.SHORT,
          })
        })
    }
    tryConnection()
    if (docInfo && serverDisponivel) {
      readPDFtoPrompt(docInfo)
      setDocInfo(null)
    } else {
      setDocInfo(null)
    }
  }, [docInfo, serverDisponivel, setDataFromPDF, tryConnection])

  function semComunicacao() {
    Toast.show('Sem comunicação com o servidor', {
      position: Toast.positions.CENTER,
      backgroundColor: 'red',
      duration: Toast.durations.SHORT,
    })
  }

  useEffect(() => {
    intervalRef.current = setInterval(function () {
      tryConnection()
    }, 1000)

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [tryConnection])

  return (
    <View style={tw`flex-1 justify-between bg-white`}>
      <View style={tw`items-center justify-center gap-2`}>
        <View style={tw`my-8`}>
          <Text style={tw`text-center font-robotoMono text-xl`}>Bem vindo</Text>
          <Text style={tw`text-center font-robotoMono text-xl`}>ao</Text>
          <Text style={tw`text-center font-space text-4xl`}> ProgenAI</Text>
        </View>
        <View style={tw`items-center gap-8`}>
          <Text style={tw`text-center font-robotoMono text-base`}>
            Selecione um exame de sangue criado pelo Progenos
          </Text>
          <DocumentPicker setDocInfo={setDocInfo} />
        </View>
      </View>
      <View style={tw`h-16 w-full flex-row items-center justify-center gap-2`}>
        <Text style={tw`text-center font-robotoMono text-sm`}>Criado pela</Text>
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
