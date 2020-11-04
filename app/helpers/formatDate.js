function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

export const formatDate = (date) => {
  if(!isValidDate(date)) return null
  const year = date.getFullYear()
  let month = date.getMonth() + 1 + ''
  let day = date.getDate() + ''
  const time = date.toLocaleTimeString()

  if(month.length === 1) month = '0' + month
  if(day.length === 1) day = '0' + day

  const formatted = `${year}-${month}-${day}, ${time}`
  return formatted
}