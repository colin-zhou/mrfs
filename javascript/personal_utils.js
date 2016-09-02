/**
 * Check if a browser support html5(canvas)
 * the !! method is amazing (convert basic type to boolean)
 */
function IsSupportedBrowser() {
    function isCanvasSupported(){
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }
    if (!isCanvasSupported())
        return false;
    return true;
}
