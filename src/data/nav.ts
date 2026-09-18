export type NavKey = 'index' | 'photo' | 'form' | 'hotels'

export const NAV_KEYS: NavKey[] = ['index', 'photo', 'form', 'hotels']

export const NAV_HREF: Record<NavKey, string> = {
  index: '/',
  photo: '/photo/',
  form: '/form/',
  hotels: '/hotels/',
}
