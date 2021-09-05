function solution(n, k, cmd) {
    let data = [0, 0], stack = [];
    data[0] = new Array(n).fill(0).map((x,i)=>i-1);
    data[1] = new Array(n).fill(0).map((x,i)=>i+1);
    data[1][n-1] = -1;

    for (let c of cmd) {
        let arr = c.split(' '), x;
        switch (arr[0]) {
        case 'U':
            x = 0|arr[1];
            for (let i=0; i<x; i++)
                k = data[0][k];
            break;

        case 'D':
            x = 0|arr[1];
            for (let i=0; i<x; i++)
                k = data[1][k];
            break;

        case 'C':
            stack.push(k);

            data[1][data[0][k]] = data[1][k];
            data[0][data[1][k]] = data[0][k];

            k = (data[1][k] == -1) ? data[0][k] : data[1][k];
            break;

        case 'Z':
            x = stack.pop();

            data[1][data[0][x]] = x;
            data[0][data[1][x]] = x;

            break;
        }
    }

    let set = {}, str = "";
    for (let s of stack) set[s] = true;
    for (let i=0; i<n; i++)
        if (set[i]) str += 'X';
        else str += 'O';
    
    return str;
}