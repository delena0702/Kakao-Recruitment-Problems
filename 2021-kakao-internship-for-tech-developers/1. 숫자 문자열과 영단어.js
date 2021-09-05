function solution(s) {
    const data = [
        [/zero/g, 0],
        [/one/g, 1],
        [/two/g, 2],
        [/three/g, 3],
        [/four/g, 4],
        [/five/g, 5],
        [/six/g, 6],
        [/seven/g, 7],
        [/eight/g, 8],
        [/nine/g, 9]
    ];

    for (let d of data)
        s = s.replace(d[0], d[1]);
    return 0|s;
}