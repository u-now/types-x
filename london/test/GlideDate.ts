(function() {
    var gd = new GlideDate();
    gd.setValue('2015-01-01');
    gs.info(gd.getByFormat('dd-MM-yyyy'));
    // 01-01-2015
})();
(function() {
    //Today's date is 2016-05-13
    var gd = new GlideDate();
    gs.info(gd.getDayOfMonthNoTZ());
    // 13
})();
(function() {
    var gd = new GlideDate();
    gd.setValue('2015-01-01');
    gs.info(gd.getDisplayValue());
    //2015-01-01
})();
(function() {
    var gd = new GlideDate();
    gs.info(gd.getDisplayValueInternal());
    // 2014-10-22
})();
(function() {
    //Today's date is 2016-05-13
    var gd = new GlideDate();
    gs.info(gd.getMonthNoTZ());
    // 5
})();
(function() {
    var gd = new GlideDate();
    gd.setValue('2015-01-01');
    gs.info(gd.getValue());
    // 2015-01-01
})();
(function() {
    //Today's date is 2016-05-13
    var gd = new GlideDate();
    gs.info(gd.getYearNoTZ());
    // 2016
})();
(function() {
    var gd = new GlideDate();
    gd.setDisplayValue('2011-01-01');
    gs.info(gd.getValue());
    // 2011-01-01
})();
(function() {
    var gd = new GlideDate();
    gd.setValue('2015-01-01');
    gs.info(gd.getValue());
    // 2015-01-01
})();
(function() {
    var sgd1 = new GlideDate();
    sgd1.setDisplayValue('2014-07-18');
    var sgd2 = new GlideDate();
    sgd2.setDisplayValue('2014-07-19');

    var duration = GlideDate.subtract(sgd1, sgd2);
    gs.info(duration.getDisplayValue());
    // 1 Day
})();
