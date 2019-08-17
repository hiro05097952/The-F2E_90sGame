const w = 1280;
const h = 593;
let time = '';
const gamestart = {
    key: 'gamestart',
    preload (){
        this.load.image('road', '../../static/image/road.png');
        this.load.image('city', '../../static/image/city.png');
        this.load.image('sky2', '../../static/image/sky2.png');
        this.load.image('smoke1', '../../static/image/smoke1.png');

        this.load.image('stone', '../../static/image/villain4.png');
        this.load.svg('money_icon', '../../static/image/icon_money.svg');
        this.load.svg('heart', '../../static/image/heart.svg');

        this.load.image('start', '../../static/image/start.png');
        this.load.image('fadatsai', '../../static/image/fadatsai.png');
        this.load.svg('key_up', '../../static/image/key_up.svg');
        this.load.svg('key_down', '../../static/image/key_down.svg');

        this.load.spritesheet('user', '../../static/image/handow.png', {frameWidth: 358, frameHeight: 349})
    },
    create (){
        let vm = this
        // 資源載入完成，加入遊戲物件及相關設定
        // 背景圖
        this.add.tileSprite(w/2, h/2, w, 593, 'sky2');
        this.add.tileSprite(w/2, 237, w, 270, 'city');
        this.add.tileSprite(w/2, 475, w, 280, 'road');
        this.add.tileSprite(w/2, h/2, w, 230, 'smoke1');
        // 生命
        this.add.image(80, 70, 'heart').setScale(0.8)
        this.add.image(140, 70, 'heart').setScale(0.8)
        this.add.image(200, 70, 'heart').setScale(0.8)
        // 時間
        time = 90
        const timeText = this.add.text(500, 35, `T i m e  :  ${time}`,{
            fontFamily: ['acme'],
            fontSize: 60,
            color: 'black',
        })
        // 金幣(右上角)
        this.add.image(1050, 70, 'money_icon').setScale(0.8)
        this.add.text(1100, 40, `x  ${0}`,{
            fontFamily: ['acme'],
            fontSize: 50,
            color: 'black',
        })

        // 主角，變小0.7倍 + 設定碰撞邊框 + z-index
        this.add.sprite(w/4, h/1.6, 'user').setScale(0.7).setDepth(5)
        
        // 發大財
        this.add.image(850, 230, 'fadatsai').setScale(0.6)
        this.add.image(800, 500, 'key_up').setScale(0.6)
        this.add.image(900, 500, 'key_down').setScale(0.6)
        const start = this.add.image(850, 410, 'start').setScale(0.6).setInteractive()
        start.on('pointerdown', ()=>{
            vm.scene.start('gameRun')
        })
    },
}
const gameRun = {
    key: 'gameRun',
    preload: function(){
        // 載入資源
        this.load.image('road', '../../static/image/road.png');
        this.load.image('city', '../../static/image/city.png');
        this.load.image('sky1', '../../static/image/sky1.png');
        this.load.image('smoke1', '../../static/image/smoke1.png');

        this.load.image('villain1', '../../static/image/1450.png');
        this.load.image('villain2', '../../static/image/villain2.png');
        this.load.image('villain3', '../../static/image/villain3.png');
        this.load.image('villain4', '../../static/image/villain4.png');

        this.load.svg('heart', '../../static/image/heart.svg');
        this.load.svg('money_icon', '../../static/image/icon_money.svg');
        this.load.svg('money1', '../../static/image/money1.svg');
        this.load.svg('money3', '../../static/image/money3.svg');
        this.load.svg('line', '../../static/image/line.svg');
        this.load.svg('ribbon', '../../static/image/ribbon.svg');
        this.load.svg('warning', '../../static/image/warning.svg');
        this.load.image('restart', '../../static/image/restart.png');
        this.load.image('blinblin', '../../static/image/blinblin.png');

        this.load.audio('musicMain', '../../static/audio/main.mp3');
        this.load.audio('musicFadatsai', '../../static/audio/fadatsai.m4a');
        this.load.audio('musicHurt', '../../static/audio/hurt.m4a');
        this.load.audio('musicLose', '../../static/audio/lose.m4a');
        this.load.audio('musicWin', '../../static/audio/win.m4a');

        this.load.spritesheet('user', '../../static/image/handow.png', {frameWidth: 358, frameHeight: 349})
    },
    create: function(){
        let vm = this
        // 資源載入完成，加入遊戲物件及相關設定
        // 背景圖
        this.sky1 = this.add.tileSprite(w/2, h/2, w, 593, 'sky1');
        this.city = this.add.tileSprite(w/2, 237, w, 270, 'city');
        this.road = this.add.tileSprite(w/2, 475, w, 280, 'road');
        this.smoke1 = this.add.tileSprite(w/2, h/2, w, 230, 'smoke1');
        // 生命
        this.heart1 = this.add.image(80, 70, 'heart').setScale(0.8)
        this.heart2 = this.add.image(140, 70, 'heart').setScale(0.8)
        this.heart3 = this.add.image(200, 70, 'heart').setScale(0.8)
        // 時間
        time = 90
        const timeText = this.add.text(500, 35, `T i m e  :  ${time}`,{
            fontFamily: ['acme'],
            fontSize: 60,
            color: 'black',
        })
        let countDown = setInterval( ()=>{
            time --
            timeText.setText(`T i m e  :  ${time}`)
            if(time === 0){
                clearInterval(countDown)
            }
        },1000)
        // 金幣(右上角)
        let moneyQ = 0
        this.moneyIcon = this.add.image(1050, 70, 'money_icon').setScale(0.8)
        const moneyText = this.add.text(1100, 40, `x  ${moneyQ}`,{
            fontFamily: ['acme'],
            fontSize: 50,
            color: 'black',
        })
        // 金幣(路上)
        this.moneyGroup = this.physics.add.group({
            defaultKey: 'money1',
        })
        const timer1 = this.time.addEvent({
            delay: 4000,
            repeat: 1,
            callback: addmoney
        })
        function addmoney() {
            let randomNum = Math.floor(Math.random()*3)
            switch (randomNum) {
                case 0:
                    vm.moneyGroup.create(1350, 400, 'money1')
                    break;
                case 1:
                    vm.moneyGroup.create(1350, 480, 'money1')
                    break;
                case 2:
                    vm.moneyGroup.create(1350, 560, 'money1')
                    break;
            }
        }
        // 音樂載入
        const musicMain = this.sound.add('musicMain')
        const musicHurt = this.sound.add('musicHurt')
        const musicLose = this.sound.add('musicLose')
        const musicWin = this.sound.add('musicWin')
        const musicFadatsai = this.sound.add('musicFadatsai')
        musicMain.play()


        // 敵人團體
        // 跑道1Y: 395
        this.villainGroup = this.physics.add.group({
            defaultKey: 'villain',
        });

        // 敵人資訊
        // 1450 1Y:320 2Y:400 3Y:480
        // this.villainGroup.create(1180, 480,'villain1').setScale(0.7).setSize(200,80,0).setOffset(0, 235)
        // 老蔡 1Y:320 2Y:400 3Y:480 
        // this.villainGroup.create(930, 400,'villain2').setScale(0.7).setSize(250,80,0).setOffset(0, 220)
        // 蚊子 1Y:360  2Y:440  3Y:520
        // this.villainGroup.create(550, 440,'villain3').setSize(120,40,0).setOffset(0, 90)
        // 石頭 1Y:400  2Y: 480  3Y:560
        // this.villainGroup.create(750, 400,'villain4').setSize(70,50,0).setOffset(0, 10)
        
        // 每幾秒調用新增敵人
        const timer2 = this.time.addEvent({
            delay: 1800,
            loop: true,
            callback: addvillain
        })
        
        function addvillain() {
            if(time > 70 && time <= 90){
                let randomRoad = Math.floor(Math.random()*6)
                switch (randomRoad) {
                    case 0:
                        vm.villainGroup.create(1400, 400,'villain4')
                        break;
                    case 1:
                        vm.villainGroup.create(1400, 480,'villain4')
                        break;
                    case 2:
                        vm.villainGroup.create(1400, 560,'villain4')
                        break;
                    case 3:
                        vm.villainGroup.create(1400, 360,'villain3')
                        break;
                    case 4:
                        vm.villainGroup.create(1400, 440,'villain3')
                        break;
                    case 5:
                        vm.villainGroup.create(1400, 520,'villain3')
                        break;
                }
            }else if(time > 30 && time <= 70){
                let randomRoad = Math.floor(Math.random()*9)
                switch (randomRoad) {
                    case 0:
                        vm.villainGroup.create(1400, 320,'villain1')
                        break;
                    case 1:
                        vm.villainGroup.create(1400, 400,'villain1')
                        break;
                    case 2:
                        vm.villainGroup.create(1400, 480,'villain1')
                        break;
                    case 3:
                        vm.villainGroup.create(1400, 360,'villain3')
                        break;
                    case 4:
                        vm.villainGroup.create(1400, 440,'villain3')
                        break;
                    case 5:
                        vm.villainGroup.create(1400, 520,'villain3')
                        break;
                    case 6:
                        vm.villainGroup.create(1400, 480,'villain4')
                        vm.villainGroup.create(1400, 320,'villain1')
                        break;
                    case 7:
                        vm.villainGroup.create(1400, 560,'villain4')
                        vm.villainGroup.create(1400, 400,'villain1')
                        break;
                    case 8:
                        vm.villainGroup.create(1400, 560,'villain4')
                        vm.villainGroup.create(1400, 360,'villain3')
                        break;
                }
            }else if(time > 4 && time <= 30){
                let randomRoad = Math.floor(Math.random()*9)
                switch (randomRoad) {
                    case 0:
                        vm.villainGroup.create(1400, 320,'villain1')
                        break;
                    case 1:
                        vm.villainGroup.create(1400, 400,'villain1')
                        break;
                    case 2:
                        vm.villainGroup.create(1400, 480,'villain1')
                        break;
                    case 3:
                        vm.villainGroup.create(1400, 320,'villain2')
                        vm.villainGroup.create(1400, 400,'villain1')
                        break;
                    case 4:
                        vm.villainGroup.create(1400, 400,'villain2')
                        break;
                    case 5:
                        vm.villainGroup.create(1400, 400,'villain1')
                        vm.villainGroup.create(1400, 520,'villain3')
                        break;
                    case 6:
                        vm.villainGroup.create(1400, 480,'villain4')
                        vm.villainGroup.create(1400, 320,'villain2')
                        break;
                    case 7:
                        vm.villainGroup.create(1400, 560,'villain4')
                        vm.villainGroup.create(1400, 400,'villain1')
                        break;
                    case 8:
                        vm.villainGroup.create(1400, 560,'villain4')
                        vm.villainGroup.create(1400, 400,'villain2')
                        break;
                }
            }

            // 終點線與金幣
            if(time === 4){
                vm.line = vm.add.image(1400, 460, 'line').setScale(0.6)
                vm.money3 = vm.add.image(1900, 440, 'money3').setScale(0.6)
            }
            if(time === 0){
                vm.add.image(w/2, 400, 'ribbon').setScale(0.6)
                vm.add.image(w/2, 270, 'restart').setScale(0.8)
                vm.add.image(w/2, 170, 'warning').setScale(0.6)
                vm.add.image(w/4.5, h/1.6, 'blinblin').setScale(0.6)
                musicWin.play()
            }
        }


        // 主角，變小0.7倍 + 設定碰撞邊框 + z-index
        this.player = this.physics.add.sprite(w/4, h/1.6, 'user').setScale(0.7).setSize(250, 90, 0).setOffset(0, 290).setDepth(5)
        // 跑起來
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('user', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: 1
        })
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('user', { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        })
        this.anims.create({
            key: 'winner',
            frames: this.anims.generateFrameNumbers('user', { start: 1, end: 2 }),
            frameRate: 4,
            repeat: -1
        })
        // 世界邊界設定
        this.player.setCollideWorldBounds()
        this.physics.world.setBounds(0,h-225,1280,225)      


        const key_up = this.input.keyboard.addKey('up')
        const key_down = this.input.keyboard.addKey('down')
        
        key_up.on('down',()=>{
            vm.player.y -= 81
        })
        key_down.on('down',()=>{
            vm.player.y += 81
        })                

        // 設定碰撞(主角與怪物)
        const villainCollider = this.physics.add.collider(this.player, this.villainGroup, villainCallback)
        function villainCallback(player, villain){
            if(vm.heart3.visible){
                vm.heart3.visible = false
                vm.heart3.active = false
            }else if(vm.heart2.visible) {
                vm.heart2.visible = false
                vm.heart2.active = false
            }else{
                vm.heart1.visible = false
                vm.heart1.active = false
                // game over
                vm.scene.start('gameover')
                clearInterval(countDown)
                musicMain.stop()
                musicLose.play()
            }
            // 碰撞怪物消失
            villain.visible = false
            villain.active = false
            // 碰撞後主角3秒無敵時間(消除碰撞，三秒後重啟)
            villainCollider.active = false
            let alpha = setInterval(()=>{
                player.setAlpha(0.8)
            },100)
            let alphaClear = setInterval(()=>{
                player.setAlpha(1)
            },200)
            setTimeout(()=>{                        
                villainCollider.active = true
                clearInterval(alpha)
                clearInterval(alphaClear)
            },3000)
            // 碰撞音樂
            musicHurt.play()
        }
        // 碰撞 主角與金幣
        const moneyCollider = this.physics.add.collider(this.player, this.moneyGroup, moneyCallback)
        function moneyCallback(player, money){
            money.visible = false
            money.active = false
            moneyQ ++
            moneyText.setText(`x  ${moneyQ}`)
            // 碰撞音樂
            musicFadatsai.play()
        }
        // 碰撞 金幣與怪物
        const moneyCollider2 = this.physics.add.collider(this.villainGroup, this.moneyGroup, moneyCallback2)
        function moneyCallback2(villain, money){
            money.x += 200 
        }
    },
    update: function(){
        // 遊戲狀態更新
        this.sky1.tilePositionX += 1
        this.city.tilePositionX += 2
        this.road.tilePositionX += 5
        this.smoke1.tilePositionX += 1
        

        if(this.input.keyboard.keys[38].isDown){
            this.player.anims.play('jump',true)
        }else if(this.input.keyboard.keys[40].isDown){
            this.player.anims.play('jump',true)
        }else if(time !== 0){
            this.player.anims.play('run',true)
        }else{
            this.player.anims.play('winner',true)
        }
        
        // IncX 在Ｘ軸上跑
        // 敵人
        let vm = this
        Phaser.Actions.IncX(this.villainGroup.getChildren(), -5);
        this.villainGroup.children.iterate(function (item) {    
            // 設定碰撞領域
            switch (item.texture.key) {
                case 'villain1':
                    item.setScale(0.7).setSize(200,80,0).setOffset(0, 235)
                    break;
                case 'villain2':
                    item.setScale(0.7).setSize(250,80,0).setOffset(0, 220)
                    break;
                case 'villain3':
                    item.setSize(120,40,0).setOffset(0, 90)
                    break;
                case 'villain4':
                    item.setSize(70,50,0).setOffset(0, 10)
                    break;
            }
            // 重啟怪物  *不考慮
            // if(!item.active){
                // item.setActive(true).setVisible(true).x = 1400
            // }
            // 怪物在左邊界線消失
            if (item.x < 0) {
                vm.villainGroup.killAndHide(item);    
            }
        });

        // 金幣
        Phaser.Actions.IncX(this.moneyGroup.getChildren(), -5);
        this.moneyGroup.children.iterate(function (item) {    
            // 設定碰撞領域
            item.setScale(0.6).setOffset(-10,0)
            // 重啟金幣
            if(!item.active){
                let randomX = Phaser.Math.Between(1400, 3000)
                let randomY = Phaser.Math.Between(0, 2)
                switch (randomY) {
                    case 0:
                        randomY = 400
                        break;
                    case 1:
                        randomY = 480
                        break;
                    case 2:
                        randomY = 560
                        break;
                }
                item.setActive(true).setVisible(true).setPosition(randomX, randomY)
            }
            // 左邊界線消失
            if (item.x < 0) {
                vm.moneyGroup.killAndHide(item);    
            }
        });

        if(this.line){
            this.line.x -= 5
            if(this.line.x < 0){
                this.line.setActive(false).setVisible(false)
            }
        }
        if(this.money3){
            this.money3.x -= 5
            if(this.money3.x <= 640){
                this.money3.x = 640
            }
        }
    }
}
const gameover = {
    key: 'gameover',
    preload (){
        this.load.svg('gameover', '../../static/image/gameover.svg');
        this.load.image('restart', '../../static/image/restart.png');
    },
    create (){
        let vm = this
        this.add.image(w/2, h/2.5, 'gameover').setScale(0.8)
        const restart = this.add.image(w/2, 480, 'restart').setScale(0.8).setInteractive()
        restart.on('pointerdown', ()=>{
            vm.scene.start('gameRun')
        })
    }
}

const config = {
    type: Phaser.AUTO,
    width: w,
    height: h,
    parent: 'app',
    physics: {
        default: 'arcade',
    },
    audio: {
        disableWebAudio: true
    },
    scene: [ gamestart, gameRun, gameover ]
}
const game = new Phaser.Game(config);