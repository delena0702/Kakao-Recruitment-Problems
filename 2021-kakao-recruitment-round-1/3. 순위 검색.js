var index = {
    "cpp": 16, "java": 8, "python": 0,
    "backend": 4, "frontend": 0,
    "junior": 2, "senior": 0,
    "chicken": 1, "pizza": 0,
}

function solution(info, query) {
    let data = new Array(24).fill(0).map(x => []);

    for (let i of info) {
        let arr = i.split(' '), ind = 0;

        for (let j = 0; j < 4; j++)
            ind += index[arr[j]];
        data[ind].push(0 | arr[4]);
    }

    data.forEach(x => x.sort((a, b) => a - b));

    let answer = [];
    for (let q of query)
        answer.push(readQuery(data, q));
    return answer;
}

function readQuery(data, query) {
    let ind = query2index(query);
    let score = 0 | query.split(' ')[7];

    let sum = 0;
    for (let i of ind)
        sum += findOverScore(data[i], score);
    return sum;
}

function query2index(query) {
    var arr = query.split(' ').filter((x, i) => x != 'and' && i != 7);
    var ret = [0];

    for (let i = 0; i < 4; i++) {
        if (arr[i] == '-') {
            var temp = ret.map(x => x + (1 << (3 - i)));
            if (i == 0) {
                var temp2 = ret.map(x => x + 16);
                ret = ret.concat(temp2);
            }
            ret = ret.concat(temp);
        }

        else
            ret = ret.map(x => x + index[arr[i]]);
    }

    return ret;
}

function findOverScore(arr, score, s, e) {
    if (s === undefined) s = 0, e = arr.length;
    if (s >= e)
        return arr.length - s;

    let m = 0 | ((s + e) / 2);
    if (arr[m] >= score) return findOverScore(arr, score, s, m);
    else return findOverScore(arr, score, m + 1, e);
}