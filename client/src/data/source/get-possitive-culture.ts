import PositiveCulture from '@mi/data/models/positive-culture'

export const getPositiveCultures = async (): Promise<PositiveCulture[]> => {
  return [
    {
      id: 1,
      image: '/images/5s.png',
      title: 'Budaya 5s',
    },
    {
      id: 2,
      image: '/images/7k.png',
      title: 'Budaya 7k',
    },
    {
      id: 3,
      image: '/images/bullying.png',
      title: 'Bullying',
    },
    {
      id: 4,
      image: '/images/literacy.png',
      title: 'Literasi',
    },
  ]
}

export const getPositiveCulture = async (
  id: number,
): Promise<PositiveCulture | undefined> => {
  const cultures = (await getPositiveCultures()).find((v) => v.id === id)
  return cultures
}
