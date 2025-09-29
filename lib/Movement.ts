import { Dimensions } from 'react-native'

export const MovementSystem = (entities: any, { time }: any) => {
  // Get current screen dimensions (in case of rotation or layout changes)
  const { width, height } = Dimensions.get('window')

  if (entities.player && entities.player.velocity) {
    const { velocity } = entities.player
    const [currentX, currentY] = entities.player.position

    // Movement speed (pixels per second)
    const speed = 200
    const deltaTime = time.delta / 1000 // Convert to seconds

    // Calculate new position based on velocity
    const newX = currentX + velocity.x * speed * deltaTime
    const newY = currentY + velocity.y * speed * deltaTime

    // Player size for boundary checking
    const playerSize = 48 // 12 * 4 (w-12 h-12 in Tailwind = 48px)
    const halfPlayer = playerSize / 2

    // Constrain player within screen bounds
    const constrainedX = Math.max(
      halfPlayer,
      Math.min(width - halfPlayer, newX)
    )
    const constrainedY = Math.max(
      halfPlayer,
      Math.min(height - halfPlayer, newY)
    )

    // Update player position
    entities.player.position = [constrainedX, constrainedY]
  }

  return entities
}
