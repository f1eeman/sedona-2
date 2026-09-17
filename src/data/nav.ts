export interface NavLink {
  href: string
  label: string
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Главная' },
  { href: '/photo/', label: 'Фото и видео' },
  { href: '/form/', label: 'Форма отзыва' },
  { href: '/hotels/', label: 'Гостиницы' },
]
