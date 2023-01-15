export const formatUrlUploads = (string: string) => {
  const arrayString = string.split('/')
  const resultString = arrayString[arrayString.length - 1]
  return resultString.split('.')[0]
}