let N = 0;

function solution(board, r, c) {
    board.forEach(x => x.forEach(x => N = Math.max(N, x)));
    let step = makeStep(N);

    let pos = new Array(N + 1).fill(0).map(x => []);

    for (let i = 1; i <= N; i++) {
        board.forEach((d, j) => {
            d.forEach((d, k) => {
                if (d == i)
                    pos[i].push([k, j]);
            })
        });
    }

    let min = Infinity;
    for (let s of step)
        min = Math.min(min, dfs(board, pos, [c, r], s, 0));

    return min + 2 * N;
}

function dfs(board, pos, p, step, ind) {
    if (ind == N) return 0;

    let a = findRoute(board, p, pos[step[ind]][0]);
    a += findRoute(board, pos[step[ind]][0], pos[step[ind]][1]);
    for (let i = 0; i < 2; i++) board[pos[step[ind]][i][1]][pos[step[ind]][i][0]] = 0;
    a += dfs(board, pos, pos[step[ind]][1], step, ind + 1);
    for (let i = 0; i < 2; i++) board[pos[step[ind]][i][1]][pos[step[ind]][i][0]] = step[ind];

    let b = findRoute(board, p, pos[step[ind]][1]);
    b += findRoute(board, pos[step[ind]][1], pos[step[ind]][0]);
    for (let i = 0; i < 2; i++) board[pos[step[ind]][i][1]][pos[step[ind]][i][0]] = 0;
    b += dfs(board, pos, pos[step[ind]][0], step, ind + 1);
    for (let i = 0; i < 2; i++) board[pos[step[ind]][i][1]][pos[step[ind]][i][0]] = step[ind];

    return Math.min(a, b);
}

function findRoute(board, s, e) {
    let sx = s[0], sy = s[1], ex = e[0], ey = e[1];
    if (sx == ex && sy == ey) return 0;

    let queue = [[sx, sy, 0]];

    while (true) {
        let x = queue[0][0], y = queue[0][1], n = queue[0][2] + 1;
        queue.shift();

        let temp = [];
        temp.push([x - 1, y, n]);
        temp.push([x, y - 1, n]);
        temp.push([x + 1, y, n]);
        temp.push([x, y + 1, n]);

        let nx, ny;

        for (nx = x - 1; nx > 0 && !board[y][nx]; nx--);
        temp.push([nx, y, n]);
        for (nx = x + 1; nx < 3 && !board[y][nx]; nx++);
        temp.push([nx, y, n]);

        for (ny = y - 1; ny > 0 && !board[ny][x]; ny--);
        temp.push([x, ny, n]);
        for (ny = y + 1; ny < 3 && !board[ny][x]; ny++);
        temp.push([x, ny, n]);

        temp = temp.filter(x => x[0] >= 0 && x[0] < 4 && x[1] >= 0 && x[1] < 4);
        let ret = temp.filter(x => x[0] == ex && x[1] == ey);

        if (ret.length) return ret[0][2];

        queue = queue.concat(temp);
    }
}

function makeStep(n) {
    let arr = new Array(n).fill(0).map((x, ind) => (ind + 1));
    return _makeStep(arr);
}

function _makeStep(arr) {
    if (arr.length == 1) return [[arr[0]]];
    let ret = [];
    for (let i=0; i<arr.length; i++) {
        let temp = _makeStep(arr.slice(0, i).concat(arr.slice(i + 1)));
        temp.map(x => x.unshift(arr[i]));
        ret = ret.concat(temp);
    }
    return ret;
}