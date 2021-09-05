function solution(orders, course) {
    orders = orders.map(x => x.split('').sort().join(''));

    let temp = {};
    orders.forEach(x => x.split('').forEach(x => temp[x] = 1));

    var answer = [];
    for (let c of course)
        answer = answer.concat(findMax(orders, combine(orders, c)));
    return answer.sort();
}

function findMax(orders, cases) {
    let max_num = -Infinity;
    let ret = [];

    for (let c of cases) {
        let cnt = 0;
        for (let o of orders) {
            let temp = {};
            c.split('').forEach(x => temp[x] = 1);
            o.split('').forEach(x => temp[x] = 1);

            if (Object.keys(temp).length == o.length)
                cnt++;
        }

        if (max_num == cnt)
            ret.push(c);

        if (max_num < cnt) {
            max_num = cnt;
            ret = [c];
        }
    }

    return max_num < 2 ? [] : ret;
}

function combine(orders, num) {
    let ret = [];
    for (let o of orders)
        ret = ret.concat(_combine(o, num, ""));
    let temp = {};
    ret.forEach(x => temp[x] = 1);
    return Object.keys(temp);
}

function _combine(menus, num, str) {
    if (num == 0) return [str];
    if (menus.length < num) return [];

    let ret = _combine(menus.substr(1), num - 1, str + menus[0]);
    ret = ret.concat(_combine(menus.substr(1), num, str));

    return ret;
}