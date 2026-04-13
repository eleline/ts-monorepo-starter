import { boss } from './boss'

export async function checkBossHealth(): Promise<boolean> {
  try {
    await boss.fetch('__health_check__')
    return true
  }
  catch {
    return false
  }
}
