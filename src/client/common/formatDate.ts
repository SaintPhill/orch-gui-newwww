export function formatDate(date: number): string {
    let day = String(new Date(date).getDate());
    let month = String(new Date(date).getMonth() + 1);
    const year = new Date(date).getFullYear();
    let hour = String(new Date(date).getHours());
    let minutes = String(new Date(date).getMinutes());
    let seconds = String(new Date(date).getSeconds());
    const milliseconds = String(new Date(date).getMilliseconds());
    const NUM_TEN = 10;

    if (Number(day) < NUM_TEN) {
        day = '0' + day;
    }
    if (Number(month) < NUM_TEN) {
        month = '0' + month;
    }
    if (Number(hour) < NUM_TEN) {
        hour = '0' + hour;
    }
    if (Number(minutes) < NUM_TEN) {
        minutes = '0' + minutes;
    }
    if (Number(seconds) < NUM_TEN) {
        seconds = '0' + seconds;
    }

    return `${day}.${month}.${year} ${hour}:${minutes}:${seconds}:${milliseconds}`;
}
