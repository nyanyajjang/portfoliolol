const difficulties = {
    easy: {
        numCards: 4,
        grid: {
            xs: ["grid__col-xs-11", "grid__col-xs-offset-1"],
            sm: ["grid__col-sm-5", "grid__col-sm-offset-1"],
            md: ["grid__col-md-2", "grid__col-md-offset-3"]
        }
    },

    normal: {
        numCards: 6,
        grid: {
            xs: ["grid__col-xs-11", "grid__col-xs-offset-1"],
            sm: ["grid__col-sm-11", "grid__col-sm-offset-1"],
            md: ["grid__col-md-2", "grid__col-md-offset-1"]
        }
    },

    hard: {
        numCards: 8,
        grid: {
            xs: ["grid__col-xs-11", "grid__col-xs-offset-1"],
            sm: ["grid__col-sm-5", "grid__col-sm-offset-1"],
            md: ["grid__col-md-2", "grid__col-md-offset-1"]
        }
    }
};

const numRows = 2;

const cardCategory = {
    clubs: { // 0

    },

    diamonds: { // 1

    },

    hearts: { // 2

    },

    spades: { // 3

    }
}

let currentDifficulty;

let currentCards = [ ];
let currentFlip;

window.addEventListener("load", function() {
    loadGameStartScene();
});

function loadGameStartScene() {
    let modal = document.createElement("div");    // <div></div>
    modal.classList.add("modal");   // <div class="modal"></div>

    let modalWindow = document.createElement("div"); // <div></div>
    modalWindow.classList.add("modal__window"); // <div class="modal__window"></div>

    let modalWindowTitle = document.createElement("h2");
    modalWindowTitle.classList.add("modal__window__title"); // <h2 class="modal__window__title">Select Difficulty</h2>
    modalWindowTitle.appendChild(document.createTextNode("Select Difficulty"));
    modalWindow.appendChild(modalWindowTitle);

    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("modal_window_container", "grid__row");
    modalWindow.appendChild(buttonContainer);

    // ["easy", "normal", "hard"]
    for (let difficulty in Object.keys(difficulties)) {
        let difficultyName = Object.keys(difficulties)[difficulty];

        let button = document.createElement("button"); // <button></button>
        button.appendChild(document.createTextNode(difficultyName));
        button.setAttribute("id", `btn-${difficultyName}`); // button id="btn-easy" onclick=
        button.classList.add("modal__window__button", "grid__col-3", "grid__col-offset-1");

        button.addEventListener("click", function() {
            currentDifficulty = difficulties[difficultyName]; // difficulties["easy"] => difficulties.easy

            loadGameScene();
        });

        buttonContainer.appendChild(button);
    }

    modal.appendChild(modalWindow);
    document.querySelector("body").appendChild(modal); // <body> <div></div> </body>
}

function loadGameScene() {
    let modal = document.querySelector(".modal");
    if (modal) {
        modal.parentNode.removeChild(modal);
    }

    newGameScene();
}

