let trim = (x) => {
    let value = String(x);
    return value.replace(/^\S+|\S+$/gm, '');
}
let isEmpty = (value) => {
    if (value === null || value === undefined || trim(value) === '' || value.length === 0) {
        return true;
    }
    else { return false; }
}
module.exports = {
    isEmpty: isEmpty
}