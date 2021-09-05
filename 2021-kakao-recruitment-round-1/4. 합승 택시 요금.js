function solution(n, s, a, b, fares) {
    let data = new Array(n + 1).fill(0).map(
        (x, i) => new Array(n + 1).fill(0).map(
            (x, j) => ((i == j) ? 0 : Infinity)));

    for (let f of fares)
        data[f[0]][f[1]] = data[f[1]][f[0]] = f[2];

    for (let i = 1; i <= n; i++)
        for (let j = 1; j <= n; j++)
            for (let k = 1; k <= n; k++)
                data[j][k] = Math.min(data[j][k], data[j][i] + data[i][k]);
    let answer = Infinity;
    for (let i=1; i<=n ;i++)
        answer = Math.min(answer, data[s][i] + data[i][b] + data[i][a]);
    return answer;
}