function newGameScene() {
    let cardPool = shuffle(Object.keys(cardCategory)).slice(0, currentDifficulty.numCards / 2);
    for (let i = 0; i < cardPool.length; i++) {
        let foundIndex = Object.keys(cardCategory).findIndex(function(cardName) {
            return cardPool[i] == cardName;
        });

        cardPool[i] = {
            cardId: foundIndex,
            cardName: cardPool[i]
        };
    }

    let grid = document.createElement("div");
    grid.classList.add("grid", "card-grid");
    document.querySelector("body").appendChild(grid);

    const numCardsInRow = currentDifficulty.numCards / numRows;
    for (let i = 0; i < numRows; i++) {
        let gridRow = document.createElement("div");
        gridRow.classList.add("grid__row");
        grid.appendChild(gridRow);

        let shuffled = shuffle(cardPool);
        let shuffledCards = [ ];
        for (let k = 0; k < shuffled.length; k++) {
            shuffledCards.push(Object.assign({}, shuffled[k], {
                flipped: false,
                matched: false
            }));
        }
    
        for (let m = 0; m < shuffledCards.length; m++) {
            currentCards.push(shuffledCards[m]);
        }

        for (let j = 0; j < numCardsInRow; j++) {
            let cardIndex = j + i * numCardsInRow;
            let currentCard = currentCards[cardIndex];
            currentCard.index = cardIndex;

            let flipContainer = document.createElement("div");
            flipContainer.setAttribute("id", `card-${cardIndex}`);
            flipContainer.classList.add("flip-container",
                                        currentDifficulty.grid.xs[0], currentDifficulty.grid.xs[1],
                                        currentDifficulty.grid.sm[0], currentDifficulty.grid.sm[1],
                                        currentDifficulty.grid.md[0], currentDifficulty.grid.md[1]);
            flipContainer.addEventListener("touchstart", function() {
                flipContainer.classList.toggle("hover");
            });
            gridRow.appendChild(flipContainer);

            currentCard.element = flipContainer;

            let card = document.createElement("div");
            card.classList.add("card", `card-${currentCard.cardName}`, "flipper");
            flipContainer.appendChild(card);

            let front = document.createElement("div");
            front.classList.add("front");
            card.appendChild(front);

            let back = document.createElement("div");
            back.classList.add("back");
            card.appendChild(back);

            let backImage = document.createElement("div");
            backImage.classList.add("back-image");
            back.appendChild(backImage);

            card.addEventListener("click", function() {
                if (!currentCard.matched) {
                    currentCard.flipped = !currentCard.flipped;
                    currentCard.element.classList.toggle("flip", currentCard.flipped);

                    if (currentCard.flipped) {
                        let previousFlip = currentFlip;
                        currentFlip = currentCard;

                        if (previousFlip) {
                            if (previousFlip != currentCard) {
                                currentFlip = null;

                                if (previousFlip.cardName == currentCard.cardName) {
                                    previousFlip.matched = true;
                                    currentCard.matched = true;
        
                                    previousFlip.element.classList.toggle("match", true);
                                    currentCard.element.classList.toggle("match", true);

                                    let unmatched = currentCards.find(function(c) {
                                        return c.matched == false;
                                    })
                                    if (!unmatched) {
                                        let timeout = setTimeout(function() {
                                            loadGameFinished(); // End Game
        
                                            clearTimeout(timeout);
                                        }, 600);
                                    }
                                } else {
                                    previousFlip.flipped = false;
                                    currentCard.flipped = false;
        
                                    setTimeout(function() {
                                        previousFlip.element.classList.toggle("flip", false);
                                        currentCard.element.classList.toggle("flip", false);
                                    }, 300);
                                }
                            }
                        }
                    } else {
                        if (currentFlip == currentCard) {
                            currentFlip = null;
                        }
                    }
                }
            });
        }
    }

    console.log(currentCards);
}

function loadGameFinished() {
    let modal = document.createElement("div");
    modal.classList.add("class", "modal");

    let modalWindow = document.createElement("div");
    modalWindow.classList.add("class", "modal__window");

    let modalWindowTitle = document.createElement("h2");
    modalWindowTitle.classList.add("class", "modal__window__title");
    modalWindowTitle.appendChild(document.createTextNode("YOU WON"));

    modalWindow.appendChild(modalWindowTitle);
    modal.appendChild(modalWindow);
    document.querySelector("body").appendChild(modal);

    const numCardsInRow = currentDifficulty.numCards / numRows;
    for (let i = numCardsInRow - 1; i >= 0; i--) {
        let animationDelay = 250 * (numCardsInRow - i);

        setTimeout(function() {
            let upperCard = document.querySelector(`#card-${i}`);
            let lowerCard = document.querySelector(`#card-${i + numCardsInRow}`);
    
            upperCard.classList.toggle("collapsed");
            lowerCard.classList.toggle("collapsed");

            if (i == 0) {
                setTimeout(function() {
                    resetGame();
                }, 500 + animationDelay);
            }
        }, animationDelay);
    }
}

function resetGame() {
    let modal = document.querySelector(".modal");
    if (modal) {
        modal.parentNode.removeChild(modal);
    }

    let cardGrid  = document.querySelector(".card-grid");
    if (cardGrid) {
        cardGrid.parentNode.removeChild(cardGrid);
    }

    currentCards = [ ];
    currentFlip = null;
    currentDifficulty = null;

    loadGameStartScene();
}

function shuffle (src) {
    const copy = [...src]

    const length = copy.length
    for (let i = 0; i < length; i++) {
      const x = copy[i]
      const y = Math.floor(Math.random() * length)
      const z = copy[y]
      copy[i] = z
      copy[y] = x
    }

    if (typeof src === 'string') {
      return copy.join('')
    }

    return copy
}