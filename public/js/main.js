var sporttype = document.getElementById('selectsport');
var teams = document.getElementById('noofteams');
var pools = document.getElementById('noofpools');
var schedule = document.getElementById('typeofschedule');
var submit = document.getElementById('submit');

submit.addEventListener('click', () => {
    var sport = sporttype.options[sporttype.selectedIndex].text;
    var noofpools = pools.options[pools.selectedIndex].text;
    var noofteams = teams.options[teams.selectedIndex].text;
    var type = schedule.options[schedule.selectedIndex].text;

    document.location.href = sport + '/?numofteams=' + noofteams +'&numofpools=' + noofpools + '&type=' + type ;
})