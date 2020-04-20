import Player1 from './player1'
import InputHandler from './input'
import Player2 from './player2'
import Ball from './ball'

export default class Game {
  constructor (gameWidth, gameHeight) {
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.goalUpper = gameHeight / 5
    this.goalLower = 4 * gameHeight / 5
    this.scoreP1 = 0
    this.scoreP2 = 0
    this.victory = ''
  }

  start () {
    this.player1 = new Player1(this)
    this.player2 = new Player2(this)
    this.ball = new Ball(this)
    this.gameObjects = [this.player1, this.player2, this.ball]
    /* eslint-disable no-new */
    new InputHandler(this.player1, this.player2)
  }

  update (deltaTime) {
    this.gameObjects.forEach((object) => object.update(deltaTime))
  }

  draw (ctx) {
    ctx.drawImage(
      document.getElementById('bg'),
      0,
      0,
      1000,
      600
    )
    this.gameObjects.forEach((object) => object.draw(ctx))
  }
}
