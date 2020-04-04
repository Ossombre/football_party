export default class Player2 {
  constructor (game) {
    this.gameHeight = game.gameHeight
    this.width = 124
    this.height = 124

    this.maxSpeed = 8
    this.speed = 0

    this.position = {
      x: game.gameWidth / 10 - this.width / 2,
      y: game.gameHeight / 2 - this.height / 2
    }
  }

  moveDown () {
    this.speed = this.maxSpeed
  }

  moveUp () {
    this.speed = -this.maxSpeed
  }

  stop () {
    this.speed = 0
  }

  draw (ctx) { // will probably need to be replaced like in ball
    ctx.fillStyle = '#f0f'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update (deltaTime) {
    this.position.y += this.speed
    if (this.position.y >= this.gameHeight - this.height) this.position.y = this.gameHeight - this.height
    if (this.position.y < 0) this.position.y = 0
  }
}
