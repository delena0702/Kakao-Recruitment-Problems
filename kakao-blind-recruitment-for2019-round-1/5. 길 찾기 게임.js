function solution(nodeinfo) {
    var arr = nodeinfo.map((data, ind) => [ind + 1, data[0], data[1]]);
    arr = arr.sort((a, b) => (a[1] - b[1]));
    return order(arr, 0, arr.length - 1);
}

function order(arr) {
    if (arr.length == 0) return [[], []];
    var root = arr.reduce((a, d, ind) => (arr[a][2] > arr[ind][2] ? a : ind), 0);

    var ret = [[arr[root][0]], []];

    var temp = order(arr.slice(0, root));
    ret = ret.map((d, ind) => d.concat(temp[ind]));
    temp = order(arr.slice(root + 1));
    ret = ret.map((d, ind) => d.concat(temp[ind]));

    ret[1].push(arr[root][0]);

    return ret;
}