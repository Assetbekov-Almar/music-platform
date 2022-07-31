export const formatDate = (date: string) => {
	const dateWithoutTime = date.substring(0, date.indexOf('T'))

	const dateArray = dateWithoutTime.split('-')

	const formattedDate = new Date([...dateArray].join(','))
	const month = formattedDate.toLocaleString('en-US', { month: 'short' })
	const year = formattedDate.getFullYear()
	const day = formattedDate.getDate()
	return month + ' ' + day + ', ' + year
}
