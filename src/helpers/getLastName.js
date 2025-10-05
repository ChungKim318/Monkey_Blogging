export function getLastName(name) {
  if (!name) return 'Guest'
  const length = name.split(' ').length
  return name.split(' ')[length - 1]
}
