
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update});


 function preload() {
 	//  Load the Google WebFont Loader script
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    
 	//background
 	game.load.image("background", "assets/stars.png");
 	
 	//title assets
 	game.load.image('title', 'assets/title.png');
 	game.load.image('buttonPlay', 'assets/buttonPlay.png');
 	game.load.image('buttonHelp', 'assets/buttonHelp.png');
	
 	
 	//text entry sprite images
	game.load.image('blank', 'assets/entry.svg');
	game.load.image('times', 'assets/times.png');
	
	game.load.image('yellowStar', 'assets/starYellow50pix.png');
	
	//hex sprite images 
	game.load.image('blankHex', 'assets/noNumber.png');
	game.load.image('hex4', 'assets/hex4.png');
	game.load.image('hex6', 'assets/hex6.png');
	game.load.image('hex8', 'assets/hex8.png');
	game.load.image('hex9', 'assets/hex9.png');
	game.load.image('hex10', 'assets/hex10.png');
	game.load.image('hex14', 'assets/hex14.png');
	game.load.image('hex15', 'assets/hex15.png');
	game.load.image('hex20', 'assets/hex20.png');
	game.load.image('hex21', 'assets/hex21.png');
	game.load.image('hex25', 'assets/hex25.png');
	game.load.image('hex27', 'assets/hex27.png');
	game.load.image('hex28', 'assets/hex28.png');
	game.load.image('hex30', 'assets/hex30.png');
	game.load.image('hex12', 'assets/hex12.png');
	game.load.image('hex16', 'assets/hex16.png');
	game.load.image('hex18', 'assets/hex18.png');
	game.load.image('hex24', 'assets/hex24.png');
	game.load.image('hex36', 'assets/hex36.png');
	game.load.image('hex32', 'assets/hex32.png');
	game.load.image('hex35', 'assets/hex35.png');
	game.load.image('hex40', 'assets/hex40.png');
	game.load.image('hex42', 'assets/hex42.png');
	game.load.image('hex45', 'assets/hex45.png');
	game.load.image('hex48', 'assets/hex48.png');
	game.load.image('hex49', 'assets/hex49.png');
	game.load.image('hex54', 'assets/hex54.png');
	game.load.image('hex56', 'assets/hex56.png');
	game.load.image('hex63', 'assets/hex63.png');
	game.load.image('hex64', 'assets/hex64.png');
	game.load.image('hex72', 'assets/hex72.png');
	game.load.image('hex81', 'assets/hex81.png');
	
	//display textures
	game.load.image('endYou', 'assets/endYou.png');
	game.load.image('endWin', 'assets/endWin.png');
	game.load.image('endLose', 'assets/endLose.png');
	game.load.image('ready1', 'assets/ready1.png');
	game.load.image('ready2', 'assets/ready2.png');
	game.load.image('ready3', 'assets/ready3.png');
	
	//sound assets (must be ogg)
	game.load.audio('correct', ['assets/correct-chime.ogg']);
	game.load.audio('incorrect', ['assets/incorrect-chime.ogg']);
	game.load.audio('gameTheme', ['assets/60-second-theme.ogg']);
	game.load.audio('creak1', ['assets/alienCreak1.ogg']);
	game.load.audio('creak2', ['assets/alienCreak2.ogg']);
	game.load.audio('triumph', ['assets/triumph.ogg']);

	
} 


var background;
var boardOffsetX=-170;
var boardOffsetY=50;
var slot1Text;
var slot2Text;
var timerText;

var correctSound;
var incorrectSound;
var gameThemeSound;
var creaksound1;
var creaksound2;
var winSound;

var slotOffsetX=95;
var slotOffsetY=0;
var titleText;

var titlePrompt;
var gameDisplay;



