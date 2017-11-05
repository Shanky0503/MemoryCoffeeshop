/* global Phaser, score, topScore, FB, EZGUI, FBAppID */


Cooking = Cooking || {};

Cooking.EndGame = function () {};

Cooking.EndGame.prototype = 
{
    preload : function ()
    {
        this.add.image(0,0,"endgame");
        this.mutebtn = this.add.button(1450,50,'mutebutton',this.muteAudio,this);
        this.applause = this.game.add.audio('Applause');
    },
    
    create : function ()
    {
        var restartBtn = this.add.button(1400, 830, 'restartbutton', this.startRestart, this, 1, 0, 1);
        restartBtn.anchor.set(0.5);
        //howtobtn.scale.x = -1;
        restartBtn.scale.x = 0.2;
        restartBtn.scale.y = 0.2;
        this.add.tween(restartBtn.scale).to({x:1, y:1},1500,Phaser.Easing.Elastic.Out,true);       
        this.add.tween(restartBtn).from( { alpha:0 }, 2000, Phaser.Easing.Bounce.Out, true); 
         var restartBtn = this.add.button(1150, 830, 'sharebutton', this.shareFacebook, this, 1, 0, 1);
        restartBtn.anchor.set(0.5);
        //howtobtn.scale.x = -1;
        restartBtn.scale.x = 0.2;
        restartBtn.scale.y = 0.2;
        this.add.tween(restartBtn.scale).to({x:1, y:1},1500,Phaser.Easing.Elastic.Out,true);       
        this.add.tween(restartBtn).from( { alpha:0 }, 2000, Phaser.Easing.Bounce.Out, true); 
//        console.log("Score : "+ this.game.finalTotal);        
        this.finalScoreText = this.add.text(this.world.centerX,525,"$" + this.game.finalTotal,{font:"120px milkshake",align:"center", fill:"#ffffff"});
        this.applause.play();
        this.finalScoreText.anchor.set(0.5);
        this.finalScoreText.bringToTop();
        this.finalScoreText.scale.x = 0.2;
        this.finalScoreText.scale.y = 0.2;
        this.add.tween(this.finalScoreText.scale).to({x:1, y:1},1500,Phaser.Easing.Elastic.Out,true); 
        
        
        var state = this;
        FB.api(
            "/" + FBAppID + "/scores",
            function (response) {
//                    console.log(response);
//                    console.log(response.data);
                if (response && !response.error) {
                    for (var i = 0; i < response.data.length && i < 5;i++) {
                        var user = new Cooking.FBUser(state,response.data[i].user,response.data[i].score,i * 320 + 10, 840);
                    }
                } 
            }
        );              
        
         /* make the API call */
        var FBscore = this.game.finalTotal;
        var fullScore = FBscore * 100;
//        var FBscore = 0;
//        FBscore.toString();
        var newTopScore = true;
        if (FBscore > topScore) {
            newTopScore = true;
            FB.login(function (response) {
                FB.api(
                        "/me/scores",
                        "POST",
                        {
                            "score" :""+fullScore
                        }
                );
            }, {scope: 'publish_actions'});
        }
    }, 
    
    shareFacebook : function () {
//        console.log("sharing in facebook");
       FB.ui(
        {
         method: 'share',
         href: 'https://apps.facebook.com/1868391540101661'
        }, function(response){});        
    },
    
    muteAudio : function ()
    {
        
        if (!this.game.sound.mute) 
        {
            this.mutebtn.frame = 1;
        } 
        else 
        {
            this.mutebtn.frame = 0;
        }        
        this.game.sound.mute =! this.game.sound.mute;  
    },
    
    startRestart : function ()
    {   
        this.game.buttonAudio.play();
        this.state.start("MainMenu");       
    }    
    
};