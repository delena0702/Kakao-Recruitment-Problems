function solution(N, stages) {
    var answer = [], arr = new Array(N+1), arr2 = new Array(N);
    for (let i = 0; i < N; i++) arr[i] = arr2[i] = 0;
    arr[N] = 0;
    for (let s of stages) arr[s - 1]++;
    
    var sum = arr[N];
    for (let i = N - 1; i >= 0; i--) {
        sum += arr[i];
        arr2[i] = sum ? [i + 1, arr[i] / sum] : [i + 1, 0];
    }

    arr2.sort(function (a,b) { return b[1] - a[1] });
    for (let a of arr2) answer.push(a[0]);

    return answer;
}