function create() {
	background = game.add.tileSprite(game.world.centerX, game.world.centerY, 1000, 600, "background");
	background.anchor.setTo(0.5, 0.5);
	
	//make the hex sprites, each with their own number
	game.add.sprite(375+boardOffsetX, 20+boardOffsetY, 'hex4').number=1;
	game.add.sprite(440+boardOffsetX, 20+boardOffsetY, 'hex6').number=2;
	game.add.sprite(275+boardOffsetX, 80+boardOffsetY, 'hex8').number=3;
	game.add.sprite(340+boardOffsetX, 80+boardOffsetY, 'hex9').number=4;
	game.add.sprite(405+boardOffsetX, 80+boardOffsetY, 'hex10').number=5;
	game.add.sprite(470+boardOffsetX, 80+boardOffsetY, 'hex14').number=6;
	game.add.sprite(535+boardOffsetX, 80+boardOffsetY, 'hex15').number=7;
	game.add.sprite(245+boardOffsetX, 140+boardOffsetY, 'hex20').number=8;
	game.add.sprite(310+boardOffsetX, 140+boardOffsetY, 'hex21').number=9;
	game.add.sprite(375+boardOffsetX, 140+boardOffsetY, 'hex25').number=10;
	game.add.sprite(440+boardOffsetX, 140+boardOffsetY, 'hex27').number=11;
	game.add.sprite(505+boardOffsetX, 140+boardOffsetY, 'hex28').number=12;
	game.add.sprite(570+boardOffsetX, 140+boardOffsetY, 'hex30').number=13;
	game.add.sprite(275+boardOffsetX, 200+boardOffsetY, 'hex12').number=14;
	game.add.sprite(340+boardOffsetX, 200+boardOffsetY, 'hex16').number=15;
	game.add.sprite(405+boardOffsetX, 200+boardOffsetY, 'hex18').number=16;
	game.add.sprite(470+boardOffsetX, 200+boardOffsetY, 'hex24').number=17;
	game.add.sprite(535+boardOffsetX, 200+boardOffsetY, 'hex36').number=18;
	game.add.sprite(245+boardOffsetX, 260+boardOffsetY, 'hex32').number=19;
	game.add.sprite(310+boardOffsetX, 260+boardOffsetY, 'hex35').number=20;
	game.add.sprite(375+boardOffsetX, 260+boardOffsetY, 'hex40').number=21;
	game.add.sprite(440+boardOffsetX, 260+boardOffsetY, 'hex42').number=22;
	game.add.sprite(505+boardOffsetX, 260+boardOffsetY, 'hex45').number=23;
	game.add.sprite(570+boardOffsetX, 260+boardOffsetY, 'hex48').number=24;
	game.add.sprite(275+boardOffsetX, 320+boardOffsetY, 'hex49').number=25;
	game.add.sprite(340+boardOffsetX, 320+boardOffsetY, 'hex54').number=26;
	game.add.sprite(405+boardOffsetX, 320+boardOffsetY, 'hex56').number=27;
	game.add.sprite(470+boardOffsetX, 320+boardOffsetY, 'hex63').number=28;
	game.add.sprite(535+boardOffsetX, 320+boardOffsetY, 'hex64').number=29;
	game.add.sprite(375+boardOffsetX, 380+boardOffsetY, 'hex72').number=30;
	game.add.sprite(440+boardOffsetX, 380+boardOffsetY, 'hex81').number=31;
	
	//add the text entry sprites to the bottom-left
	game.add.sprite(60+slotOffsetX,545+slotOffsetY, 'blank');
	game.add.sprite(145+slotOffsetX, 545+slotOffsetY, 'times');
	game.add.sprite(230+slotOffsetX, 545+slotOffsetY, 'blank');
	
	//add the text entry text to both box areas
	slot1Text = game.add.text(60+slotOffsetX, 550+slotOffsetY, "", {
        font: "bold 50px Arial",
        fill: "#00000",
        align: "center"
    });
	slot1Text.anchor.setTo(0.5, 0.5);

    slot2Text = game.add.text(225+slotOffsetX, 550+slotOffsetY, "", {
        font: "bold 50px Arial",
        fill: "#000000",
        align: "center"
    });
    slot2Text.anchor.setTo(0.5, 0.5);
    
    //the timertext is big and starts off green. The update function turns it
    //yellow then red
    timerText = game.add.text(620, 300, "60", {
        font: "bold 200px Arial",
        fill: "green",
        align: "center"
    });
    timerText.anchor.setTo(0.5, 0.5);
    
    
    
    game.world.forEach(function(item) 
		{
				item.anchor.setTo(0.5, 0.5); //centers the sprites
				item.alpha = 0;
		});
	
    //title stuff
    titleText = game.add.sprite(game.world.centerX, game.world.centerY-100, 'title');
    titleText.anchor.set(0.5);
    game.add.tween(titleText).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
    
    titlePrompt = game.add.text(150, 400, "Press space to start.", {
        font: "bold 50px Arial",
        fill: "blue",
        align: "center"
    });
    
    titlePrompt.alpha=0;
    timerText.anchor.setTo(0.5, 0.5);
    timerText.alpha=0;
    

    //endGame stuff
    gameDisplay=game.add.sprite(game.world.centerX,game.world.centerY, 'endYou');
    gameDisplay.anchor.setTo(0.5, 0.5);
    gameDisplay.alpha=0;
    
    
    //create sounds
    correctSound = game.add.audio('correct');
    incorrectSound = game.add.audio('incorrect');
    incorrectSound.volume = 0.3;
    correctSound.volume = 0.3;
    gameThemeSound = game.add.audio('gameTheme');
    winSound = game.add.audio('triumph');
    creaksound1 = game.add.audio('creak1');
    creaksound2 = game.add.audio('creak2');
    
   	game.physics.startSystem(Phaser.Physics.ARCADE);
   	emitter = game.add.emitter(0, 0, 100);
   	emitter.makeParticles('yellowStar');
   	emitter.gravity = -200;
}

