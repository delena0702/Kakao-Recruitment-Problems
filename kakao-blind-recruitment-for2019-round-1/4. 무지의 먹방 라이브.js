function solution(food_times, k) {

    var arr = food_times.map((val, ind) => [ind + 1, val]);
    arr.sort((a, b) => (a[1] - b[1]));

    var n = food_times.length;

    for (let i = 0; i < n; i++) {
        var size = (i) ? arr[i][1] - arr[i - 1][1] : arr[i][1];
        if (k < (n - i) * size) {
            var res = arr.filter((_, ind) => (ind >= i));
            res.sort((a, b) => (a[0] - b[0]));
            return res[k % (n - i)][0];
        }

        k -= (n - i) * size;
    }

    return -1;
}