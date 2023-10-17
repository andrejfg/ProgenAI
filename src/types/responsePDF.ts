export default interface responsePDF {
  exameDeSangue: {
    medico: string
    id: string
    nascimento: string
    etnia: string
    sexo: string
    data: string
    nome: string
    exame: string[]
  }
  prompt: string
}
