// main

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      // 开启物理系统
      cc.director.getPhysicsManager().enabled = true;

      cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_pairBit | cc.PhysicsManager.DrawBits.e_centerOfMassBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
      //cc.director.getPhysicsManager().debugDrawFlags = 0;

      this.registerInput();
    },

    start () {
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
      
    },

});
