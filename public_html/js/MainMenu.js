/* global Phaser, FB, EZGUI, FBAppID */

Cooking = Cooking || {};

Cooking.MainMenu = function () {};

Cooking.MainMenu.prototype = 
{
    preload : function ()
    {
        this.add.image(0,0,"CoffeeShop_Background");
        this.bgm = this.game.add.audio('bgm');
        this.bgm.volume = 0.1;
        //console.log("Playing audio..");
        this.bgm.loop = true;
        this.bgm.play();
        this.game.buttonAudio = this.game.add.audio("Button01");        
        this.mutebtn = this.add.button(1450,50,'mutebutton',this.muteAudio,this);
        //this.mutebtn.frame = 0;
    },
    
   create : function ()
    {
               
        var playBtn = this.add.button(400, 830, 'playbutton', this.startPlay, this, 1, 0, 1);
        playBtn.anchor.set(0.5);
        this.add.tween(playBtn).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
        
        var ingrediantsbtn = this.add.button(800, 830, 'ingredientsbutton', this.startIngredients, this, 2, 0, 1);
        ingrediantsbtn.anchor.set(0.5);
        this.add.tween(ingrediantsbtn).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
        
        var howtobtn = this.add.button(1200, 830, 'howtobutton', this.startHowTo, this, 1, 0, 1);
        howtobtn.anchor.set(0.5);
        this.howToBtnTween = this.add.tween(howtobtn).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
        
        this.howToBtnTween.onComplete.add((function (){
            var state = this;
            FB.login(function (response) {
                if (response !== null && !response.error) {
                    FB.api(
                            "/me/scores",
                            function (response) {
                                if (response && !response.error) {
                                    topScore = response.data[0].score;
                                    EZGUI.components.scoreLabel.text = "Your top score:\n" + response.data[0].score;
                                    for (var i = 0; i < response.data.length && i < 5;i++) {
                                        var user = new Cooking.FBUser(state,response.data[i].user,response.data[i].score,i * 320 + 10, 840);
                                    }
                                } else {
                                    EZGUI.components.scoreLabel.text = "No scores yet";
                                }
                            }
                    );
                            FB.api(
                            "/" + FBAppID + "/scores",
                            function (response) {
                                if (response && !response.error) {
                                    for (var i = 0; i < response.data.length && i < 5;i++) {
                                        var user = new Cooking.FBUser(state,response.data[i].user,response.data[i].score,i * 320 + 10, 840);
                                    }
                                } 
                            }
                    );
                }
            }, {scope: "user_friends"});
        
        }),this);
        
    }, 
    
    muteAudio : function ()
    {
        
        if (!this.game.sound.mute) 
        {
//            console.log("Changing frame");
            this.mutebtn.frame = 1;
        } 
        else 
        {
            this.mutebtn.frame = 0;
        }        
        this.game.sound.mute =! this.game.sound.mute;  
    },
    
    startPlay : function ()
    {
       this.game.buttonAudio.play();
       this.state.start("Play");  
    },
    
    startIngredients : function ()
    {
        this.game.buttonAudio.play();
        this.state.start("Ingredients");  
    },
    
    startHowTo : function ()
    {
        this.game.buttonAudio.play();
        this.state.start("Howto");  
    }
    

};


