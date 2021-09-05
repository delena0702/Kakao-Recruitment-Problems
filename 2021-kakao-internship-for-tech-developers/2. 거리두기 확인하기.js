let dx = [0, 1, 0, -1];
let dy = [-1, 0, 1, 0];

function solution(places) {
    var answer = [];
    for (let p of places)
        answer.push(check(p.map(x=>x.split(''))));
    return answer;
}

function check(place) {
    for (let i=0; i<5; i++)
        for (let j=0; j<5; j++)
            if (place[i][j] == 'P' && !dfs(place, j, i, 2))
                    return 0;
    return 1;
}

function dfs(place, x, y, n) {
    if (x < 0 || x >= 5 || y < 0 || y >= 5 ) return true;
    if (n < 2 && place[y][x] == 'P') return false;
    if (place[y][x] == 'X') return true;
    place[y][x] = 'C';

    if (!n) return true;

    for (let i=0; i<4; i++)
        if (!dfs(place, x+dx[i], y+dy[i], n-1))
            return false;
    return true;
}