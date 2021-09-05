function solution(play_time, adv_time, logs) {
    play_time = str2sec(play_time);
    adv_time = str2sec(adv_time);
    logs = logs.map(x => x.split('-').map(x => str2sec(x)));
    let data = new Array(play_time + 1).fill(0);

    for (let l of logs)
        data[l[0]]++, data[l[1]]--;

    for (let i = 1; i < play_time; i++) data[i] += data[i - 1];

    for (let i = 1; i < play_time; i++) data[i] += data[i - 1];

    var ind = 0, max_val = data[adv_time - 1];
    for (let i = 0; i < play_time - adv_time; i++) {
        if (data[i + adv_time] - data[i] > max_val) {
            ind = i + 1;
            max_val = data[i + adv_time] - data[i];
        }
    }

    return sec2str(ind);
}

function str2sec(str) {
    let arr = str.split(':').map(x => 0 | x);
    return 3600 * arr[0] + 60 * arr[1] + arr[2];
}

function sec2str(sec) {
    let arr = [0 | (sec / 3600), 0 | (sec / 60 % 60), sec % 60];
    arr = arr.map(x => x.toString().padStart(2, '0'));
    return arr[0] + ':' + arr[1] + ':' + arr[2];
}