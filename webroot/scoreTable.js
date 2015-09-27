var scoreTable = { }
var WebFontConfig = {

        //  'active' means all requested fonts have finished loading
        //  We set a 1 second delay before calling 'createText'.
        //  For some reason if we don't the browser cannot render the text the first time it's created.

        //  The Google Fonts we want to load (specify as many as you like in the array)
        google: {
          families: ['Michroma']
        }

    };
    
var newTopSpot = null;
var initialSprites = [];
var initialInstructions;
var initialAnnouncement;
// function deleteBadTable()
// {
    

//                 $.ajax({
//                 url: "https://openws.herokuapp.com/60ss/5606e0998ae3f903004b2001?apiKey=0527e44c67c8d70e86a8e8a77f1e0bbb",
//                 type: 'DELETE',
//                 success: function(result) {
//                       console.log('done');
//                     },
//                     error: function() {
//                       console.log("Error");
//                     }
//                 });    
// }

function scoreTableCheck() 
{
    gameDisplay.alpha = 0;
    $.get("https://openws.herokuapp.com/60ss?apiKey=0527e44c67c8d70e86a8e8a77f1e0bbb")
    .done(function(data) {
          console.log("Table retrieved.");
          scoreTable.initials = data[0].initials;
          scoreTable.scores = data[0].scores;
          
          console.log(scoreTable)
        for(var i = 0 ; i < 10 ; i ++)
        {
            console.log("Spot" + i + ": " + scoreTable.scores[i])
            if(score <= scoreTable.scores[i] && newTopSpot == null)
            {
                newTopSpot = i;
            }
        }
        
        if(newTopSpot == null)
        {
            scoreTableShow ();
        } else
        {
            announceNewTop();
        }
        
        function announceNewTop()
        {
            initialAnnouncement = game.add.text(50,500,'NEW HIGH SCORE!')
            initialAnnouncement.font = 'Michroma';
            initialAnnouncement.fontSize = 54;
            initialAnnouncement.fill = '#FFFFFF';
            initialAnnouncement.align = 'center';   
            game.time.events.add(Phaser.Timer.SECOND * 1.5, scoreTableNewInitials);
            
        }
    });
    
    
    
    function scoreTableNewInitials()
    {
        //display instructions
        //build the 3 initial sprites
        initialInstructions = game.add.text(50,50,'Enter your initials by using the arrow keys.  Press space when you are done.')
        initialInstructions.font = 'Michroma';
        initialInstructions.fontSize = 26;
        initialInstructions.fill = '#FFFFFF';
        initialInstructions.align = 'center';   
        initialInstructions.wordWrap =  true;
        initialInstructions.wordWrapWidth = 700; 
        
        for(var i = 0 ; i < 3 ; i++)
        {
            initialSprites[i] = game.add.text(250+i*150,300,'A')
            initialSprites[i].font = 'Michroma';
            initialSprites[i].fontSize = 96;
            initialSprites[i].fill = '#FFFFFF';
            initialSprites[i].anchor.setTo(0.5,0.5)
        }
        initialSprites[initialEntering].fontSize = 120;
        gameState = "enteringInitials"
    }
}

function scoreTableShow ()
{
    console.log("displaying scoreboard")
    var boardSlotsInitials = []
    var boardSlotsScores = []
    for(var i = 0 ; i < 10 ; i++)
    {
        boardSlotsInitials[i] = game.add.text(300,40+i*50,scoreTable.initials[i] )
        boardSlotsInitials[i].font = 'Michroma';
        boardSlotsInitials[i].fontSize = 42;
        boardSlotsInitials[i].fill = '#FFFFFF';
        boardSlotsInitials[i].anchor.setTo(0.5,0)
        boardSlotsInitials[i].scale.setTo(0,0)
        game.add.tween(boardSlotsInitials[i].scale).to( {x:1,y:1}, 800+i*200, Phaser.Easing.Bounce.Out, true);
        
        boardSlotsScores[i] = game.add.text(500,40+i*50,(scoreTable.scores[i]/100).toFixed(2))
        boardSlotsScores[i].font = 'Michroma';
        boardSlotsScores[i].fontSize = 42;
        boardSlotsScores[i].fill = '#FFFFFF';
        boardSlotsScores[i].anchor.setTo(0.5,0)
        boardSlotsScores[i].scale.setTo(0,0)
        game.add.tween(boardSlotsScores[i].scale).to( {x:1,y:1}, 800+(10-i)*200, Phaser.Easing.Bounce.Out, true);
    }
    //to do - show scoreboard
};

