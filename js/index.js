"use strict"
class Game {
  constructor(){
    var createTags = (tagName, container = document.body) => {
      var elem = container.appendChild (document.createElement(tagName))
      return elem
    }
    this.mainCont = createTags ("div")
    this.mainCont.className = "mainGround"
    var parts = [
      {
        name: "castle",
        background: "images/castle.png",
      },
      {
        name: "room",
        background: "images/room.png",
        items: [
          {
            id: "bottle",
            cords: {
              x: 200,
              y: 630
            },
            sizes: {
              h: 90,
              w: 90
            },
            className: "first"
          },
          {
            id: "bucket",
            cords: {
              x: 960,
              y: 560
            },
            sizes: {
              h: 110,
              w: 100
            },
            className: "first"
          },
          {
            id: "elixir",
            cords: {
              x: 379,
              y: 572
            },
            sizes: {
              h: 30,
              w: 30
            },
            className: "first",
            onclick: function (event) {
              this.moveItem( event.target, "ib2")
            }.bind (this)
          },
          {
            id: "key",
            cords: {
              x: 200,
              y: 650
            },
            sizes: {
              h: 50,
              w: 50
            },
            className: "first",
            onclick: function (event) {
              this.moveItem( event.target, "ib3")
            }.bind (this)
          },
          {
            id: "sword",
            cords: {
              x: 962,
              y: 564
            },
            sizes: {
              h: 90,
              w: 90
            },
            className: "first",
            onclick: function (event) {
              this.moveItem( event.target, "ib1")
            }.bind (this)
          }
        ]
      },
      {
        name: "knight",
        background: "images/knight.png",
      },
      {
        name: "safe",
        background: "images/safe.png",
      },
      {
        name: "room",
        background: "images/room.png",
      },
      {
        name: "room-chest",
        background: "images/room-chest.png",
      },
      {
        name: "book",
        background: "images/book.png",
      },
    ]
    this.scenarioGame = name => {
      var curentPart = parts.filter( elem => elem.name === name)[0]
      this.mainCont.style = `
        background-image: url(${curentPart.background});
        background-size: cover;
        background-repeat: no-repeat;
        width: ${gameSize.w}px;
        height: ${gameSize.h}px;
        position: absolute;
        left: ${gameSize.indent}px;
        `
      curentPart.items ? this.setItems(curentPart.items) : null
      curentPart.name === "room" ? menuBar() : null
    }
    var gameSize = {
      w: 1400,
      h: 720,
      indent: (window.innerWidth - 1400) / 2
    }
    this.start = () => {
      var btn = createTags("a", this.mainCont)
      btn.className = "startBtn"
      btn.onclick = function (event){
        event.preventDefault()
        this.scenarioGame("room")
        console.log(this)
        event.target.remove()
      }.bind (this)
    }
    this.setItems = arr => {
      arr.forEach( elem => {
        var icon = createTags("div", this.mainCont)
        icon.id = elem.id
        icon.className = elem.className
        icon.style =`
          width: ${elem.sizes.w}px;
          height: ${elem.sizes.h}px;
          background-size: ${elem.sizes.w}px ${elem.sizes.h}px;
        `
        icon.style.left =  elem.cords.x - gameSize.indent + "px"
        icon.style.top = elem.cords.y - gameSize.indent+ "px"
        elem.onclick ? icon.onclick = elem.onclick : null
      })
    }
    var menuBar = () => {
      var bar = createTags("div", this.mainCont)
      bar.className = "bar"
      var i = 1
      while (i <= 3) {
        var per = createTags("div", bar)
        per.id = "ib"+i++
        per.className = "itemBar"
      }
    }
    this.moveItem = (item, spaceId) => {
      var space = document.getElementById(spaceId)
      console.dir(space)
      var spaceBar = document.querySelector(".itemBar")
      var sw = space.offsetWidth
      var sh = space.offsetHeight
      item.style.top = spaceBar.offsetTop + space.offsetTop
      item.style.left = spaceBar.offsetLeft + space.offsetLeft
      console.log(item.style.left, item.style.top)
      item.style.width = sw
      item.style.height = sh
      item.style.backgroundSize = `${sw} ${sh};`
    }
    // удалить
    this.tester = () => {
      var el = this.mainCont.appendChild(document.createElement("div"))
      document.onclick = function(event){
	       el.style.color = "red"
	        el.innerText = `x: ${event.clientX-gameSize.left}: y: ${event.clientY}`
	         el.style.background = "black"
      }
      // удалить
    }
  }
}
var game = new Game()
// var test = game.mainCont.appendChild(document.createElement("rec-form"))
game.scenarioGame("castle")
// test.assignment (game.start)
// test.start()
game.start()
// game.tester()
