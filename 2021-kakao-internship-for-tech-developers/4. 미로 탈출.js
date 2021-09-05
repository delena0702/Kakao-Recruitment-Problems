function solution(n, start, end, roads, traps) {
    let graph = new Array(n + 1).fill(0).map(x => { return {}; });
    let revgraph = new Array(n + 1).fill(0).map(x => { return {}; });
    let trap_set = {};

    for (let r of roads) {
        graph[r[0]][r[1]] = graph[r[0]][r[1]] ? Math.min(r[2], graph[r[0]][r[1]]) : r[2];
        revgraph[r[1]][r[0]] = revgraph[r[1]][r[0]] ? Math.min(r[2], revgraph[r[1]][r[0]]) : r[2];
    }

    traps.forEach((x, i) => (trap_set[x] = i + 1));

    let queue = [[1, start, 0]];
    let dp = new Array(n + 1);

    for (let i = 0; i < n + 1; i++)
        dp[i] = {};

    while (true) {
        let d = queue[0][0], x = queue[0][1], trap = queue[0][2];
        queue.shift();
        if (x == end) return d - 1;
        if (dp[x][trap] && d > dp[x][trap]) continue;
        dp[x][trap] = d;

        let arr = {};
        Object.keys(graph[x]).forEach(x => arr[x] = 1);
        Object.keys(revgraph[x]).forEach(x => arr[x] = 1);
        let x_state = trap & (1 << trap_set[x]);
        for (let a of Object.keys(graph[x])) {
            a = 0 | a;
            if ((x_state == 0) == ((trap & (1 << trap_set[a])) == 0))
                queue_insert(queue, [d + graph[x][a], a, (trap_set[a] ? (trap ^ (1 << trap_set[a])) : trap)]);
        }

        for (let a of Object.keys(revgraph[x])) {
            a = 0 | a;
            if ((x_state == 0) != ((trap & (1 << trap_set[a])) == 0))
                queue_insert(queue, [d + revgraph[x][a], a, (trap_set[a] ? (trap ^ (1 << trap_set[a])) : trap)]);
        }
    }
}

function queue_insert(queue, d) {
    for (let i = 0; i < queue.length; i++) {
        if (d[0] < queue[i][0]) {
            queue.splice(i, 0, d);
            return;
        }
    }
    queue.push(d);
    return;
}