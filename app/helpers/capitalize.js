export const capitalize = (str) => {
  return str.split('_')
    .map(str =>
      str.charAt(0).toUpperCase() + str.slice(1))
    .join(' ')
}