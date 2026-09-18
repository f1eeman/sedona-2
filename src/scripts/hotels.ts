import { measure, replay } from '@/scripts/flip'

type SortKey = 'price' | 'kind' | 'rating'
type Direction = 'asc' | 'desc'

interface Catalog {
  form: HTMLFormElement
  list: HTMLElement
  cards: HTMLElement[]
  count: HTMLElement
  empty: HTMLElement
  from: HTMLInputElement
  to: HTMLInputElement
}

const checkedValues = (form: HTMLFormElement, name: string): string[] =>
  [...form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`)]
    .filter((input) => input.checked)
    .map((input) => input.value)

const numberOf = (input: HTMLInputElement, fallback: number): number => {
  const value = Number.parseInt(input.value, 10)

  return Number.isNaN(value) ? fallback : value
}

const compare = (a: HTMLElement, b: HTMLElement, key: SortKey): number => {
  if (key === 'kind') {
    const tag =
      document.querySelector<HTMLElement>('[data-hotels-list]')?.dataset[
        'locale'
      ]

    return (a.dataset['kindLabel'] ?? '').localeCompare(
      b.dataset['kindLabel'] ?? '',
      tag,
    )
  }

  const field = key === 'price' ? 'price' : 'rating'

  return Number(a.dataset[field]) - Number(b.dataset[field])
}

const pressOnly = (buttons: HTMLElement[], active: HTMLElement): void => {
  buttons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button === active))
  })
}

const catalogOf = (): Catalog | null => {
  const form = document.querySelector<HTMLFormElement>('[data-hotels-filter]')
  const list = document.querySelector<HTMLElement>('[data-hotels-list]')
  const count = document.querySelector<HTMLElement>('[data-hotels-count]')
  const empty = document.querySelector<HTMLElement>('[data-hotels-empty]')

  if (form === null || list === null || count === null || empty === null) {
    return null
  }

  const from = form.querySelector<HTMLInputElement>('[data-price-from]')
  const to = form.querySelector<HTMLInputElement>('[data-price-to]')

  if (from === null || to === null) return null

  return {
    form,
    list,
    cards: [...list.querySelectorAll<HTMLElement>('[data-hotel]')],
    count,
    empty,
    from,
    to,
  }
}

export function initHotels(): void {
  const catalog = catalogOf()

  if (catalog === null) return

  const min = numberOf(catalog.from, 0)
  const max = numberOf(catalog.to, 0)

  let key: SortKey = 'price'
  let direction: Direction = 'asc'

  const apply = (interactive = true): void => {
    const anchor = catalog.form.getBoundingClientRect().top
    const places = measure(catalog.cards.filter((card) => !card.hidden))
    const facilities = checkedValues(catalog.form, 'facility')
    const kinds = checkedValues(catalog.form, 'kind')
    const from = numberOf(catalog.from, min)
    const to = numberOf(catalog.to, max)

    const visible = catalog.cards.filter((card) => {
      const price = Number(card.dataset['price'])
      const own = (card.dataset['facilities'] ?? '').split(' ')

      const matches =
        kinds.includes(card.dataset['kind'] ?? '') &&
        facilities.every((facility) => own.includes(facility)) &&
        price >= Math.min(from, to) &&
        price <= Math.max(from, to)

      card.hidden = !matches

      return matches
    })

    visible
      .sort((a, b) => (direction === 'asc' ? 1 : -1) * compare(a, b, key))
      .forEach((card) => {
        catalog.list.append(card)
      })

    catalog.count.textContent = String(visible.length)
    catalog.empty.hidden = visible.length > 0

    if (interactive) {
      const shift = catalog.form.getBoundingClientRect().top - anchor

      if (Math.abs(shift) >= 1) {
        window.scrollBy({ top: shift, behavior: 'instant' })
      }
    }

    replay(places)
  }

  const sortButtons = [...document.querySelectorAll<HTMLElement>('[data-sort]')]
  const directionButtons = [
    ...document.querySelectorAll<HTMLElement>('[data-direction]'),
  ]

  sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
      key = (button.dataset['sort'] ?? 'price') as SortKey
      pressOnly(sortButtons, button)
      apply()
    })
  })

  directionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      direction = (button.dataset['direction'] ?? 'asc') as Direction
      pressOnly(directionButtons, button)
      apply()
    })
  })

  catalog.form.addEventListener('change', () => {
    apply()
  })
  catalog.form.addEventListener('submit', (event) => {
    event.preventDefault()
    apply()
  })

  apply(false)
}
