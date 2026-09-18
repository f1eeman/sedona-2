interface Player {
  root: HTMLElement
  media: HTMLVideoElement
  toggle: HTMLButtonElement
  toggleLabel: HTMLElement
  replay: HTMLButtonElement
  progress: HTMLInputElement
  sound: HTMLButtonElement
  soundLabel: HTMLElement
  fullscreen: HTMLButtonElement
  labelPlay: string
  labelPause: string
  labelSoundOn: string
  labelSoundOff: string
}

const SCALE = 1000

const playerOf = (): Player | null => {
  const root = document.querySelector<HTMLElement>('[data-player]')

  if (root === null) return null

  const media = root.querySelector<HTMLVideoElement>('[data-player-media]')
  const toggle = root.querySelector<HTMLButtonElement>('[data-player-toggle]')
  const toggleLabel = root.querySelector<HTMLElement>(
    '[data-player-toggle-label]',
  )
  const replay = root.querySelector<HTMLButtonElement>('[data-player-replay]')
  const progress = root.querySelector<HTMLInputElement>(
    '[data-player-progress]',
  )
  const sound = root.querySelector<HTMLButtonElement>('[data-player-sound]')
  const soundLabel = root.querySelector<HTMLElement>(
    '[data-player-sound-label]',
  )
  const fullscreen = root.querySelector<HTMLButtonElement>(
    '[data-player-fullscreen]',
  )

  const labelPlay = root.dataset['playerLabelPlay']
  const labelPause = root.dataset['playerLabelPause']
  const labelSoundOn = root.dataset['playerLabelSoundOn']
  const labelSoundOff = root.dataset['playerLabelSoundOff']

  if (
    media === null ||
    toggle === null ||
    toggleLabel === null ||
    replay === null ||
    progress === null ||
    sound === null ||
    soundLabel === null ||
    fullscreen === null ||
    labelPlay === undefined ||
    labelPause === undefined ||
    labelSoundOn === undefined ||
    labelSoundOff === undefined
  ) {
    return null
  }

  return {
    root,
    media,
    toggle,
    toggleLabel,
    replay,
    progress,
    sound,
    soundLabel,
    fullscreen,
    labelPlay,
    labelPause,
    labelSoundOn,
    labelSoundOff,
  }
}

export function initVideo(): void {
  const player = playerOf()

  if (player === null) return

  let scrubbing = false

  const paint = (ratio: number): void => {
    player.root.style.setProperty('--played', String(ratio))
  }

  const syncState = (): void => {
    const playing = !player.media.paused && !player.media.ended

    player.root.dataset['state'] = playing ? 'playing' : 'paused'
    player.toggleLabel.textContent = playing
      ? player.labelPause
      : player.labelPlay
  }

  const syncSound = (): void => {
    if (player.media.muted) {
      player.root.dataset['muted'] = ''
      player.soundLabel.textContent = player.labelSoundOn
    } else {
      delete player.root.dataset['muted']
      player.soundLabel.textContent = player.labelSoundOff
    }
  }

  const ratioOf = (): number =>
    player.media.duration > 0
      ? player.media.currentTime / player.media.duration
      : 0

  player.toggle.addEventListener('click', () => {
    if (player.media.paused) {
      void player.media.play()
    } else {
      player.media.pause()
    }
  })

  player.media.addEventListener('click', () => {
    player.toggle.click()
  })

  player.replay.addEventListener('click', () => {
    player.media.currentTime = 0
    void player.media.play()
  })

  player.sound.addEventListener('click', () => {
    player.media.muted = !player.media.muted
    syncSound()
  })

  let parked = 0

  player.fullscreen.addEventListener('click', () => {
    if (document.fullscreenElement === null) {
      parked = window.scrollY
      void player.root.requestFullscreen()
    } else {
      void document.exitFullscreen()
    }
  })

  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement !== null) return

    requestAnimationFrame(() => {
      window.scrollTo({ top: parked, behavior: 'instant' })
    })
  })

  player.media.addEventListener('play', syncState)
  player.media.addEventListener('pause', syncState)
  player.media.addEventListener('ended', syncState)

  player.media.addEventListener('timeupdate', () => {
    if (scrubbing) return

    const ratio = ratioOf()

    paint(ratio)
    player.progress.value = String(Math.round(ratio * SCALE))
  })

  player.progress.addEventListener('pointerdown', () => {
    scrubbing = true
  })

  player.progress.addEventListener('input', () => {
    const ratio = Number(player.progress.value) / SCALE

    paint(ratio)

    if (player.media.duration > 0) {
      player.media.currentTime = ratio * player.media.duration
    }
  })

  player.progress.addEventListener('change', () => {
    scrubbing = false
  })

  player.progress.addEventListener('pointerup', () => {
    scrubbing = false
  })

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    player.media.autoplay = false
    player.media.pause()
  }

  syncState()
  syncSound()
  paint(0)
}
