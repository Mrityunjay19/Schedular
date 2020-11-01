var sport;
var noofpools;
var noofteams;
var type;

$(document).ready(function(){

    $("#selectsport").change(function() {
        
        
        var text = $('#heading');
        var desc = $('#desc');


        var selectedsportvalue = $(this).find(':selected').val();    //FOR BUTTON
        var selectedsporttext = $(this).find(':selected').text();    //FOR TEXT CHANGING
        sport = selectedsportvalue;
        console.log(sport);


        //TO CHANGE THE TEXT OF H1 AND H5
        if(selectedsporttext == "Chess"){
            text.html("Chess Schedular");
            desc.html("Create the Chess Tournament Schedule now");
        }else if(selectedsporttext == "Cricket"){
            text.html("Cricket Schedular");
            desc.html("Create the Cricket Tournament Schedule now");
        }else if(selectedsporttext == "Football"){
            text.html("Football Schedular");
            desc.html("Create the Football Tournament Schedule now");
        }else if(selectedsporttext == "select"){
            text.html("Tournament Schedular");
            desc.html("Create the schedule for your tournament now.");
        }

        $('#submit').click(function(){

            // window.open(selectedsport,'blank');
            document.location.href = selectedsportvalue;



        });  

    });


    // TO GET THE NO. OF TEAMS
    $("#noofteams").change(function() {

        var selectedteamtext = $(this).find(':selected').text();    

        noofteams = selectedteamtext;
        console.log(noofteams);
    });


    //TO GET THE NO OF POOLS
    $("#noofpools").change(function() {

        var selectedpoolnum = $(this).find(':selected').text();    

        noofpools = selectedpoolnum;
        console.log(noofpools);
    });

    //TO GET THE TYPE OF SCHEDULE
    $("#typeofschedule").change(function() {

        var selectedschedule = $(this).find(':selected').text();    

        var sport_type = sport;
        var noofpools_type = noofpools;
        var noofteams_type = noofteams;

        type = selectedschedule;
        console.log(type,"  ",sport_type,"  ",noofpools_type,"   ",noofteams_type); 

        //export{ noofpools_type, noofteams_type, type};
        
    }); 


});
