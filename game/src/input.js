export default class InputHandler {
  constructor (player1, player2) {
    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 40:
          player1.moveDown()
          break
        case 38:
          player1.moveUp()
          break
        case 83:
          player2.moveDown()
          break
        case 90:
          player2.moveUp()
      }
    })

    document.addEventListener('keyup', event => {
      switch (event.keyCode) {
        case 40:
          if (player1.speed > 0) {
            player1.stop()
          }
          break
        case 38:
          if (player1.speed < 0) {
            player1.stop()
          }
          break
        case 83:
          if (player2.speed > 0) {
            player2.stop()
          }
          break
        case 90:
          if (player2.speed < 0) {
            player2.stop()
          }
          break
      }
    })
  }
}
