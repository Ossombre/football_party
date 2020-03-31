export default class Player1 {
  constructor (gameWidth, gameHeight) {
    this.width = 100
    this.height = 100

    this.position = {
      x: 9 * gameWidth / 10 - this.width / 2,
      y: gameHeight / 2 - this.height / 2
    }
  }

  draw (ctx) {
    ctx.fillStyle = '#0ff'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
