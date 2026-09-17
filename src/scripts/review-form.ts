type Field = HTMLInputElement | HTMLTextAreaElement

const INVALID = 'aria-invalid'

let lastFocused: HTMLElement | null = null

const close = (modal: HTMLElement): void => {
  modal.hidden = true
  modal.classList.remove('is-shown')

  const invalid = document.querySelector<HTMLElement>('[aria-invalid="true"]')

  if (modal.dataset['modal'] === 'error' && invalid !== null) {
    invalid.focus()
  } else {
    lastFocused?.focus()
  }

  lastFocused = null
}

const open = (modal: HTMLElement): void => {
  lastFocused = document.activeElement as HTMLElement | null

  modal.hidden = false
  modal.classList.remove('is-shown')
  void modal.offsetWidth
  modal.classList.add('is-shown')
  modal.querySelector<HTMLButtonElement>('[data-modal-close]')?.focus()
}

const closeAll = (): void => {
  document
    .querySelectorAll<HTMLElement>('[data-modal]:not([hidden])')
    .forEach(close)
}

const initModals = (): void => {
  document.querySelectorAll<HTMLElement>('[data-modal]').forEach((modal) => {
    modal
      .querySelector<HTMLButtonElement>('[data-modal-close]')
      ?.addEventListener('click', () => {
        close(modal)
      })
  })

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return

    closeAll()
  })
}

export function initReviewForm(): void {
  const form = document.querySelector<HTMLFormElement>('[data-review-form]')

  if (form === null) return

  const error = document.querySelector<HTMLElement>('[data-modal="error"]')
  const success = document.querySelector<HTMLElement>('[data-modal="success"]')

  if (error === null || success === null) return

  initModals()

  const fields = [...form.querySelectorAll<Field>('[data-required]')]

  fields.forEach((field) => {
    field.addEventListener('focus', () => {
      field.removeAttribute(INVALID)
    })
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const empty = fields.filter((field) => field.value.trim() === '')

    if (empty.length === 0) {
      form.reset()
      open(success)
      return
    }

    empty.forEach((field) => {
      field.setAttribute(INVALID, 'true')
    })

    open(error)
  })
}
