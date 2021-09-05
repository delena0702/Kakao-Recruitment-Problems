function solution(k, num, links) {
    let n = num.length, all_sum = num.reduce((a, d) => a + d, 0);
    let root_check = {}, root = 0;
    links.forEach(d => d.forEach(d => { if (d != -1) root_check[d] = 1; }));
    for (let r of Object.keys(root_check))
        root += (0 | r);
    root = (n * (n - 1) / 2) - root;

    let s = 0 | (all_sum / k), m, e = all_sum - n + 2, val;

    while (s < e) {
        m = 0 | ((s + e) / 2);
        val = cutMinTeam(Array(n).fill(-1), num, links, root, m) + 1;

        if (val <= k) e = m;
        else s = m + 1;
    }

    return s;
}

// Stack Overflow로 인한 강제 재귀 해제
function cutMinTeam(sum, num, links, start_x, size) {
    let stack = [start_x], return_val = 0;

    BIG_LOOP:
    while(true) {
        if (stack.length == 0) return return_val;
        let next, retval = 0, res = [0, 0], x = stack[stack.length-1];

        let check = false;
        for (let i = 0; i < 2; i++) {
            next = links[x][i];

            if (next != -1) {
                if (sum[next] == -1) {
                    check = true;
                    stack.push(next);
                }
                res[i] = sum[next];
            }
        }

        if (check) continue BIG_LOOP;

        res.sort((a, b) => a - b);
        stack.pop();

        if (num[x] + res[0] + res[1] <= size) {
            sum[x] = num[x] + res[0] + res[1];
            return_val += retval;
            continue;
        }

        if (num[x] + res[0] <= size) {
            sum[x] = num[x] + res[0];
            return_val += retval + 1;
            continue;
        }

        if (num[x] <= size) {
            sum[x] = num[x];
            return_val += retval + 2;
            continue;
        }

        return Infinity;
    }
}