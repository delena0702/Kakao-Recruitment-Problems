function solution(board) {
    const N = board.length;
    var answer = 0, pre_answer = -1;

    for (let i = 0; i < N; i++)
        initCol(board, i);

    while (pre_answer != answer) {
        pre_answer = answer;

        for (let i = 0; i < N - 1; i++) {
            for (let j = 0; j < N - 2; j++) {
                let cnt = {};
                for (let k = 0; k < 2; k++)
                    for (let l = 0; l < 3; l++)
                        cnt[board[i + k][j + l]] = (cnt[board[i + k][j + l]] || 0) + 1;

                if (Object.keys(cnt).length == 2 && cnt[-1] == 2 && !cnt[0]) {
                    for (let l = 0; l < 3; l++) {
                        for (let k = 0; k < 2; k++)
                            board[i + k][j + l] = 0;
                        initCol(board, j + l);
                    }
                    answer++;
                }
            }
        }

        // 세로
        for (let i = 0; i < N - 2; i++) {
            for (let j = 0; j < N - 1; j++) {
                let cnt = {};
                for (let k = 0; k < 3; k++)
                    for (let l = 0; l < 2; l++)
                        cnt[board[i + k][j + l]] = (cnt[board[i + k][j + l]] || 0) + 1;

                if (Object.keys(cnt).length == 2 && cnt[-1] == 2 && !cnt[0]) {
                    for (let l = 0; l < 2; l++) {
                        for (let k = 0; k < 3; k++)
                            board[i + k][j + l] = 0;
                        initCol(board, j + l);
                    }
                    answer++;
                }
            }
        }
    }

    console.log(board.map(x=>x.map(x=>x)));

    return answer;
}

function initCol(board, c) {
    let j = 0;
    for (; ; j++) {
        if (j == board.length || board[j][c] > 0)
            break;
    }
    if (j)
        for (let k = 0; k < j; k++)
            board[k][c] = -1;
}