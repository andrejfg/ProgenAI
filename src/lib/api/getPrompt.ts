/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentPickerAsset } from 'expo-document-picker'
import { api } from '../api'
import responsePDF from '@/types/responsePDF'

export default async function getPrompt(
  file: DocumentPickerAsset,
): Promise<responsePDF> {
  try {
    const form = new FormData()
    form.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType,
    } as any)

    const response = await api.post<responsePDF>('/progenai/blood', form, {
      headers: {
        'Content-Type': 'multipart/form-data', // axios deve definir o boundary automaticamente
      },
    })

    return response.data
  } catch (error) {
    // Se houver algum erro na requisição, ele será capturado aqui.
    console.error('Erro ao enviar o arquivo:', error)

    // Você pode querer lidar com erros específicos ou repassar o erro para ser tratado em outro lugar.
    throw error // Isto irá interromper a execução desta função e passar o erro para o próximo manipulador na cadeia de promessas.
  }
}
