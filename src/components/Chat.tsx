import tw from '@/lib/tailwind'
import responsePDF from '@/types/responsePDF'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, TextInputKeyPressEventData, View } from 'react-native'
import BalaoMensagem from './BalaoMensagem'
import useLoading from '@/hooks/useLoading'
import getRespostaGPT, { Mensagem } from '@/lib/api/getRespostaGPT'
import compareDate from '@/utils/compareDate'
import ChatInput from './ChatInput'

interface ChatProps {
  dataFromPDF: responsePDF
}

export default function Chat({ dataFromPDF }: ChatProps) {
  const {
    loading: digitando,
    startLoading: startDigitando,
    stopLoading: stopDigitando,
  } = useLoading()
  const [userInput, setUserInput] = useState<string>('')
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      dataHora: new Date(),
      role: 'system',
      texto:
        'Olá, sou o Dr. Roberto! Analisarei seu exame de sangue e em ' +
        'seguida poderá tirar duvidas a respeito da sua saúde. ',
    },
  ])
  const messagesRef = useRef<ScrollView>(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({ y: 99999, animated: true })
    }
  }, [mensagens])

  useEffect(() => {
    async function primeirasMensagens() {
      startDigitando()
      await assistenteResponde(dataFromPDF.prompt)
      stopDigitando()
    }
    primeirasMensagens()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function assistenteResponde(prompt: string) {
    startDigitando()
    const respostaAssistente = await getRespostaGPT([
      {
        role: 'system',
        dataHora: new Date(),
        texto:
          'Você deve se comportar como Dr. Roberto, que é um médico altamente qualificado e respeitado, ' +
          'com uma carreira que abrange mais de três décadas. Ele acumulou vasto conhecimento em várias ' +
          'especialidades médicas e tem uma abordagem holística da saúde. Seu método de atendimento é ' +
          'pautado na escuta ativa e na análise aprofundada dos sintomas e histórico do paciente. Se ' +
          'você está interagindo com Dr. Roberto, pode esperar uma consulta detalhada, embasada por ' +
          'anos de prática clínica e atualização constante.' +
          'você será submetido a informações de um exame de sangue de um paciente. ' +
          ' Você deve tirar as dúvidas sem preocupá-lo seriamente com relação a saúde e recomenda-lo a um médico caso seja necessário',
      },
      ...mensagens,
      {
        role: 'user',
        dataHora: new Date(),
        texto: prompt,
      },
    ])
    stopDigitando()
    if (respostaAssistente) {
      setMensagens((prev) => [
        ...prev,
        { ...respostaAssistente, dataHora: new Date() },
      ])
    }
  }

  function handleKeyDown(event: TextInputKeyPressEventData) {
    if (event.key === 'Enter') {
      sendMessage()
    }
  }

  async function sendMessage() {
    setMensagens((prev) => [
      ...prev,
      {
        texto: userInput,
        dataHora: new Date(),
        role: 'user',
      },
    ])
    setUserInput('')
    assistenteResponde(userInput)
  }

  return (
    <>
      <ScrollView ref={messagesRef} style={tw`flex-1`}>
        <View style={[tw`w-full flex-1 flex-col-reverse  gap-2 p-4 pb-2`]}>
          {digitando && <BalaoMensagem role="system" />}
          {mensagens &&
            mensagens
              .sort((a, b) => compareDate(b.dataHora, a.dataHora))
              .map((mensagem) => (
                <BalaoMensagem
                  key={mensagem.dataHora + mensagem.role}
                  role={mensagem.role}
                  dataHora={mensagem.dataHora}
                  texto={mensagem.texto}
                />
              ))}
        </View>
      </ScrollView>
      <View style={tw`w-full px-2 pb-2`}>
        <ChatInput
          disable={digitando}
          userInput={userInput}
          setUserInput={setUserInput}
          sendMessage={sendMessage}
          handleKeyDown={handleKeyDown}
        />
      </View>
    </>
  )
}