// this is the list of hex products.
var productList = [
       4,6,
  8,9,10,14,15,
20,21,25,27,28,30,
 12,16,18,24,36,
32,35,40,42,45,48,
  49,54,56,63,64,
      72,81
];


var gameState ="title";
var currentHex = 1;
var typedProduct = 0;

var lastKey = 0;  //this and keyStillDown are used to prevent keypresses over
var keyStillDown = 0; //multiple cycles

var factorSlot1 = 0;
var factorSlot2 = 0;
var emptySlot = 1;

//these are needed in order to validate the double factor pair hexes in the
//middle row
var oldFactor1 = 0;
var oldFactor2 = 0;
var lastGood1 = 0;
var lastGood2 = 0;


var rotationSlowness = 10;
var rotationFrame = 0;
var timeLeft;
var score;

var yellowStyle = {font:"bold 200px Arial", fill:"yellow"};
var redStyle = {font:"bold 200px Arial", fill:"red"};

var startTime;
var gameReady = 0;
var playerWin;


//***************************************************************************
//**************************** MAIN LOOP ************************************
//***************************************************************************

function update() {
	switch(gameState) {
    case "title":
    	title();
        break;
        
    case "game":
    	timerBehaviour();
	
		slotText();
	
		game.world.forEach(function(item) 
		{
			if(currentHex == item.number)
			{
				currentHexBehaviour(item);
			}
		});
	 
		setSlots();
	
		keyboardScan();
		checkWin();
        break;
        
    case "endGame":
    	endGameDelay();
    	break;
    	
    case "enteringInitials":
    	scoreTableEnterIntials();
    	break;
    	
	}

	 
}
//****************************************************************************

var titlePromptAlpha = 0;
var promptWait = 100;
var titleOver = 0;
function title()
{
	gameDisplay.alpha=0;
	background.alpha=1;
	if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
	{
		titleOver=1;
	}
	if(promptWait==0)
	{
		titlePrompt.alpha = titlePromptAlpha;
		if(titlePromptAlpha<1)
		{
			titlePromptAlpha = titlePromptAlpha+0.01;
		}
	} else
	{
		promptWait--;
	}
	
	if(titleOver==1)
	{
		startGame();
	}
	
}

function startGame()
{
	if(gameReady==0)  //run the readySetGo() function which will set gameReady
	{
		titlePromptAlpha=0;
		titlePrompt.alpha=0;
		titleText.alpha=0;
		readySetGo();
	} else  //actually start the game
	{
		startTime=Math.round(game.time.totalElapsedSeconds() );
		gameState="game";
		showBoard();
		gameDisplay.alpha=0;
		titlePromptAlpha=0;
		titlePrompt.alpha=0;
		titleText.alpha=0;
	}
}

//shows the three starting cards with delay
var readyTimer = 180;
var readyCard = 1;
function readySetGo()
{
	gameDisplay.alpha=1;
	if(readyTimer==180)
	{
		gameThemeSound.play();  //theme is long enough for intro and game
	}
	
	if(readyTimer==120)
	{
		readyCard=2;
	}
	
	if(readyTimer==60)
	{
		readyCard=3;
	}
	
	switch(readyCard) {
    case 1:
        gameDisplay.loadTexture('ready1', 0);
        break;
    case 2:
        gameDisplay.loadTexture('ready2', 0);
        break;
    case 3:
        gameDisplay.loadTexture('ready3', 0);
        break;
}
	
	
	readyTimer--;
	
	if(readyTimer ==0)
	{
		gameReady=1;
	}
	
	
}

function showBoard()
{
	game.world.forEach(function(item) 
		{
				item.alpha = 1;
		});
}

function clearBoard()
{
	game.world.forEach(function(item) 
		{
				item.alpha = 0;
		});
	background.alpha=1;  //don't get rid of the background
}


//This timer counts down the time left and changes color to yellow then red.
function timerBehaviour()
{
	//display the time left to the game
	timeLeft = startTime + 60-Math.round(game.time.totalElapsedSeconds()  );
	score = 6000-Math.round((startTime+60-game.time.totalElapsedSeconds())*100);
	timerText.setText(timeLeft ) ;
	
	//change color if the user is running out of time	
	if(timeLeft == 30) //signal a yellow warning
	{
		timerText.setStyle(yellowStyle);	
	}
	
	if(timeLeft == 10) //signal a red warning
	{
		timerText.setStyle(redStyle);	
	}
	
	if(timeLeft <0) //hide
	{
		timerText.alpha = 0;	
	}
}


//display the typed factors, but don't display them if they're blank
function slotText()
{
	if(factorSlot1 >0)
	{
		slot1Text.setText(factorSlot1);
	} else
	{
		slot1Text.setText("");
	}
		if(factorSlot2 >0)
	{
		slot2Text.setText(factorSlot2);
	} else
	{
		slot2Text.setText("");
	}
}

