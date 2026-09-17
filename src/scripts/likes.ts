const toggle = (button: HTMLElement): void => {
  const counter = button
    .closest('[data-like-group]')
    ?.querySelector<HTMLElement>('[data-like-count]')

  if (counter === null || counter === undefined) return

  const current = Number.parseInt(counter.textContent ?? '', 10)

  if (Number.isNaN(current)) return

  const liked = button.getAttribute('aria-pressed') === 'true'

  button.setAttribute('aria-pressed', liked ? 'false' : 'true')
  counter.textContent = String(liked ? current - 1 : current + 1)
}

export function initLikes(): void {
  document.querySelectorAll<HTMLElement>('[data-like]').forEach((button) => {
    button.addEventListener('click', () => {
      toggle(button)
    })
  })
}
