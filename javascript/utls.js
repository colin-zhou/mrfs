/**
 * [format min to day-hours-mins]
 * @param  {[int]} m [minuter]
 * @return {[string]}   [day-hour-min string]
 */
var formatMin = function (m) {
    var day = 0, hour = 0, min = 0;
    var retStr = "", temp;
    var inMin = parseInt(m, 10);
    if (isNaN(inMin)) {
        return null;
    }
    min = m % 60;
    temp = Math.floor(m / 60);
    hour = temp % 24;
    day = Math.floor(temp / 24);
    if (day !== 0) {
        retStr = day + " days ";
    }
    if (hour !== 0) {
        retStr += hour + " hours ";
    }
    retStr += min + " minutes";
    return retStr;
};