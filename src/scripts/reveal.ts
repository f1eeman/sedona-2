const MARGIN = '0px 0px -12% 0px'

export function initReveal(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]

  if (items.length === 0) return

  document.documentElement.dataset['reveal'] = ''

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        const item = entry.target

        if (!(item instanceof HTMLElement)) return

        item.dataset['revealed'] = ''
        observer.unobserve(item)
      })
    },
    { rootMargin: MARGIN },
  )

  items.forEach((item) => {
    observer.observe(item)
  })
}
