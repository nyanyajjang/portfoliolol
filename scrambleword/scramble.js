/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
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

/**********************************************
 * YOUR CODE BELOW
 **********************************************/


const game = {
  
  words: ['red', 'orange', 'yellow', 'green', 'blue', 'darkblue', 'violet', 'pink', 'black', 'white'],
  points: 0,
  maxStrikes: 3,
  maxPasses: 3,
  scrambled: ''
}

game.words = shuffle(game.words)
game.word = game.words.shift()
game.scrambled = shuffle(game.word)

new Vue ({
  el: '#app',
  data() {
    return {
      game,
      texting:'',
      correct: false,
      wrong: false,
      pass: false,
      lost: false,
      noPass: false
  }},
  methods: {
    textInput() {
        if(this.texting === this.game.word) {
        this.correct = true;
        this.wrong = false;
        this.pass = false;
        this.lost = false;
        this.noPass = false;
        this.texting = '';
        this.game.points++;
        this.game.word = this.game.words.shift()
        return shuffle(this.game.word)
      }  else if (this.game.maxStrikes > 1) {
        this.game.maxStrikes--;
        this.wrong = true;
        this.lost = false;
        this.pass = false;
        this.correct = false;
        this.noPass = false;
      } else {
        this.game.maxStrikes--;
        this.lost= true;
        this.wrong = false;
        this.pass = false;
        this.correct = false;
        this.noPass = false;
      }
    },
    reStart(){
      this.game.points = 0;
      this.game.maxStrikes = 3;
      this.game.maxPasses = 3;
      this.lost = false;
      return shuffle(this.game.word) 
      
    },
    passes(){
      if(this.game.maxPasses > 1) {
      this.game.maxPasses--;
      this.game.word = this.game.words.shift();
      this.correct = false;
      this.wrong = false;
      this.pass = true;
      this.lost = false;
      this.noPass = false;
      return shuffle(this.game.word) 
    } else if (this.game.maxPasses === 1){
      this.game.maxPasses--;
      this.correct = false;
      this.wrong = false;
      this.pass = false;
      this.lost = false;
      this.noPass = true;
    }
      

      // else if (this.game.maxPasses == 0) {
      //   this.pass = false;
      //   this.game.word = this.game.words.shift();
      //   return shuffle(this.game.word)
      // }
    }
  },
  computed: {
    message() {
       return shuffle(this.game.word);
    }
    
  }
});



/*

*An object that hold game status
* - active: boolean
* - words: array (shuffled)
* - word: string
* - scrambled: string (shuffled)
* - strikes: number
* - points: number
* - maxStrikes: number
* - maxPasses: number

*/



/**

* The start() function
* Check if game.active is false

*  Set game active status to true
*  Set game point to 0
*  Set game strikes to 0
*  Set game pass to start number
*  Set game list words to words array using the shuffle fuction

*  Use shift() or splice() to get first word off of the game list of words
*  Use shuffle function to get scramble word and save to game

*  Response: scrambled word

 * else

*  Reponse: a game has already started
*
*/
/*
function start() {
  if (game.active === false) {
    game.active = true
    game.points = 3
    game.strikes = 3
    game.passes = 3
    game.words = shuffle(game.words)
    game.word = game.words.shift()
    game.scrambled = shuffle(game.word)
    return game.scrambled
  } else {
    return 'A game has already started'
    }
}


  /**
   * The guess() function
   * check if game.active is true
   *  check if the guess word is the unscrambled current word
   *   add point to 1 and the next word
   *   Remove the unscrambled word from the game list
   *  else
   *   add strike to one 
   *   return the current word
   * 
   * check if game.active is false
   *   response: 'you cannot make guesses'
   */   
  
  /* function guess (word) {
  
    if (this.game.active === true) {
      if (this.game.words.length >= 1) {
      if (game.word === word){
        game.points++
        game.word = game.words.shift()
        
        console.warn ('You got 1 point!')
        return 'Next word :' + shuffle(game.word)
      } else if ( game.maxStrikes > 1) { 
        game.maxStrikes--

        console.warn (`You have ${game.maxStrikes} strkies left`)
        return 'Next word :' + shuffle(game.word)

      } else { 
        game.active = false 
        console.warn (`Game over. you used all your strikes. Your total points are ${game.points}`)
        return `To start this game again, please text start()`
      } 
    }else if (game.words.length <= 1){
      game.points++
      game.active = false
      
      console.warn (`Game over. you used all your words. Your total points are ${game.points}`)
      return `To start this game again, please text start()`
    }

    } else {
      return 'you cannot make guesses. Text start() for the pass.'
    }
  
  }

  /** 
   * The pass() function
   *  Check if game.active is true
   *   Check if passes left
   *     Remove the current word from the game list
   *     add the next word
   *     set point to 0
   *   
   *  Check if game.active is false
   *  response: you cannnot pass the game
   */
/*
  function pass() {
    if (game.active === true) {
      if (game.maxPasses > 1) {
          game.maxPasses--
          game.word = game.words.shift()
          console.warn (`You have ${game.maxPasses} passes left`)
          return 'New word :' + shuffle(game.word)
      } else { console.warn (`You do not have enough pass. You used three passes`)
                return 'The same word :' + shuffle(game.word)
      }
    } else { 
      return 'You cannot pass the game. Text start() for the pass.'
    }
  }*/