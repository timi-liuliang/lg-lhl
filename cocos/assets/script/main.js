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
      cc.director.getPhysicsManager().debugDrawFlags = 0;
    },

    start () {

    },

    // update (dt) {},
});