// Set the empty slot as 1 or 2.  If neither is empty, calculate the typedProduct and clear the slots.
function setSlots()  
{
	if(factorSlot1 == 0)
		{
			emptySlot = 1;
		} else
		{
			if(factorSlot2 == 0)
			{
				emptySlot = 2;
			} else //the user has typed in both slots, calculate the product
			{
				typedProduct = factorSlot1*factorSlot2;
				
				//these will be used to compare agains the buffered lastGood answers
				oldFactor1=factorSlot1;
				oldFactor2=factorSlot2;
			
			//this delays the clearing of the slots so we can see what was typed
			setTimeout(function(){
	    			factorSlot1=0;
					factorSlot2=0;
			}, 40);	

				
			}
		}
}

function currentHexBehaviour(item)
{
			//this rotates the sprite between 2 and -2 degrees every 
			//rotationSlowness number of cycles
			if(rotationFrame == rotationSlowness)
			{
				rotationFrame = 0;
				if(item.angle == -2)
				{
					item.angle = 2;
				} else
				{
					item.angle = -2;
				}
			} else
			{
				rotationFrame++;
			}

			if(typedProduct == productList[item.number-1]) //user was right
			{
				if(item.number-1 < 13 || item.number-1 > 17) //simple hexes
				{
					currentHex = currentHex+1;
					item.angle = 0;
					particleBurst(item);
					item.loadTexture("blankHex");	//switch to a blank
				} else  //middle row
				{
					if(oldFactor1*oldFactor2 == lastGood1*lastGood2) //we're not considering a checksum of the previous hex
					{
						
						if(oldFactor1+oldFactor2 != lastGood1+lastGood2) //two checksums of the factors are different
						{
							currentHex = currentHex+1;
							particleBurst(item);
							item.loadTexture("blankHex");	//switch to a blank
							item.angle = 0;
						} 
					}
					lastGood1=oldFactor1;  //these are a buffer of the last right answers
					lastGood2=oldFactor2;
				}

			} else //user was wrong
			{
				typedProduct = 0; 
			} 
}


// Check for keyboard input
function keyboardScan()
{
var numKey;
	var i;
	for (i = 2; i <= 9; i++) {
		numKey = i.toString().charCodeAt(0);
		//console.log("current numkey = " + numKey);
        if (game.input.keyboard.isDown(numKey)) {
        	if(keyStillDown == 0) {//only process it once 
	    		keyStillDown = 1;
	    		lastKey = i;
				if(emptySlot == 1)  //set the correct slot's factor
				{
					factorSlot1 = i;
				} else {
					factorSlot2 = i;
					
					//this tests to see if after the second factor is entered, if the answer is valid, then plays the appropriate sound
					//the keyStillDown logic prevents the sound from being played twice
					if(factorSlot1*factorSlot2 != productList[currentHex-1]) {
						incorrectSound.play();
					} else {
						correctSound.play();
					}
				}	
    		}
    	} else //the key isn't down anymore
	    {
	    	if(lastKey == i)
	    	{
	    		lastKey = 0; //reset
	    		keyStillDown = 0; //make way for a new key
	    	}
	    }
    }
}

//determines playerWin and does the one-off stuff that comes at the end of the game
function checkWin()
{
	if(timeLeft<0)
	{
		clearBoard();
		gameDisplay.loadTexture('endYou', 0);
		gameState="endGame";
		creaksound1.play();
		playerWin = 0;
		gameDisplay.alpha=1;
	}
	
	if(currentHex==32)
	{
		clearBoard();
		gameDisplay.loadTexture('endYou', 0);
		gameState="endGame";
		playerWin = 1;
		gameThemeSound.pause();
		winSound.play();
		gameDisplay.alpha=1;
	}
}


function endGameDelay()
{
	gameState = "endGameTitle"
	game.time.events.add(Phaser.Timer.SECOND * 1, endGameMessage);
}

//shows the correct display starting with "YOU" and then "WIN!" or "LOSE!"
var endGameDone = false;
function endGameMessage()
{
	if(endGameDone == false)
	{
		endGameDone=true;
		if(playerWin==1 )
		{
			gameDisplay.loadTexture('endWin', 0);
			game.time.events.add(Phaser.Timer.SECOND * 1.5, scoreTableCheck);
		} else
		{
			gameDisplay.loadTexture('endLose', 0);
			game.time.events.add(Phaser.Timer.SECOND * 1.5, scoreTableCheck);
		}
	}
	
}

//this comes from the particleBurst tutorial
function particleBurst(pointer) {
    emitter.x = pointer.x;
    emitter.y = pointer.y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    emitter.start(true, 2000, null, 20);

}
