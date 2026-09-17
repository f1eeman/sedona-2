const EASING = 'cubic-bezier(0.22, 0.61, 0.36, 1)'
const DURATION = 340

export type Placement = Map<HTMLElement, DOMRect>

export function measure(items: HTMLElement[]): Placement {
  const places: Placement = new Map()

  items.forEach((item) => {
    places.set(item, item.getBoundingClientRect())
  })

  return places
}

export function replay(places: Placement): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  places.forEach((from, item) => {
    if (item.hidden) return

    const to = item.getBoundingClientRect()
    const shiftX = from.left - to.left
    const shiftY = from.top - to.top

    if (Math.abs(shiftX) < 1 && Math.abs(shiftY) < 1) return

    item.animate(
      [
        { translate: `${String(shiftX)}px ${String(shiftY)}px` },
        { translate: '0 0' },
      ],
      { duration: DURATION, easing: EASING },
    )
  })
}
