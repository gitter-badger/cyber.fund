CF.Chaingear.helpers = {
    /**
     *
     * @param that - CurrentData item
     * @returns {string} url to image
     */
    "cgSystemLogo": function (that) {
        var icon = (that.icon ? that.icon : that._id) || ''; 
        icon = icon.toString().toLowerCase();
        return "https://cyber.fund/logos/" + icon + ".png";
    }
};

_.each(CF.Chaingear.helpers, function (helper, key) {
    UI.registerHelper(key, helper);
});
