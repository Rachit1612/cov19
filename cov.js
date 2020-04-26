$(document).ready(function(){

  // Get json data from URL
  $.getJSON("https://api.covid19india.org/data.json",function(data){
    var states = [];
    var confirmed = [];
    var recovered = [];
    var deaths = [];
    // console.log(data.statewise);
    var total_confirmed;
    var total_active;
    var total_recovered;
    var total_death;




    $.each(data.statewise,function(id,obj){
      states.push(obj.state);
      confirmed.push(obj.confirmed);
      recovered.push(obj.recovered);
      deaths.push(obj.deaths);

    })
    // console.log(states) by shift one position;
    states.shift();
    confirmed.shift();
    recovered.shift();
    deaths.shift();
    // console.log(states);
    total_confirmed = data.statewise[0].confirmed;
    total_active = data.statewise[0].active;
    total_death = data.statewise[0].deaths;
    total_recovered = data.statewise[0].recovered;

    // console.log(total_confirmed);

    $('#confirmed').append(total_confirmed);
    $('#deaths').append(total_death);
    $('#recovered').append(total_recovered);
    $('#active').append(total_active);

    var myChart = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(myChart,{
      type:"bar",
      data:{
        labels:states,
        datasets:[{
          label:"Confirmed",
          data:confirmed,
          backgroundColor:"#9AC00D"
        },
        {
          label:"Recovered",
          data:recovered,
          backgroundColor:"#FF5733"
        },
        {
        label:"Deaths",
        data:deaths,
        backgroundColor:"#DAF7A6"
      }
        ]
      },
      options:{

        legend: {
          labels: {
         fontColor: '#ffffff'
      },
           fontColor: "white",
       },
       scales: {
           xAxes: [{
               ticks: {
                   fontColor: "white",
                   stepSize: 5,
                   beginAtZero: true
               }
           }],
           yAxes: [{
               ticks: {
                   fontColor: "white",
                   stepSize: 1000,
                   beginAtZero: true
               }
           }]
       }


      }
    })


  })

})
