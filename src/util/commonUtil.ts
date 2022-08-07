export function getCurrentSeason () {
  const today = new Date()
  return today.getMonth() + 1 >= 8 ? today.getFullYear() : today.getFullYear() - 1
}
