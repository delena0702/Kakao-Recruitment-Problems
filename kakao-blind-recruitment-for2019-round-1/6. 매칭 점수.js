function solution(word, pages) {
    let n = pages.length;
    let url = new Array(n), score = new Array(n), total_score = new Array(n);
    for (let i = 0; i < n; i++) {
        url[i] = /<meta property=\"og:url\" content=\"(https:\/\/.+)\"/i.exec(pages[i])[1];
        total_score[i] = score[i] = countWord(pages[i], word);
    }

    for (let i = 0; i < n; i++) {
        let link = new Array(n);
        for (let j = 0; j < n; j++) {
            if (i == j) {
                link[j] = 0;
                continue;
            }

            link[j] = countLink(pages[i], url[j]);
        }

        let sum = countAllLink(pages[i]);

        for (let j = 0; j < n; j++)
            total_score[j] += sum ? link[j] * score[i] / sum : 0;
    }

    return total_score.reduce((a, _, ind) => (total_score[a] >= total_score[ind]) ? a : ind, 0);
}

function countWord(str, word) {
    str = "$" + str + "$";
    let regex = new RegExp("[^A-Za-z]" + word + "[^A-Za-z]", "i");
    for (let cnt = 0, ind = 0; ; cnt++) {
        let res = regex.exec(str.substr(ind));
        if (res == null) return cnt;
        ind += res.index + 1;
    }
}

function countLink(str, link) {
    let regex = new RegExp("<a href=\"" + link + "\">", "i");
    for (let cnt = 0, ind = 0; ; cnt++) {
        let res = regex.exec(str.substr(ind));
        if (res == null) return cnt;
        ind += res.index + 1;
    }
}

function countAllLink(str) {
    let regex = new RegExp("<a href=\"https://.+\">", "i");
    for (let cnt = 0, ind = 0; ; cnt++) {
        let res = regex.exec(str.substr(ind));
        if (res == null) return cnt;
        ind += res.index + 1;
    }
}