var initialKeyPressed = false;
var initialsEntered = [0,0,0];
var initialEntering = 0;

function scoreTableEnterIntials()
{
        var cursors = game.input.keyboard.createCursorKeys();
        if (cursors.up.isDown)
        {
            if(initialKeyPressed == false)
            {
                initialKeyPressed = true;
                initialsEntered[initialEntering]++;
                if(initialsEntered[initialEntering]>25)
                {
                   initialsEntered[initialEntering] = 0 
                }
            }
        } else if (cursors.right.isDown)
        {
            if(initialKeyPressed == false)
            {
                initialKeyPressed = true;
                initialEntering++;
                if(initialEntering>2)
                {
                   initialEntering = 0;
                }
            }
        } else if (cursors.down.isDown)
        {
            if(initialKeyPressed == false)
            {
                initialKeyPressed = true;
                initialsEntered[initialEntering]--;
                if(initialsEntered[initialEntering]<0)
                {
                   initialsEntered[initialEntering] = 25;
                }
            }
        } else if (cursors.left.isDown)
        {
            if(initialKeyPressed == false)
            {
                initialKeyPressed = true;
                initialEntering--;
                if(initialEntering<0)
                {
                   initialEntering = 2;
                }
            }
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    	{
    		if(initialKeyPressed == false)
            {
                initialKeyPressed = true;
                gameState = ""
                 var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
                var newInitials = letters[initialsEntered[0]]+letters[initialsEntered[1]]+letters[initialsEntered[2]]
                console.log(scoreTable)
                scoreTable.initials.splice(newTopSpot, 0, newInitials)
                scoreTable.scores.splice(newTopSpot, 0, score)
                console.log(scoreTable)
                scoreTableSave();
                for(var i = 0 ; i < 3 ; i++)
                {
                    game.world.remove(initialSprites[i]);
                }
                game.world.remove(initialInstructions);
                game.world.remove(initialAnnouncement);
                scoreTableShow();
            }
            
    	} else
        { 
            initialKeyPressed = false;  
        }
        
        if(initialKeyPressed == true)
        {
            var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
            for(var i = 0 ; i < 3 ; i++)
            {
                initialSprites[i].text = letters[initialsEntered[i]];
                initialSprites[i].fontSize = 96;
                
            }
            initialSprites[initialEntering].fontSize = 120;
        }
        
}

function scoreTableSave()
{
    $.ajax({
      url: "https://openws.herokuapp.com/60ss/5606e0438ae3f903004b2000?apiKey=0527e44c67c8d70e86a8e8a77f1e0bbb",
      type: "PUT",
      data: scoreTable
    })
    .done(function(data) {
      console.log("Table set successfully");
    });
}
    
function scoreTableClear ()
{
    scoreTable.initials = ['JBG','JBG','JBG','JBG','JBG','JBG','JBG','JBG','JBG','JBG']
    scoreTable.scores = ['5999','5999','5999','5999','5999','5999','5999','5999','5999','5999']

   $.ajax({
      url: "https://openws.herokuapp.com/60ss/5606e0438ae3f903004b2000?apiKey=0527e44c67c8d70e86a8e8a77f1e0bbb",
      type: "PUT",
      data: scoreTable
    })
    .done(function(data) {
      console.log("Table reset successfully");
    });
};
