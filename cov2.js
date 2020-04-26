$("#drop").ready(function(){

  var drop = $("#drop");
  drop.empty();

  $.getJSON("https://api.covid19india.org/data.json",function(data){

    var state = data.statewise;
    var state_list=[];
    var state_deaths=[];
    var state_confirmed=[];
    var state_recovered=[];
    var state_active=[];
    var last_updated=[];

    $.each(state,function(id,obj){

      state_list.push(obj.state);
      state_deaths.push(obj.deaths);
      state_recovered.push(obj.recovered);
      state_confirmed.push(obj.confirmed);
      state_active.push(obj.active);
      last_updated.push(obj.lastupdatedtime)

      drop.append("<option value=\""+id+"\">"+obj.state+"</option>")


    })


    $("#qq").click(function(){
      var dd = $("#drop");
      var idx = dd.val();
      // console.log(idx);
      // console.log(state_list[idx]);
      $('#c2').text("***"+state_list[idx]+"***");
      $('.fo').fadeOut('fast');
      document.getElementById('inf').style.display='block';
      $('#refresh').append("<a href=\"index.html\">HOME</a> <br> ")
      $('#refresh').append("<a href=\"state_cov.html\">Check Other State</a> <br>")
      $('#updated').append("{ Last Updated On: "+last_updated[idx]+" }")
      $('#bottom_note').append("*Click on the Confirmed/Recovered/Deaths buttons above to see the chart individually.*")

      $('#confirmed').append(state_confirmed[idx]);
      $('#deaths').append(state_deaths[idx]);
      $('#recovered').append(state_recovered[idx]);
      $('#active').append(state_active[idx]);


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
