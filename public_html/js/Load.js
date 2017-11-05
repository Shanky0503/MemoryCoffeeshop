/* global Phaser */

var Cooking = Cooking || {};

Cooking.Load = function () {};

Cooking.Load.prototype = 
{
    preload : function ()
    {
        
        this.preLoadBG = this.add.sprite(0,0,'load_bg');
        this.preLoadLogo = this.add.sprite(this.world.centerX,450,'littleMonkeyLogo');
        this.preLoadLogo.anchor.set(0.5);
        this.preLoadLogo.scale.setTo(0.3);
        this.add.tween(this.preLoadLogo.scale).from({x:0.3, y:0},2000,Phaser.Easing.Elastic.Out,true);
        this.preloadBar = this.add.sprite(600, 650, 'loadingBar');
        this.preloadBar.anchor.setTo(0, 0.5);
        this.load.setPreloadSprite(this.preloadBar); 

        this.load.image('empty','Assets/img/empty.png');
        this.load.image('centerBox','Assets/img/centerBox.png');
        this.load.image('recepieBack','Assets/img/recepieBack.png');
        this.load.image('ChocolatePowder','Assets/img/ChocolatePowder.png');
        this.load.image('ChocolateSyrup','Assets/img/ChocolateSyrup.png');
        this.load.image('Espresso','Assets/img/EspressoShot.png');
        this.load.image('HotWater','Assets/img/HotWater.png');
        this.load.image('Marshmallows','Assets/img/Marshmallows.png');
        this.load.image('MilkFoam','Assets/img/MilkFoam.png');
        this.load.image('SteamedMilk','Assets/img/SteamedMilk.png');
        this.load.image('SugarCube','Assets/img/SugarCube.png');
        this.load.image('WhippedCream','Assets/img/WhippedCream.png');
        this.load.image('Game_Background','Assets/img/Game_Background.png');
        this.load.image('CoffeeCup','Assets/img/CoffeeCup.png');
        this.load.image('DoubleEspresso','Assets/img/DoubleEspressoShot.png');
        this.load.image('EspressoCup','Assets/img/EspressoShotCup.png');
        this.load.image('CoffeeCupMask','Assets/img/CoffeeCupMask.png');
        this.load.image('emptysprite','Assets/img/EmptySprite.png');
        this.load.image('ChocolatePowder_coffeecup','Assets/img/ChocolatePowder_coffeecup.png');
        this.load.image('Marshmallows_coffeecup','Assets/img/Marshmallows_coffeecup.png');
        this.load.image('MilkFoam_coffeecup','Assets/img/MilkFoam_coffeecup.png');
        this.load.image('WhippedCream_coffeecup','Assets/img/WhippedCream_coffeecup.png');
        this.load.image('Scoreboard','Assets/img/scoreboard02.png');
        this.load.image('CoffeeShop_Background','Assets/img/CoffeeShop_Background.png');
        this.load.image('Howto','Assets/img/HowTo-02-02-01.png');
        this.load.image('ingredients','Assets/img/ingredients-01.png');
        this.load.image('scoreboardextension','Assets/img/scoreboardextension.png');
        this.load.image('endgame','Assets/img/endgame.png');
        this.load.image('FBUserBackground','Assets/img/FBUserBackground.png');
        
        
        this.load.spritesheet('playbutton','Assets/img/playbutton.png',256,82,3);
        this.load.spritesheet('ingredientsbutton','Assets/img/ingredientsbutton.png',333,91,3);
        this.load.spritesheet('howtobutton','Assets/img/howtobutton02.png',251,88,3);
        this.load.spritesheet('restartbutton','Assets/img/restartbutton.png',200,60,3);
        this.load.spritesheet('sharebutton','Assets/img/sharebutton.png',200,60,3);
        this.load.spritesheet('backbutton','Assets/img/backbutton_03.png',200,60,3);
        this.load.spritesheet('mutebutton','Assets/img/mutebutton-01.png',100,100,2);
        
        
        
        this.load.audio('bgm','Assets/audio/seasonofjoy.mp3');
        this.load.audio('Applause','Assets/audio/Applause.ogg');
        //this.load.audio('BubbleSingle','Assets/audio/BubbleSingle.ogg');
        this.load.audio('BubbleSingle','Assets/audio/BubbleSingle.mp3');
        this.load.audio('WoodSingle','Assets/audio/WoodCrack.mp3');
        this.load.audio('Button01','Assets/audio/Button01.mp3');
        this.load.audio('jingles_Happy','Assets/audio/jingles_Happy.ogg');
        this.load.audio('jingles_Sad','Assets/audio/jingles_Sad.ogg');
        //console.log("Loaded Assets");   
    },
    create: function ()  
    {
//        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//        this.scale.minWidth = 240;
//        this.scale.minHeight = 170;
//        this.scale.maxWidth = 1600;
//        this.scale.maxHeight = 900;
//        this.scale.pageAlignHorizontally = true;
        this.state.start("MainMenu");     
    }    
};