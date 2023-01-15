export const convertDate = (date: string) => {
	return new Date(Number(date)).toLocaleDateString('ru')
}