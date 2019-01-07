"use strict"
class Game {
  constructor(){
    var createTags = (tagName, container = document.body, classN = "") => {
      var elem = container.appendChild (document.createElement(tagName))
      elem.className = classN
      return elem
    }
    // функция создания тегов
    this.mainCont = createTags ("div")
    this.mainCont.className = "mainGround"
    // функция респонсив
    var gameSizes = {
      w: 1400,
      h: 720,
    }
    this.resize = () => {
      var ww = window.innerWidth
      var wh = window.innerHeight
      var it = parts[1].items
      console.log(ww, wh, 0)
      if(ww <= 1280 && wh <= 1024 && ww >= 1023 && wh >= 614){
        gameSizes.w = 1050
        gameSizes.h = 630
        it[0].cords.x = 100
        it[0].cords.y = 440
        it[1].cords.x = 730
        it[1].cords.y = 400
        it[2].cords.x = 245
        it[2].cords.y = 400
        it[3].cords.x = 80
        it[3].cords.y = 450
        it[4].cords.x = 720
        it[4].cords.y = 375
        console.log(ww, wh, 1)
      }
      if( ww <= 1023 && wh <= 786 && ww >= 980 && wh >= 646){
        gameSizes.w = 1000
        gameSizes.h = 650
        console.log(ww, wh, 2)
      }
      this.mainCont.style =`
      background-size: cover;
      width: ${gameSizes.w}px;
      height: ${gameSizes.h}px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-repeat: no-repeat;
      `
    }
    var elixRes = false // Вспомогательная переменная для эликсира

    var parts = [
      {
        name: "castle",
        background: "images/castle.jpg",
        // text: "Добро пожаловать в стариный замок! В подземелье спрятана книга знаний, которая откроет тебе новый, удивительный мир. Но на пути тебя ждут испытания!"
      },
      {
        name: "room",
        background: "images/room.jpg",
//        text: `В поисках книги тебе понадобится мечь, эликсир, ключ. Найди их!!!`,
        items: [
          {
            id: "bottle",
            cords: {
              x: 152,
              y: 562
            },
            sizes: {
              h: 70,
              w: 50
            },
            className: "first",
            rem: true,
          },
          {
            id: "bucket",
            cords: {
              x: 892,
              y: 522
            },
            sizes: {
              h: 90,
              w: 80
            },
            className: "first",
            rem: true,
          },
          {
            id: "elixir",
            cords: {
              x: 311,
              y: 504
            },
            sizes: {
              h: 30,
              w: 30
            },
            className: "first",
            onclick: function (event) {
              this.moveItem( "elixir", "ib2")
              namePart === "knight" || namePart === "safe" || "room-chest" ? changeOnclick(event.target, function (event){
                var x = document.querySelector(".question")
                var t = document.querySelector(".text")
                if (x && !t && elixRes){
                  x.style.display = "flex"
                  event.target.remove()
                }
                console.log(x)
              }) : null
            }.bind (this),
            rem: false,
          },
          {
            id: "key",
            cords: {
              x: 132,
              y: 582
            },
            sizes: {
              h: 60,
              w: 60
            },
            className: "first",
            onclick: function (event) {
              this.moveItem( "key", "ib3")
             changeOnclick(event.target, function(event){
                if ( document.querySelector(".text") || namePart !== "room-chest")return //убираем двойной клик
                console.log (event)
                event.target.remove()
                var evel = createTags("div", this.mainCont, "evel")
                evel.style.left = 10 + "px"
                printText("Злой колдун украл книгу! Что бы его уничтожить, допиши заклинание!")
                var timer = setInterval(function(){
                  console.log("interval", this)
                  if (!document.querySelector(".text")){
                    clearInterval(timer)
                    var questContiner = createTags("div", this.mainCont, "question")
                    qu.createAnswer (  qu.content [qu.curentQuestion], questContiner)
                    var answBtn = document.querySelector(".answBtn")
                    answBtn.onclick = function(event){
                      console.log("down", this)
                      parts.filter(el =>el.name === "room-chest")[0].res2 ()
                    }
                  }
                }.bind(this), 100)
              }.bind(this))
            }.bind (this),
            rem: false,
          },
          {
            id: "sword",
            cords: {
              x: 894,
              y: 496
            },
            sizes: {
              h: 90,
              w: 90
            },
            className: "first",
            onclick: function (event) {
              this.moveItem( "sword", "ib1")
              changeOnclick(event.target, function (event){
                if ( document.querySelector(".text") || namePart !== "knight")return
                var oldQue = document.querySelector(".question")
                if (oldQue)return
                var questContiner = createTags("div", this.mainCont, "question")
                qu.createAnswer (  qu.content [qu.curentQuestion], questContiner)
                var btn = document.querySelector(".answBtn")
                btn.onclick = function (event){
                  if (event.target.onmousedown()){
                    questContiner.remove()
                     evilDie(document.getElementById("evel_knight"), 'url("images/blood_puddle.png")', "safe")
                     var x = document.getElementById ("sword")
                     x.remove()
                  }else {
                    var elexirValue = document.getElementById("elixir")
                    elixRes = true
                    elexirValue ? printText("Ты не смог ответить верно, поэтому тебя ранили, что бы залечить раны примени эликсир") : null
                    questContiner.style.display = "none"
                    var elexirValue = document.getElementById("elixir")
                    !elexirValue ? gameOver() : console.log("hello")
                  }
                }
              }.bind (this))
            }.bind (this),
            rem: false,
          }
        ]
      },
      {
        name: "knight",
        background: "images/knight.jpg",
        text: "Что бы пройти дальше ты должен победить злого рыцаря применив мечь!",
        items: [
          {
            id: "evel_knight",
            cords: {
              x: 882,
              y: 362,
            },
            sizes: {
              h: 220,
              w: 130,
            },
            className: "first",
            rem: true,
          }
        ]
      },
      {
        name: "safe",
        background: "images/safe.jpg",
        text: "Ты почти у цели, что бы открыть дверь нужно отгадать загадку!",
        res: function (){
                 if (event.target.onmousedown()){
                   event.target.parentNode.remove()
                   this.scenarioGame("room-chest")
                 }else {
                   event.target.parentNode.style.display = "none"
                   var elix = document.getElementById("elixir")
                   !elix ? gameOver() : printText("Ответ не верный. Примени элексир для повторной попытки!")
                 }
          }.bind(this)
      },
      {
        name: "room-chest",
        background: "images/room-chest.jpg",
        text: "Ура ты нашел сундук! У тебя есть ключ, открой его!",
        res2: function (){
                 if (event.target.onmousedown()){
                   event.target.parentNode.remove()
                   evilDie(document.querySelector(".evel"), 'url("images/smoke.gif")', "book")
                   setTimeout(function(){
                     var s = createTags("a", document.querySelector(".mainGround"), "fin")
                     s.innerText = "Прочитать..."
                     s.href = "https://github.com/garevna/js-course/wiki/introduction"
                   }.bind(this),3000)
                 }else {
                   event.target.parentNode.style.display = "none"
                   var elix = document.getElementById("elixir")
                   !elix ? gameOver() : printText("Ответ не верный. Примени элексир для повторной попытки!")
                 }
          }.bind(this)
      },
      {
        name: "book",
        background: "images/book.jpg",
      },
    ]
    // имя текущей части игры
    var namePart = ""
    // запуск сценария по имени
    this.scenarioGame = name => {
      var curentPart = parts.filter( elem => elem.name === name)[0]
      document.location.hash = curentPart.name
      namePart = curentPart.name
      this.mainCont.style.backgroundImage = `url(${curentPart.background})`
      curentPart.items ? this.setItems(curentPart.items) : null
      curentPart.name === "room" ? menuBar() : null
      curentPart.text ? printText(curentPart.text) : null
      if (curentPart.res) {
        var timer = setInterval(function(){
          console.log("interval", this)
          if (!document.querySelector(".text")){
            clearInterval(timer)
            var questContiner = createTags("div", this.mainCont, "question")
            qu.createAnswer (  qu.content [qu.curentQuestion], questContiner)
            var answBtn = document.querySelector(".answBtn")
            answBtn.onclick = function(event){
              console.log("down", this)
              curentPart.res()
            }
          }
        }.bind(this), 100)
      }
    }
    this.start = () => {
      this.scenarioGame("castle")
      var timer = setInterval(function(){
        if(!document.querySelector(".text")){
          clearInterval(timer)
          var btn = createTags("a", this.mainCont)
          btn.className = "startBtn"
          btn.onclick = function (event){
            event.preventDefault()
            this.scenarioGame("room")
            console.log(this)
            event.target.remove()
          }.bind (this)
        }
      }.bind(this),100)
    }
    // вывод иконок на страницу
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
        icon.style.left =  elem.cords.x  + "px"
        icon.style.top = elem.cords.y + "px"
        elem.onclick ? icon.onclick = elem.onclick : null
        icon.rem = elem.rem
      })
    }
    var menuBar = () => {
      var bar = createTags("div", this.mainCont)
      bar.className = "bar"
      var bsw = 50
      bar.style.width = bsw + "px"
      bar.style.left = gameSizes.w - bsw + "px"
      var i = 1
      while (i <= 3) {
        var per = createTags("div", bar)
        per.id = "ib"+i++
        per.className = "itemBar"
      }
    }
    this.moveItem = (itemId, spaceId) => {
      counter++
      var space = document.getElementById(spaceId)
      var item = document.getElementById(itemId)
      item.style.left = space.parentNode.offsetLeft + space.offsetLeft + "px"
      item.style.top = space.parentNode.offsetTop + space.offsetTop + "px"
      item.style.width = space.clientWidth + "px"
      item.style.height = space.clientHeight + "px"
      item.style.backgroundSize = `${space.clientWidth}px ${space.clientHeight}px`
      if (counter === 3) {
        setTimeout(function(){
          removeItems()
          this.scenarioGame("knight")
        }.bind(this),1000)
      }
    }
    var removeItems = togle => {
      var massItem = Array.from(document.querySelectorAll(".first"))
      massItem.forEach(el => {
        el.rem ? el.remove() : togle ? el.remove() : null
      })
    }
    var counter = 0
    // функция печатания текста
    var printText = text => {
        var oldText = document.querySelector(".text")
        oldText ? oldText.remove() : null
        var textCon = createTags("div", this.mainCont, "text")
        var rec = function(n) {
          setTimeout(function(){
            if (n <= text.length-1) {
              textCon.innerHTML += text.charAt(n)
              rec(n+1)
            }else {
              setTimeout(function(){
                textCon.remove()
              },1500)
            }
          },100)
        }
        rec(0)
    }
    // метод перезаписи онклика для меню
    var changeOnclick = (elem, newClick) => {
      // newClick()     /*test*/
      elem.onclick = newClick

    }
    // метод смерти злого персонажа
    var evilDie = (pers, persImg, scen) => {
      pers.style.backgroundImage = persImg
      setTimeout(function(){
        pers.remove()
        this.scenarioGame(scen)
      }.bind(this),2500)
    }
    // метод прекращения игры
    var gameOver = () => {
      removeItems(true)
      var over = createTags("div", this.mainCont, "over")
      over.style.opacity = 0
      over.innerText = "GAME OVER"
      var counter = 0
      var time = setInterval(function(){
        counter === 1 ? clearInterval(time) : over.style.opacity = counter += 0.05
      }.bind(this),100)
    }

  }
}
var game = new Game()
game.resize()
var test = game.mainCont.appendChild(document.createElement("rec-form"))
test.assignment (game.start)
test.start()
