/* global Phaser */

Cooking = Cooking || {};

Cooking.Ingredients = function () {};

Cooking.Ingredients.prototype = 
{
    preload : function ()
    {
        this.add.image(0,0,"ingredients");
        this.mutebtn = this.add.button(1450,50,'mutebutton',this.muteAudio,this);
    },
    
   create : function ()
    {
        var howtobtn = this.add.button(1400, 850, 'backbutton', this.startRestart, this, 1, 0, 2);
        howtobtn.anchor.set(0.5);        
        //this.add.tween(howtobtn).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
        this.add.tween(howtobtn.scale).from( { x:3,y:3 }, 2000, Phaser.Easing.Bounce.Out, true);
        this.add.tween(howtobtn).from( { alpha:0 }, 2000, Phaser.Easing.Bounce.Out, true);
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



