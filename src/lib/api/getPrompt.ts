/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentPickerAsset } from 'expo-document-picker'
import { api } from '../api'
import responsePDF from '@/types/responsePDF'

export default async function getPrompt(
  file: DocumentPickerAsset,
): Promise<responsePDF> {
  const form = new FormData()
  form.append('file', {
    uri: file.uri,
    name: file.name,
    type: file.mimeType,
  } as any)

  const response = await api
    .post<responsePDF>('/progenai/blood', form, {
      headers: {
        'Content-Type': 'multipart/form-data', // axios deve definir o boundary automaticamente
      },
    })
    .catch((e) => {
      throw e
    })
  if (response) return response.data
  else throw Error
}
