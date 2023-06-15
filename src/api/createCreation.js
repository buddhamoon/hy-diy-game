/**
 * 角色创建构造函数
 * @param { object } props 
 * @props { string } name
 * @returns { object } 初始化角色数据对象
 */

export default function createCreation ( props = {} ) {
    const creation = { };

    creation['name'] = props['name'] || "初始角色";
    creation['nowAge'] = props['nowAge'] || 0;
    creation['maxAge'] = props['maxAge'] || 100;
    creation['gender'] = props['gender'] || "man";
    


    return creation;
}