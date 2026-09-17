export interface Photo {
  title: string
  author: string
  likes: number
  image: string
  size: 'full' | 'small'
  shade: boolean
}

export const PHOTOS: Photo[] = [
  {
    title: 'Неродные просторы',
    author: 'Антон',
    likes: 1359,
    image: 'photo-sunset',
    size: 'full',
    shade: false,
  },
  {
    title: 'Местная растительность',
    author: 'Сергей',
    likes: 365,
    image: 'photo-cactus',
    size: 'small',
    shade: false,
  },
  {
    title: 'Дорога на север',
    author: 'Петр',
    likes: 522,
    image: 'photo-roads',
    size: 'small',
    shade: true,
  },
  {
    title: 'Дерзкий мост',
    author: 'Матвей',
    likes: 762,
    image: 'photo-bridge',
    size: 'small',
    shade: false,
  },
]
