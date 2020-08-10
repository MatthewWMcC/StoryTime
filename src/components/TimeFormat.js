

export default function TimeFormatSub(sTime, eTime) {
    sTime = sTime.toString();
    eTime = eTime.toString();

    let sh = sTime.slice(0, 2)
    let sm = sTime.slice(3, 5)
    let eh = eTime.slice(0, 2)
    let em = eTime.slice(3, 5)

    let subHour = parseInt(eh) - parseInt(sh)
    if (subHour < 0) {
        subHour = 24 + subHour
    }
    let subMin = parseInt(em) - parseInt(sm)
    if (subMin < 0) {
        subMin = 60 + subMin
        subHour -= 1
    }

    return (subHour * 60 + subMin)

}