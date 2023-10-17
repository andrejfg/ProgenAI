import { api } from '../api'

export interface Mensagem {
  dataHora: Date
  role: string
  texto: string
}

export default async function getRespostaGPT(body: Mensagem[]) {
  const data = await api.post(`/chat`, body).then((response) => response.data)
  return data.at(-1)
}
