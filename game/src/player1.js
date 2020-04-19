export default class Player1 {
  constructor (game) {
    this.gameHeight = game.gameHeight
    this.width = 124
    this.height = 124

    this.maxSpeed = 8
    this.speed = 0

    this.position = {
      x: 9 * game.gameWidth / 10 - this.width / 2,
      y: game.gameHeight / 2 - this.height / 2
    }
    this.isFrozen = false
  }

  moveDown () {
    if (!this.isFrozen) {
      this.speed = this.maxSpeed
    }
  }

  moveUp () {
    if (!this.isFrozen) {
      this.speed = -this.maxSpeed
    }
  }

  stop () {
    this.speed = 0
  }

  draw (ctx) { // will probably need to be replaced like in ball
    ctx.fillStyle = '#0ff'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update (deltaTime) {
    this.position.y += this.speed
    if (this.position.y >= this.gameHeight - this.height) this.position.y = this.gameHeight - this.height
    if (this.position.y < 0) this.position.y = 0
  }
}
