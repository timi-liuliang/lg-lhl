
cc.Class({
    extends: cc.Component,

    properties: {
    },

    start () {

    },

    // 放置房子
    onStartAnim() {
        this.getComponent(cc.Sprite).setVisible(true);
    },
});
