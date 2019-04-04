function orderDigits(number) {
    return parseInt(("" + number).split("").sort(function (a, b) {
        return b - a
    }).join(""));
}