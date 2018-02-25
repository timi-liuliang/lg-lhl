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

        // 房子预制体
        housePrefab : cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 开启物理系统
        cc.director.getPhysicsManager().enabled = true;

        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_pairBit | cc.PhysicsManager.DrawBits.e_centerOfMassBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
        //cc.director.getPhysicsManager().debugDrawFlags = 0;

        this.registerInput();

        // move Camera
        this.camera.node.setPositionY( this.craneNode.getPositionY() - 150);
    },

    start () {
    },

    onEnable: function () {
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
    },
    onDisable: function () {
        cc.director.getPhysicsManager().detachDebugDrawFromCamera(this.camera);
    },

    // update (dt) {},

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
        var dropNodeSprite = this.dropNode.getComponent(cc.Sprite);
        if( dropNodeSprite.visible){
            var newHouse = cc.instantiate(this.housePrefab);
            newHouse.parent = this.houseParentNode;
            newHouse.setPositionX( this.dropNode.getPositionX());
            newHouse.setPositionY( this.dropNode.getPositionY() + this.craneNode.getPositionY());

            this.dropNode.getComponent(cc.Sprite).setVisible(false);

            // 上移吊机
            var houseHeight = this.dropNode.height * 0.8;
            this.craneNode.setPositionY( this.craneNode.getPositionY() + houseHeight);

            // move Camera
            this.camera.node.setPositionY( this.craneNode.getPositionY() - 150);
        }
    },

    // 重启
    restartGame(){
        cc.director.loadScene("main");
    },
});
