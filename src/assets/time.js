export const time = (row) => {
    let date = row;
    if (date != null) {
        const dateMat = new Date(date);
        const year = dateMat.getFullYear();
        const month =
            dateMat.getMonth() + 1 < 10
                ? "0" + (dateMat.getMonth() + 1)
                : dateMat.getMonth() + 1;
        const day =
            dateMat.getDate() < 10 ? "0" + dateMat.getDate() : dateMat.getDate();
        const timeFormat = year + "-" + month + "-" + day;
        return timeFormat;
    }
}

