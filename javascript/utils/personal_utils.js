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
