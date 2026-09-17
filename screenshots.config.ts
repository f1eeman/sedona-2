import { defineConfig, devices } from '@playwright/test'

const PORT = Number(process.env['SEDONA_PORT'] ?? 4321)

export default defineConfig({
  testDir: './tests',
  testMatch: '_*.spec.ts',
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${String(PORT)}`,
  },
  projects: [{ name: 'shots', use: { ...devices['Desktop Chrome'] } }],
})
