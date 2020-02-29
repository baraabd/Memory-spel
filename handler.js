var memoryCards = [{
    hiddenImg: "./image/1.jpg",
    key: 0
}, {
    hiddenImg: "./image/2.jpg",
    key: 1
}, {
    hiddenImg: "./image/3.jpg",
    key: 2
}, {
    hiddenImg: "./image/4.jpg",
    key: 3
}, {
    hiddenImg: "./image/5.jpg",
    key: 4
}, {
    hiddenImg: "./image/6.jpg",
    key: 5
}]

var flippedCard
var waitingForTimeout = false
var winCounter = 0
var count = 0



function initSite() {
    printGameBoard()
}

function printGameBoard() {
    var container = document.createElement("div")
    var headerContainer = document.createElement("div")
    var cardsContainer = document.createElement("div")
    var count = document.createElement("div")
    var title = document.createElement("div")
    var level = document.createElement("div")
    var countLabel = document.createElement("div")
    var levelLabel = document.createElement("div")


    container.classList = "container"
    headerContainer.classList = "headerContainer"
    cardsContainer.classList = "cardsContainer"
    count.classList = "count"
    title.classList = "title"
    level.classList = "level"
    countLabel.classList = "countLabel"
    levelLabel.classList = "levelLabel"

    count.innerText = "0"
    title.innerText = "MEMORY SPEL"
    level.innerText = "1"

    countLabel.innerText = "Antal försök:"
    levelLabel.innerText = "Nivå:"

    var idCounter = 0
    var cardList = []

    for (i = 0; i < memoryCards.length; i++) {
        cardList.push(createCards(memoryCards[i], idCounter))
        idCounter++
        cardList.push(createCards(memoryCards[i], idCounter))
        idCounter++
    }

    cardList = shuffle(cardList)

    for (i = 0; i < cardList.length; i++) {
        cardsContainer.appendChild(cardList[i])
    }

    headerContainer.appendChild(countLabel)
    headerContainer.appendChild(count)
    headerContainer.appendChild(title)
    headerContainer.appendChild(levelLabel)
    headerContainer.appendChild(level)
    container.appendChild(headerContainer)
    container.appendChild(cardsContainer)
    document.body.appendChild(container)
}

function createCards(cardData, idCounter) {
    var card = document.createElement("div")
    card.classList = "flexItem"
    card.data = cardData
    card.id = idCounter

    card.onclick = (event) => {

        if (waitingForTimeout) {
            console.log("Waiting...")
            return
        }

        var card = event.srcElement

        if (flippedCard && card.id == flippedCard.id) {
            console.log("Samma kort tryckt igen")
            return
        }

        flipCard(card)

        if (flippedCard) {
            console.log("Det finns ett vänt kort sedan innan")
            if (flippedCard.data.key == card.data.key) {
                //match finns. Ta bort onclick ifrån card och flippedCard
                card.onclick = ""
                flippedCard.onclick = ""
                flippedCard = undefined
                winCounter = winCounter + 1
                count += 1;
                console.log(count)
                var x = document.getElementsByClassName("count");
                x[0].innerHTML = count;
                console.log("MATCH", winCounter)

            } else {

                console.log("INGEN MATCH")
                count += 1;
                console.log(count)
                var x = document.getElementsByClassName("count");
                x[0].innerHTML = count;

                waitingForTimeout = true
                setTimeout(() => {
                    flipBackCard(card)
                    flipBackCard(flippedCard)
                    flippedCard = undefined
                    waitingForTimeout = false
                }, 2000);
                // Ingen match. Vänd tillbaka flippedCard och card efter 2 sek
            }
        } else {
            console.log("Fösta kortet har vänts")
                // Vänd card
            flippedCard = card
        }

        if (winCounter == 6) {
            var winnerContainer = document.createElement("div")
            winnerContainer.classList = "winnerContainer"

            var winnerText = document.createElement("h1")
            winnerText.innerText = "GRATTIS!"
            winnerText.classList = "h1"

            var winnerTextOne = document.createElement("h3")
            winnerTextOne.innerText = "Du vann!"
            winnerTextOne.classList = "h3"

            var startButton = document.createElement("button")
            startButton.innerText = "Starta spelet"
            startButton.classList = "button"
            startButton.onclick = function() {
                winCounter = 0
                count = 0
                initSite()

            }

            console.log(winCounter)
            winnerContainer.appendChild(startButton)
            winnerContainer.appendChild(winnerTextOne)
            winnerContainer.appendChild(winnerText)
            document.body.appendChild(winnerContainer)
        }

    }

    return card
}

function flipCard(card) {
    card.style.background = "url(" + card.data.hiddenImg + ")"
    card.style.backgroundSize = "cover"
    card.style.backgroundPosition = "center"
}

function flipBackCard(card) {
    card.style.background = ""
    card.style.backgroundColor = "./image/backgroundImage.jpg"
}

function shuffle(cardList) {
    return cardList.sort(() => Math.random() - 0.5);
}