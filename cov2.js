$("#drop").ready(function(){

  var drop = $("#drop");
  drop.empty();

  $.getJSON("https://api.covid19india.org/data.json",function(data){

    var state = data.statewise;
    var state_list=[];
    var state_deaths=[];
    var state_confirmed=[];
    var state_recovered=[];
    var last_updated=[];

    $.each(state,function(id,obj){

      state_list.push(obj.state);
      state_deaths.push(obj.deaths);
      state_recovered.push(obj.recovered);
      state_confirmed.push(obj.confirmed);
      last_updated.push(obj.lastupdatedtime)

      drop.append("<option value=\""+id+"\">"+obj.state+"</option>")


    })


    $("#qq").click(function(){
      var dd = $("#drop");
      var idx = dd.val();
      // console.log(idx);
      // console.log(state_list[idx]);
      $('h1').text("***"+state_list[idx]+"***");
      $('.fo').fadeOut('fast');
      $('#refresh').append("<a href=\"index.html\">HOME</a> <br> ")
      $('#refresh').append("<a href=\"state_cov.html\">Check Other State</a> <br>")
      $('#updated').append("{ Last Updated On: "+last_updated[idx]+" }")
      $('#bottom_note').append("*Click on the Confirmed/Recovered/Deaths buttons above to see the chart individually.*")


      var myC = document.getElementById("myChart2").getContext('2d');
      var chart2 = new Chart(myC,{
        type:"pie",
        data:{
          labels: ['Confirmed','Deaths','Recovered'],
          datasets:[{
            label:"Info",
            data:[state_confirmed[idx],state_deaths[idx],state_recovered[idx]],
            backgroundColor:[
                '#9AC00D',
                '#DAF7A6',
                '#FF5733'
            ]
          }]
        },
        options: {
          legend: {
            labels: {
           fontColor: '#ffffff'
        },
      },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
      })
    })
  })
})
