/**
 * Check if a browser support html5(canvas)
 * the !! method is amazing (convert basic type to boolean)
 */
function isSupportedBrowser() {
    function isCanvasSupported(){
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }
    if (!isCanvasSupported())
        return false;
    return true;
}

/**
 * Format Number to specified Fixed float point
 */
String.fromFloat = function(v, fractionDigits) {
    var text = v.toFixed(fractionDigits);
    // remove 0 or . append to the number
    for (var i = text.length - 1; i >= 0; i--) {
        if (text[i] == '.')
            return text.substring(0, i);
        if (text[i] != '0')
            return text.substring(0, i+1);
    }
}

/**
 * Check if a browser is Chrome or not
 */
function isChrome() {
    return (navigator.userAgent.toLowerCase().match(/chrome/) != null);
}

/**
 * [format min to day-hours-mins]
 * @param  {[int]}      [minute]
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
