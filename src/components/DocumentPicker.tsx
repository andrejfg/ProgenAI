import { TouchableOpacity, ActivityIndicator, Text, View } from 'react-native'
import * as DocumentPickerExpo from 'expo-document-picker'
import { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import tw from '@/lib/tailwind'

interface DocumentPickerProps {
  setDocInfo: React.Dispatch<
    React.SetStateAction<DocumentPickerExpo.DocumentPickerAsset | null>
  >
}

export default function DocumentPicker({ setDocInfo }: DocumentPickerProps) {
  const [loading, setLoading] = useState(false)

  const pickDocument = async () => {
    setLoading(true)
    // Abre o seletor de documentos. Você pode adicionar opções como tipos de mime, etc.
    const result = await DocumentPickerExpo.getDocumentAsync({
      multiple: false,
      type: 'application/pdf',
    })

    // Se um documento foi escolhido, defina as informações do estado
    if (!result.canceled) {
      setDocInfo(result.assets[0])
    } else {
      setDocInfo(null)
    }
    setLoading(false)
  }

  return (
    <TouchableOpacity
      onPress={pickDocument}
      disabled={loading}
      activeOpacity={0.7}
      style={tw`h-32 w-52 items-center justify-center rounded-lg border border-slate-400 bg-white shadow-lg`}
    >
      {!loading ? (
        <View style={tw`flex-1 items-center justify-center`}>
          <MaterialIcons
            style={tw`text-5xl text-slate-500`}
            name="upload-file"
          />
          <Text style={tw`text-center font-robotoMono text-sm text-slate-400`}>
            *.pdf
          </Text>
        </View>
      ) : (
        <ActivityIndicator color="rgb(148 163 184)" size="large" />
      )}
    </TouchableOpacity>
  )
}
