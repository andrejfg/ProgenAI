export default function compareDate(a: Date | string, b: Date | string) {
  const aDate = new Date(a)
  const bDate = new Date(b)
  return +aDate - +bDate
}
