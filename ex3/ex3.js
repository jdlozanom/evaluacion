function formatDate(userDate) {
    let dateArray = userDate.split("/");
    return dateArray[2] + dateArray[0].padStart(2, '0') + dateArray[1].padStart(2, '0');
}

console.log(formatDate('11/26/2014'));