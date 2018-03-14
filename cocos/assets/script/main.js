// main

cc.Class({
    extends: cc.Component,

    properties: {
        // main Camera
        camera: cc.Camera,

        // 父结点
        houseParentNode : cc.Node,
        dropNode : cc.Node,
        craneNode : cc.Node,
        uiEndNode : cc.Node,
        uiScoreLabel : cc.Label,
        uiFloorLabel : cc.Label,

        // 房子预制体
        housePrefab : cc.Prefab,

        currentHouse : {
            default: null,
            type: cc.Node
        },

        preHouse : {
            default : null,
            type : cc.Node
        },

        isWaitingResult : false,
        waitingResultTime : 0,

        preHouseYHeight : -420,
        isFailed : false,
        destCraneHeightY : 0,

        floor : 0,
        score : 0,

        houseArray:{
            default:[],
            type:[cc.Node]
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 开启物理系统
        cc.director.getPhysicsManager().enabled = true;

        //cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_pairBit | cc.PhysicsManager.DrawBits.e_centerOfMassBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
        cc.director.getPhysicsManager().debugDrawFlags = 0;

        this.registerInput();

        // move Camera
        this.camera.node.setPositionY( this.craneNode.getPositionY() - 150);
    },

    start () {
        this.uiEndNode.active = false;
        this.preHouseYHeight = -400;
        this.isFailed = false;
        this.destCraneHeightY = this.craneNode.getPositionY();
    },

    //update: function(dt){}

    onEnable: function () {
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
    },
    onDisable: function () {
        cc.director.getPhysicsManager().detachDebugDrawFromCamera(this.camera);
    },

    update : function(dt) {

        if(this.currentHouse!=null){
            if(this.currentHouse.getPositionY() < this.preHouseYHeight){
                this.onFail();
            }

            if(this.isWaitingResult){
                this.waitingResultTime += dt;
                if( this.waitingResultTime > 0.06 && Math.abs(this.currentHouse.getComponent(cc.RigidBody).linearVelocity.y) < 1){
                    this.floor += 1;
                    this.score += 1;

                    if( this.preHouse!=null){
                        if( Math.abs(this.currentHouse.getPositionX() - this.preHouse.getPositionX()) < this.currentHouse.width * 0.1){
                            this.score += 1;
                            //this.houseArray.appendObjectAt( this.preHouse, 0);
                            this.preHouse.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static;
                        }
                    }
                    else{
                        this.score += 1;
                    }
                            
                    this.uiScoreLabel.string = "Score:" + this.score;
                    this.uiFloorLabel.string = "Floor:" + this.floor;

                    this.isWaitingResult = false;
                    this.waitingResultTime = 0;
                }
            }
        }

        if( this.craneNode.getPositionY() < this.destCraneHeightY){
            var stepLen = (this.destCraneHeightY - this.craneNode.getPositionY()) * dt * 0.4;

            // move crane and camera
            this.craneNode.setPositionY( this.craneNode.getPositionY() + stepLen);
            this.camera.node.setPositionY( this.craneNode.getPositionY() - 150);
        }
    },

    onFail(){
        this.uiEndNode.active = true;

        this.isFailed = true;
    },

    // 事件注册
    registerInput () {
        // 键盘事件
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {

                this.dropHouse();

            }.bind(this)
        }, this.node);

        // 点击事件
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {

                this.dropHouse();

                return true;
            }.bind(this)
        }, this.node);
    },

    // 放置房子
    dropHouse() {
        if(this.isFailed){
            return;
        }

        var dropNodeSprite = this.dropNode.getComponent(cc.Sprite);
        if( dropNodeSprite.enabled){
            var newHouse = cc.instantiate(this.housePrefab);
            newHouse.parent = this.houseParentNode;
            newHouse.setPositionX( this.dropNode.getPositionX());
            newHouse.setPositionY( this.dropNode.getPositionY() + this.craneNode.getPositionY());

            this.dropNode.getComponent(cc.Sprite).setVisible(false);

            // 上移吊机
            this.destCraneHeightY = this.preHouseYHeight + 550;

            // remember nodes
            this.preHouse = this.currentHouse;
            this.currentHouse = newHouse;

            this.isWaitingResult = true;

            if(this.preHouse!=null){
                this.preHouseYHeight = this.preHouse.getPositionY();
            }
        }
    },

    // 重启
    restartGame(){
        cc.director.loadScene("main");
    },
});
