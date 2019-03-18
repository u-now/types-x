(function() {
    var gdt = new GlideDateTime('2011-08-31 08:00:00');
    var gtime1 = new GlideTime();
    gtime1.setValue('00:00:20');
    gdt.add(gtime1);
    var gtime2 = gdt.getTime();
    gs.info(gtime2.getByFormat('hh:mm:ss'));
})();
(function() {
    var gdt = new GlideDateTime('2011-08-31 08:00:00');
    gs.info(gdt.getNumericValue());
    gdt.add(10);
    gs.info(gdt.getNumericValue());
    // 1314777600000 1314777600010
})();
(function() {
    var gdt = new GlideDateTime();
})();
(function() {
    var start = new GlideDateTime('2011-01-01 12:00:00');
    var end = new GlideDateTime(start);
    gs.info(end);
})();
(function() {
    var gdt = new GlideDateTime('2011-01-01 12:00:00');
})();
(function() {
    var gdt = new GlideDateTime('2011-08-31 08:00:00');
    gdt.addDaysLocalTime(-1);
    gs.info(gdt.getLocalDate());
    // 2011-08-30
})();
(function() {
    var gdt = new GlideDateTime('2011-08-31 08:00:00');
    gdt.addDaysUTC(-1);
    gs.info(gdt.getDate());
    // 2011-08-30
})();
(function() {
    var gdt = new GlideDateTime('2011-08-31 08:00:00');
    gdt.addMonthsLocalTime(2);
    gs.info(gdt.getDate());
    // 2011-10-31
})();
(function() {
    var gdt = new GlideDateTime('2011-08-31 08:00:00');
    gdt.addMonthsUTC(2);
    gs.info(gdt.getDate());
})();
(function() {
    var gdt = new GlideDateTime('2011-12-07 08:00:00');
    gdt.addSeconds(1000);
    gs.info(gdt.getValue());
    // 2011-12-07 08:16:40
})();
(function() {
    var gdt = new GlideDateTime('2011-08-31 08:00:00');
    gdt.addWeeksLocalTime(-1);
    gs.info(gdt.getDate());
    // 2011-08-24
})();
(function() {
    var gdt = new GlideDateTime('2011-08-31 08:00:00');
    gdt.addWeeksUTC(-1);
    gs.info(gdt.getDate());
    // 2011-08-24
})();
(function() {
    var gdt = new GlideDateTime('2010-08-31 08:00:00');
    gdt.addYearsLocalTime(1);
    gs.info(gdt.getDate());
    // 2011-08-31
})();
(function() {
    var gdt = new GlideDateTime('2010-08-31 08:00:00');
    gdt.addYearsUTC(1);
    gs.info(gdt.getDate());
    // 2011-08-31
})();
(function() {
    var gdt1 = new GlideDateTime('2016-05-09 10:11:12');
    var gdt2 = new GlideDateTime('2017-06-12 15:11:12');
    gs.info(gdt1.after(gdt2));
    // False
})();
(function() {
    var gdt1 = new GlideDateTime('2016-05-09 10:11:12');
    var gdt2 = new GlideDateTime('2017-06-12 15:11:12');
    gs.info(gdt1.before(gdt2));
    // True
})();
(function() {
    var initDate = new GlideDateTime('2011-08-01 12:00:00');
    var compDate1 = new GlideDateTime('2011-08-01 12:00:00');
    var compDate2 = new GlideDateTime('2011-07-31 12:00:00');
    var compDate3 = new GlideDateTime('2011-08-04 16:00:00');

    gs.info(initDate.compareTo(compDate1)); // Equals (0)
    gs.info(initDate.compareTo(compDate2)); // initDate is after compDate2 (1)
    gs.info(initDate.compareTo(compDate3)); // initDate is before compDate3 (-1)
})();
(function() {
    var gdt = new GlideDateTime('2011-08-31 00:00:00');
    gs.info(gdt.equals('2011-09-30 00:12:01'));
    // false
})();
(function() {
    var gdt = new GlideDateTime('2011-08-31 08:00:00');
    gs.info(gdt.getDate());
})();
(function() {
    var gdt = new GlideDateTime('2011-12-02 12:00:00');
    gs.info(gdt.getDayOfMonthLocalTime());
})();
(function() {
    var gdt = new GlideDateTime('2011-12-02 12:00:00');
    gs.info(gdt.getDayOfMonthUTC());
    // 02
})();
(function() {
    var gdt = new GlideDateTime('2011-12-01 12:00:00'); //Thursday
    gs.info(gdt.getDayOfWeekLocalTime());
})();
(function() {
    var gdt = new GlideDateTime('2011-12-01 12:00:00'); //Thursday
    gs.info(gdt.getDayOfWeekLocalTime());
})();
(function() {
    var gdt = new GlideDateTime('2011-12-02 12:00:00'); //December
    gs.info(gdt.getDaysInMonthLocalTime());
})();
(function() {
    var gdt = new GlideDateTime('2011-11-02 12:00:00'); //November
    gs.info(gdt.getDaysInMonthUTC());
})();
(function() {
    var gdt = new GlideDateTime('2011-08-31 08:00:00');
    gs.info(gdt.getDisplayValue()); //uses current user session time zone (US/Pacific)
})();
(function() {
    var gdt = new GlideDateTime('2011-08-31 08:00:00');
    gs.info(gdt.getDisplayValueInternal()); //uses current user session time zone (US/Pacific)
})();
(function() {
    var gdt = new GlideDateTime('2014-08-31 08:00:00');
    gs.info(gdt.getDSTOffset()); //uses current user session time zone (US/Pacific)
})();
(function() {
    var gdt = new GlideDateTime();
    gdt.setDisplayValue('2011-aa-01 00:00:00');
    gs.info(gdt.getErrorMsg());
    // Could not parse DateTime: 2011-aa-01 00:00:00
})();
(function() {
    var gdt = new GlideDateTime('2011-08-31 08:00:00');
    gs.info(gdt.getLocalDate());
})();
(function() {
    var gdt = new GlideDateTime('2014-08-31 08:00:00');
    var gt = gdt.getLocalTime();
    gs.info('local time is ' + gt.getByFormat('hh:mm:ss'));
})();
(function() {
    var gdt = new GlideDateTime('2011-11-02 12:00:00'); //November
    gs.info(gdt.getMonthLocalTime());
})();
(function() {
    var gdt = new GlideDateTime('2011-11-02 12:00:00'); //November
    gs.info(gdt.getMonthUTC());
})();
(function() {
    var gdt = new GlideDateTime('2011-08-31 08:00:00');
    gs.info(gdt.getNumericValue());
})();
(function() {
    var gdt = new GlideDateTime('2014-08-31 08:00:00');
    var gt = gdt.getTime();
    gs.info(gt.getByFormat('hh:mm:ss'));
})();
(function() {
    var gdt = new GlideDateTime();
    gdt.getLocalTime(); // PST local time
    gs.info(gdt.getTZOffset());
    // 25200000
})();
(function() {
    var gdt = new GlideDateTime('2014-08-31 08:00:00');
    gs.info(gdt.getValue());
})();
(function() {
    var gdt = new GlideDateTime('2011-12-01 12:00:00'); //49th week, 1st week in december
    gs.info(gdt.getWeekOfYearLocalTime());
})();
(function() {
    var gdt = new GlideDateTime('2011-12-01 12:00:00'); //49th week, 1st week in december
    gs.info(gdt.getWeekOfYearUTC());
})();
(function() {
    var gdt = new GlideDateTime('2011-11-02 12:00:00');
    gs.info(gdt.getYearLocalTime());
})();
(function() {
    var gdt = new GlideDateTime('2011-11-02 12:00:00');
    gs.info(gdt.getYearUTC());
})();
(function() {
    var gdt = new GlideDateTime('2011-08-31 08:00:00');
    gs.info(gdt.hasDate());
})();
(function() {
    var gdt = new GlideDateTime('2014-08-31 00:00:00');
    gs.info(gdt.isDST()); //true
})();
(function() {
    var gdt = new GlideDateTime();
    gdt.setDisplayValue('2011-aa-01 00:00:00');
    gs.info(gdt.isValid());
    // false
})();
(function() {
    var gdt1 = new GlideDateTime('2016-05-09 10:11:12');
    var gdt2 = new GlideDateTime('2017-06-12 15:11:12');
    gs.info(gdt1.onOrAfter(gdt2));
    // False
})();
(function() {
    var gdt1 = new GlideDateTime('2016-05-09 10:11:12');
    var gdt2 = new GlideDateTime('2017-06-12 15:11:12');
    gs.info(gdt1.onOrBefore(gdt2));
    // True
})();
(function() {
    var gdt = new GlideDateTime();
    gdt.setDayOfMonthLocalTime(9);
    gs.info(gdt.getDayOfMonthLocalTime());
})();
(function() {
    var gdt = new GlideDateTime();
    gdt.setDayOfMonthUTC(9);
    gs.info(gdt.getDayOfMonthUTC());
})();
(function() {
    var gdt = new GlideDateTime('2014-02-02 12:00:00');
    gdt.setDisplayValue('2014-01-01 12:00:00'); //uses current user session time zone (US/Pacific)
    gs.info(gdt.getValue());
})();
(function() {
    var gdt = new GlideDateTime('2011-02-02 12:00:00');
    gdt.setDisplayValue('20-5-2011 12:00:00', 'dd-MM-yyyy HH:mm:ss'); //uses current user session time zone (US/Pacific)
    gs.info(gdt.getValue());
})();
(function() {
    var gdt = new GlideDateTime('2014-02-02 12:00:00');
    gdt.setDisplayValueInternal('2014-01-01 12:00:00'); //uses current user session time zone (US/Pacific)
    gs.info(gdt.getValue());
})();
(function() {
    var dt1 = new GlideDateTime('2011-01-01 12:00:00');
    var dt2 = new GlideDateTime('2011-02-02 08:00:00');
    dt1.setGlideDateTime(dt2);
    gs.info(dt1.getValue());
})();
(function() {
    var gdt = new GlideDateTime();
    gdt.setMonthLocalTime(1);
    gs.info(gdt.getMonthLocalTime());
    // 1
})();
(function() {
    var gdt = new GlideDateTime();
    gdt.setMonthUTC(1);
    gs.info(gdt.getMonthUTC());
    // 1
})();
(function() {
    var gdt = new GlideDateTime('2011-01-01 12:00:00');
    gdt.setValue('2011-02-02 08:00:00'); // value set =  2011-02-02 08:00:00
    gs.info(gdt.getValue());
})();
(function() {
    var gdt = new GlideDateTime('2011-01-01 12:00:00');
    gdt.setValueUTC('15-02-2011 08:00:00', 'dd-MM-yyyy HH:mm:ss');
    gs.info(gdt.getValue());
})();
(function() {
    var gdt = new GlideDateTime();
    gdt.setYearLocalTime(2013);
    gs.info(gdt.getYearLocalTime());
    // 2013
})();
(function() {
    var gdt = new GlideDateTime();
    gdt.setYearUTC(2013);
    gs.info(gdt.getYearUTC());
    // 2013
})();
(function() {
    var gdt1 = new GlideDateTime('2011-08-28 09:00:00');
    var gdt2 = new GlideDateTime('2011-08-31 08:00:00');

    var dur = GlideDateTime.subtract(gdt1, gdt2); //the difference between gdt1 and gdt2
    gs.info(dur.getDisplayValue());
    // 2 Days 23 Hours
})();
(function() {
    var gdt = new GlideDateTime('2011-08-31 08:00:00');
    var gtime1 = new GlideTime();
    gtime1.setValue('00:00:20');
    gdt.subtract(gtime1);
    var gtime2 = gdt.getTime();
    gs.info(gtime2.getByFormat('hh:mm:ss'));
    // 07:59:40
})();
(function() {
    var gdt = new GlideDateTime('2011-12-07 08:00:00');
    gdt.subtract(1000);
    gs.info(gdt.getValue());
    // 2011-12-07 07:59:59
})();
(function() {
    var gdt = new GlideDateTime('2011-08-31 08:00:00');
    gs.info(gdt.toString());
})();
