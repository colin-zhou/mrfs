(function($, undefined) {
    "use strict";
    $.jstree.defaults.condictionalselect = function() {return false;};
    $.jstree.plugins.conditionalselect = function(options, parent) {
        this.activate_node = function(obj, e) {
            if(this.settings.conditionalselect.call(this, this.get_node(obj))) {
                parent.activate_node.call(this, obj, e);
            }
        }
    };
})(jQuery);
$('#container').jstree({
    "conditionalselect": function(node) {
        return node.text === "a"? false: true;
    },
    "plugins": ["conditionalselect"]
});
