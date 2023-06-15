import getUuidVal from '../../../tools/createUuidVal'

export default class BasicsLife {

    constructor ( prorps ) {

        // 角色 ID
        this.userId = getUuidVal();
        // 用户针对角色姓名定义
        this.name = prorps['name'] || "未命名";
        // 角色属性：角色生命状态属性 normal（正常） | die（死亡） | pathosis（病态）
        this.lifeState = prorps['lifeState'] || "normal";
        // 角色属性：角色当前年龄，未赋值情况下，初始默认为 0；
        this.nowAge = prorps['nowAge'] || 0;
        // 角色属性：角色寿命，当前年龄大于寿命年龄时触发生命状态变更。
        this.maxAge = prorps['nowAge'] || 100;
        
    }

    /**
     * @title 寿命自然死亡函数
     * @returns 
     */
    async lifeStateDieChange () {
        if ((this.nowAge > this.maxAge) && this.lifeState !== 'die') {
            this.lifeState = 'die';
            return {
                type: "success",
                code: 100001,
                message: "该角色寿命已尽，进入死亡状态。"
            }
        }
        return {
            type: "success",
            code: 100002,
            message: "寿命状态正常。"
        }
    }
    
    // 增加年龄事件
    async addNowAge ( num = 1 ) {

        if ( typeof num === "number" && num > 0 ) {
            this.nowAge = this.nowAge + num;
        }
        
        await this.lifeStateDieChange();

        return {
            type: "success",
            code: 100003,
            message: "年龄增加成功。",
            addAge: num,
            nowAge: this.nowAge
        }
    }

    // 减龄事件
    async minusNowAge ( num = 1 ) {

        if ( this.nowAge > 0 ) {
            if ((this.nowAge - num) > 0) {
                this.nowAge = this.nowAge - num;
            } else {
                this.nowAge = 0;
            }
            return {
                type: "success",
                code: 100004,
                message: "减龄成功。",
                minusAge: num,
                nowAge: this.nowAge
            }
        } else {
            return {
                type: "error",
                code: 200003,
                message: "该目标年龄已经为零，无法进一步减龄。"
            }
        }
    }

    // 增加寿命事件
    async addMaxAge ( num ) {
        if ( typeof num === "number" && num > 0 ) {
            this.maxAge = this.maxAge + num;
            return {
                type: "success",
                message: "目标寿命增加。",
                addValue: num,
                nowValue: this.maxAge
            }
        }
    }

    // 减寿命事件
    async minusMaxAge ( num ) {
        if ( typeof num === "number" && num > 0 ) {
            if ( (this.maxAge - num) > 0 ) {
                this.maxAge = this.maxAge - num;
            } else { 
                this.maxAge = 0;
            }

            // 执行寿命死亡检测事件
            await this.lifeStateDieChange();

            return {
                type: "success",
                message: "目标寿命削减。",
                minusValue: num,
                nowValue: this.maxAge
            }

        } else {
            return {
                type: "error",
                message: "参数异常。"
            }   
        }
    }

    // 生命复活事件
    async edsterLife () {
        // 成功复活条件
        if (this.lifeState === 'die' && (this.nowAge <= this.maxAge)) {
            this.lifeState = 'normal';
            return {
                type: "sucess",
                message: "目标成功复活。"
            }
        }

        // 寿命终结失败提示
        if (this.lifeState === 'die' && (this.nowAge > this.maxAge)) {
            return {
                type: "error",
                message: "目标寿命已尽，无法使用复活术。"
            }
        }

        // 未死亡复活提示
        if (this.lifeState !== 'die') {
            return {
                type: "error",
                message: "目标并未死亡，无需复活。"
            }
        }
    }
    
}

