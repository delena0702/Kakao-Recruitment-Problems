function solution(relation) {
    var r = relation.length, c = relation[0].length, key = [];

    BIG_LOOP:
    for (let i = 1; i < (1 << c); i++) {
        var arr = [];

        for (let j = 0; j < r; j++) {
            var arr2 = [];
            for (let k = 0; k < c; k++)
                if (i & (1 << k))
                    arr2.push(relation[j][k]);
            arr.push(arr2.join(','));
        }

        var set = new Set(arr);
        if (set.size == r) {
            for (let k of key)
                if ((k & i) == k)
                    continue BIG_LOOP;
            key.push(i);
        }
    }

    return key.length;
}