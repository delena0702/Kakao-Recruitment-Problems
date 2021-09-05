let team = {}, dp, n;

function solution(sales, links) {
    n = sales.length;
    sales.unshift(0);

    dp = new Array(2).fill(0).map(x => new Array(n + 1).fill(-1));

    for (let l of links) {
        if (team[l[0]] === undefined) team[l[0]] = [];
        team[l[0]].push(l[1]);
    }

    return Math.min(dfs(sales, 1, 0), dfs(sales, 1, 1));
}

function dfs(sales, start, set) {
    if (team[start] === undefined) return set ? sales[start] : 0;
    if (dp[set][start] != -1) return dp[set][start];

    if (set) {
        let ret = 0;
        for (let t of team[start])
            ret += Math.min(dfs(sales, t, 0), dfs(sales, t, 1));
        return dp[set][start] = ret + sales[start];
    }

    let ret = 0, check = false, min_diff = Infinity;
    for (let t of team[start]) {
        let no = dfs(sales, t, 0);
        let yes = dfs(sales, t, 1);

        if (yes <= no) check = true;
        else min_diff = Math.min(min_diff, yes - no);

        ret += Math.min(no, yes);
    }

    return dp[set][start] = ret + (check ? 0 : min_diff);
}