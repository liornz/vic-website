export const convertUrl = (url: string) => {
	return url.replaceAll('/', '*slash*').replaceAll('.', '*dot*')
  }

  export const reconstructUrl = (url: string) => {
	return `https://${url.replaceAll('*slash*', '/').replaceAll('*dot*', '.')}`
  }