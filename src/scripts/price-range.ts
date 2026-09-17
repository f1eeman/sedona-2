interface Range {
  root: HTMLElement
  from: HTMLInputElement
  to: HTMLInputElement
  fieldFrom: HTMLInputElement
  fieldTo: HTMLInputElement
  min: number
  max: number
  step: number
}

const THUMB = 20

const numberOf = (value: string, fallback: number): number => {
  const parsed = Number.parseInt(value, 10)

  return Number.isNaN(parsed) ? fallback : parsed
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)

const rangeOf = (): Range | null => {
  const root = document.querySelector<HTMLElement>('[data-price-range]')
  const fieldFrom =
    document.querySelector<HTMLInputElement>('[data-price-from]')
  const fieldTo = document.querySelector<HTMLInputElement>('[data-price-to]')

  if (root === null || fieldFrom === null || fieldTo === null) return null

  const from = root.querySelector<HTMLInputElement>('[data-price-range-from]')
  const to = root.querySelector<HTMLInputElement>('[data-price-range-to]')

  if (from === null || to === null) return null

  return {
    root,
    from,
    to,
    fieldFrom,
    fieldTo,
    min: numberOf(from.min, 0),
    max: numberOf(from.max, 0),
    step: numberOf(from.step, 1),
  }
}

export function initPriceRange(): void {
  const range = rangeOf()

  if (range === null) return

  const span = range.max - range.min || 1

  const paint = (from: number, to: number): void => {
    range.root.style.setProperty(
      '--from-pct',
      String(((from - range.min) / span) * 100),
    )
    range.root.style.setProperty(
      '--to-pct',
      String(((to - range.min) / span) * 100),
    )
  }

  const write = (from: number, to: number): void => {
    range.from.value = String(from)
    range.to.value = String(to)
    range.fieldFrom.value = String(from)
    range.fieldTo.value = String(to)
    paint(from, to)
  }

  const read = (): { from: number; to: number } => ({
    from: numberOf(range.from.value, range.min),
    to: numberOf(range.to.value, range.max),
  })

  const settle = (from: number, to: number, leading: 'from' | 'to'): void => {
    const safeFrom = clamp(from, range.min, range.max)
    const safeTo = clamp(to, range.min, range.max)

    if (safeFrom > safeTo) {
      if (leading === 'from') {
        write(safeFrom, safeFrom)
      } else {
        write(safeTo, safeTo)
      }

      return
    }

    write(safeFrom, safeTo)
  }

  const valueAt = (clientX: number): number => {
    const rect = range.root.getBoundingClientRect()
    const usable = rect.width - THUMB || 1
    const ratio = clamp((clientX - rect.left - THUMB / 2) / usable, 0, 1)

    return (
      clamp(
        Math.round((range.min + ratio * span) / range.step) * range.step,
        range.min,
        range.max,
      ) || range.min
    )
  }

  const announce = (input: HTMLInputElement): void => {
    input.dispatchEvent(new Event('change', { bubbles: true }))
  }

  let dragging: 'from' | 'to' | null = null

  range.root.addEventListener('pointerdown', (event) => {
    const value = valueAt(event.clientX)
    const { from, to } = read()

    dragging =
      Math.abs(value - from) < Math.abs(value - to)
        ? 'from'
        : Math.abs(value - from) > Math.abs(value - to)
          ? 'to'
          : value < from
            ? 'from'
            : 'to'

    range.root.setPointerCapture(event.pointerId)
    ;(dragging === 'from' ? range.from : range.to).focus()

    if (dragging === 'from') {
      settle(value, to, 'from')
    } else {
      settle(from, value, 'to')
    }

    event.preventDefault()
  })

  range.root.addEventListener('pointermove', (event) => {
    if (dragging === null) return

    const value = valueAt(event.clientX)
    const { from, to } = read()

    if (dragging === 'from') {
      settle(value, to, 'from')
    } else {
      settle(from, value, 'to')
    }
  })

  const drop = (event: PointerEvent): void => {
    if (dragging === null) return

    const input = dragging === 'from' ? range.from : range.to

    dragging = null
    range.root.releasePointerCapture(event.pointerId)
    announce(input)
  }

  range.root.addEventListener('pointerup', drop)
  range.root.addEventListener('pointercancel', drop)

  range.from.addEventListener('input', () => {
    if (dragging !== null) return

    const { from, to } = read()

    settle(from, to, 'from')
  })

  range.to.addEventListener('input', () => {
    if (dragging !== null) return

    const { from, to } = read()

    settle(from, to, 'to')
  })

  range.fieldFrom.addEventListener('input', () => {
    settle(
      numberOf(range.fieldFrom.value, range.min),
      numberOf(range.fieldTo.value, range.max),
      'from',
    )
  })

  range.fieldTo.addEventListener('input', () => {
    settle(
      numberOf(range.fieldFrom.value, range.min),
      numberOf(range.fieldTo.value, range.max),
      'to',
    )
  })

  settle(
    numberOf(range.fieldFrom.value, range.min),
    numberOf(range.fieldTo.value, range.max),
    'to',
  )
}
