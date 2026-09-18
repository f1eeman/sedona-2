export type PhotoId = 'sunset' | 'cactus' | 'roads' | 'bridge'

export interface Photo {
  id: PhotoId
  likes: number
  image: string
  size: 'full' | 'small'
  shade: boolean
}

export const PHOTOS: Photo[] = [
  {
    id: 'sunset',
    likes: 1359,
    image: 'photo-sunset',
    size: 'full',
    shade: false,
  },
  {
    id: 'cactus',
    likes: 365,
    image: 'photo-cactus',
    size: 'small',
    shade: false,
  },
  {
    id: 'roads',
    likes: 522,
    image: 'photo-roads',
    size: 'small',
    shade: true,
  },
  {
    id: 'bridge',
    likes: 762,
    image: 'photo-bridge',
    size: 'small',
    shade: false,
  },
]
