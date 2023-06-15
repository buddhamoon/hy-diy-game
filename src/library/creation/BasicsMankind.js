import { BasicsLife } from './BasicsLife';

export default class BasicsMankind extends BasicsLife {
    constructor (props) {
        super();
        // 角色性别： man | woman
        this.gender = props.gender || "man";
        // 健康值
        this.health = props.health || 100;
    }

    // 普通攻击
    async userAttack () {

    }

    // 受到攻击
    async underAttack (num) {
        if (typeof num === 'number' && num >= 0) {
            this.health = this.health - num;
            return {
                type: "success",
                message: "受到攻击",
                damage: num,
                residualValue: this.health
            }
        }

        return {
            type: "error",
            message: "无效攻击"
        }
    }


}