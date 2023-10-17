export default function formatDate(data: Date) {
  const newDate = new Date(data as Date)
  const hours = newDate.getHours().toString()
  const minutes = newDate.getMinutes().toString()
  return `${hours.length === 1 ? '0' + hours : hours}:${
    minutes.length === 1 ? '0' + minutes : minutes
  }`
}
