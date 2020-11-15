// Dropdown functions

function createGames(value) {
    el = document.createElement('option');
    el.value = value;
    el.innerHTML = value;
    el.id = value;

    document.getElementById('typeofschedule').appendChild(el);
}

function createPools(value) {
    el = document.createElement('option');
    el.value = value;
    el.innerHTML = value;
    el.id = value;

    document.getElementById('noofpools').appendChild(el);
}

function createTeams(value) {
    el = document.createElement('option');
    el.value = value;
    el.innerHTML = value;
    el.id = value;

    document.getElementById('noofteams').appendChild(el);
}


//jQuery

$(document).ready(function(){

    var p;

    var head = $("#heading");
    var desc = $("#desc");



    $("#selectsport").change(function(){

        var sp = $(this).find("option:selected").text();
        console.log(sp);

        /*if(sp == "Basketball"){

            document.getElementById('teams').innerHTML = "Number of Teams";
        }
        else if (sp == "Cricket"){
            document.getElementById('teams').innerHTML = "Number of Teams";
        }
        else if ((sp == "Football")){
            document.getElementById('teams').innerHTML = "Number of Teams";
        }
        else if ((sp == "Hockey")){
            document.getElementById('teams').innerHTML = "Number of Teams";
        }
        else{
            document.getElementById('teams').innerHTML = "Number of Players";

        }*/
    });


    $("#selectsport").change(function(){

        var sport = $(this).find("option:selected").text();
        console.log(sport);

        if(sport == "Select your Sport"){
            document.getElementById('typeofschedule').innerHTML = "";
            createGames("type of schedule");
        }

        if(sport != "Select your Sport"){
            head.html(sport + " Schedular");
            desc.html("Create the " + sport + " schedule for your tournament now.");  
            document.getElementById('typeofschedule').innerHTML = "";
            createGames("type of schedule");
            createGames("Knockout");
            createGames("RoundRobin");
            createGames("League");
        }        
    });

    $("#typeofschedule").change(function(){
        var schedule = $(this).find("option:selected").text();
        console.log(schedule);

        p = schedule;

        if(schedule == "Knockout"){
            document.getElementById('noofpools').innerHTML = '';
            createPools("number of pools");
            for(i = 0;i < 10; i++){
                createPools(i + 1);
            }
        }
        else if(schedule == "League"){
            document.getElementById('noofpools').innerHTML = '';
            createPools("number of pools");
            for(i = 0;i < 2; i++){
                createPools(i + 1);
            }
        }
        else if(schedule == "RoundRobin"){
            document.getElementById('noofpools').innerHTML = '';
            createPools("number of pools");
            for(i = 0;i < 2; i++){
                createPools(i + 1);
            }
        }
        else{
            document.getElementById('noofpools').innerHTML = '';    
            createPools("number Of Pools");
        }
    });


    $("#noofpools").change(function(){

        var pool = $(this).find("option:selected").text();
        console.log(pool);

        var i = 2 * parseInt(pool);

        if(p == "Knockout"){

            document.getElementById('noofteams').innerHTML = ''; 
            createTeams("number of teams");

            while(i <= 30){
                createTeams(i);
                console.log(i);
                i = i + parseInt(pool);
            }
        }
        else if(p == "RoundRobin"){

            document.getElementById('noofteams').innerHTML = '';
            createTeams("number of teams");


            while(i <= 10){
                createTeams(i);
                console.log(i);
                i = i + parseInt(pool);
            }
        }else if(p == "League"){
            if(i == 2){
                i = 4;
            }

            document.getElementById('noofteams').innerHTML = '';
            createTeams("number of teams");

            while(i <= 10){
                createTeams(i);
                console.log(i);
                i = i + parseInt(pool);
            }
        }
    });
});


//Server linking

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