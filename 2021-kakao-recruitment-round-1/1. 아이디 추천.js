function solution(new_id) {
    new_id = new_id.toLowerCase();

    new_id = new_id.replace(/[^a-z0-9-_\.]/g, "");

    new_id = new_id.replace(/\.{2,}/g, ".");

    if (new_id[0] == '.') new_id = new_id.substr(1);
    if (new_id[new_id.length - 1] == '.') new_id = new_id.substr(0, new_id.length - 1);

    if (new_id.length == 0 ) new_id = "a";

    if (new_id.length >= 16 ) new_id = new_id.substr(0, 15);
    if (new_id[new_id.length - 1] == '.') new_id = new_id.substr(0, new_id.length - 1);

    while (new_id.length <= 2)
        new_id = new_id + new_id[new_id.length - 1];
    
    return new_id;
}