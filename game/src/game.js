import Player1 from './player1'
import InputHandler from './input'
import Player2 from './player2'
import Ball from './ball'

export default class Game {
  constructor (gameWidth, gameHeight) {
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
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
    this.gameObjects.forEach((object) => object.draw(ctx))
  }
}
