function solution(record) {
    var map = {}, res = [], answer = [];

    for (let r of record) {
        let arr = r.split(' ');
        switch(arr[0]) {
        case 'Enter': map[arr[1]] = arr[2]; res.push([arr[1], 1]); break;
        case 'Change': map[arr[1]] = arr[2]; break;
        case 'Leave': res.push([arr[1], 0]); break;
        }
    }

    for (let r of res)
        answer.push(map[r[0]] + (r[1] ? "님이 들어왔습니다." : "님이 나갔습니다."));

    return answer;
}