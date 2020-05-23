
$('.tbl-accordion-nested').each(function(){
    var thead = $(this).find('thead');
    var tbody = $(this).find('tbody');
    
    tbody.hide();
    thead.click(function(){
      tbody. slideToggle();
    })
  });   

/*--------------  coin_sales1 start ------------*/

// var longDateStr = moment('02/12/2013', 'M/D/Y').format('MMM D');
// console.log(longDateStr);



var date = new Date();
    var month = date.getMonth()+1;
    var monthString;
    if (month < 10) {
      monthString = '0' + month.toString();
    } else {
      monthString = month.toString();
    }
var dateString = date.getFullYear().toString() + '-' + monthString  + '-' + date.getDate().toString();
// console.log(dateString);







 

function show_modal(market_id){

  
  document.getElementById("modal_data").innerHTML = "Loading...";
    fetch('https://covid19-marketplace.herokuapp.com/analytics/get_date_counts?on_date='+dateString+'', {mode: 'cors'})
      .then(function(response) {
      return response.text();
    })
    .then(function(text) {
    var date_wise_data = JSON.parse(text).DateWise_data;
    // console.log(date_wise_data[0]['market_place_id']);
    
    for(i=0;i<date_wise_data.length;i++){
      
     
      
      if(date_wise_data[i].market_place_id==market_id){
        
        var k= '<p>';
        for(j=0;j<date_wise_data[i]['time_slot_data'].length;j++){
          k+=date_wise_data[i]['time_slot_data'][j]['time_slot_range']+" - "+date_wise_data[i]['time_slot_data'][j]['remaining_booking_count'] ;
          k+='<br>';
        }
        k+='</p>';
        document.getElementById("modal_data").innerHTML = k;
        break;

        
      }
      else{
        
        document.getElementById("modal_data").innerHTML = "No Data Available";
      }
    }

   

})
.catch(function(error) {
  console.log('Request failed', error)
});
}
    
fetch('https://covid19-marketplace.herokuapp.com/analytics/get_time_slots_on_date?on_date='+dateString+'', {mode: 'cors'})
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {
    // console.log('Request successful', text);
    var date_wise_count_data = JSON.parse(text).DateWise_count_data;
    document.getElementById('v1').innerHTML = (date_wise_count_data[0]['market_count']);
    document.getElementById('v2').innerHTML = (date_wise_count_data[0]['first_time_slot'].split('to')[0].trim());
    document.getElementById('v3').innerHTML = (date_wise_count_data[0]['last_time_slot'].split('to')[1].trim());
  })
  .catch(function(error) {
    log('Request failed', error)
  });
  









     
fetch('https://covid19-marketplace.herokuapp.com/analytics/get_date_counts?on_date='+dateString+'', {mode: 'cors'})
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {
    // console.log('Request successful', text);
    
    
    var date_wise_data = JSON.parse(text).DateWise_data;

    
    
  

                    
                    var k = '<tbody>'
                    for(i = 0;i < date_wise_data.length; i++){
                        
                        var time_slots=[]
                        for (m=0;m< date_wise_data[i]['time_slot_data'].length;m++){
                            time_slots.push(date_wise_data[i]['time_slot_data'][m]['time_slot_range'])
                        }
                        

                        k+= '<tr>';
                        k+= '<td>' + date_wise_data[i]['market_palce_name'] + '</td>';
                        k+= '<td>' + date_wise_data[i]['market_place_address'] + '</td>';
                        k+= '<td>' + date_wise_data[i]['present_people'] + '</td>';
                        k+= '<td>' + date_wise_data[i]['visited_people'] + '</td>';
                        k+= '<td>' + date_wise_data[i]['customer_max_count'] + '</td>';
                        
                        k+='<td><button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleLongModalLong2" onclick=show_modal("'+date_wise_data[i]['market_place_id']+'")>View</button></td>';
                        k+='<div class="modal fade" id="exampleLongModalLong2">';
                        k+='            <div class="modal-dialog">';
                        k+='                <div class="modal-content">';
                        k+='                    <div class="modal-header">';
                        k+='                        <h5 class="modal-title" style=" color: #007bff; ">Time Slots And Their Vacancy Count</h5>';
                        k+='                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>';
                        k+='                    </div>';
                        k+='                    <div class="modal-body">';
                       
                        k+='                        <p id="modal_data"></p>';

                        k+='                    </div>';
                        k+='                    <div class="modal-footer">';
                        k+='                        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>';
                        
                        k+='                    </div>';
                        k+='                </div>';
                        k+='            </div>';
                        k+='        </div>';




                    }                   
                        
                    
                    k+='</tbody>';
                    document.getElementById('tableData').innerHTML = k;


                        })
.catch(function(error) {
  console.log('Request failed', error)
});





                   



fetch('https://covid19-marketplace.herokuapp.com/analytics/get_daily_counts?on_date='+dateString+'', {mode: 'cors'})
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {
    // console.log('Request successful', text);
    
    var daily_data = JSON.parse(text).Daily_data;
    var date_arr=[];
    var daily_booked=[];
    var daily_visited=[];
    
    

    daily_data.forEach(element => {
        // console.log(';loop', element.date);
        date_arr.push(element.on_date);
        daily_booked.push(element.booked_count);
        daily_visited.push(element.visited_count);
  
        


    });

    //  console.log(date_arr);
     new_date_arr=[];
     for (t=0;t<date_arr.length;t++){
      //  console.log(date_arr[t]);
      new_date_arr.push(moment(date_arr[t], 'Y-M-D').format('MMM D'))
     }
     
    
    // console.log(new_date_arr);
  


new Chart(document.getElementById("mixed-chart"), {
  type: 'bar',
  
  data: {
    labels: new_date_arr,
    
    datasets: [
      // {
      //   label: "Booked",
      //   type: "line",
      //   borderColor: "#ebcf92",
      //   data: daily_booked,
      //   fill: false
      // }, {
      //   label: "Visited",
      //   type: "line",
      //   borderColor: "#9adfaa",
      //   data: daily_visited,
      //   fill: false
      // },
       {
        label: "Booked",
        type: "bar",
        backgroundColor: "#ebcf92",
        data: daily_booked,
      }, {
        label: "Visited",
        type: "bar",
        backgroundColor: "#9adfaa",
        backgroundColorHover: "#9adfaa",
        data: daily_visited,
      }
    ]
  },
  options: {
    scales: {
      yAxes: [{
          ticks: {
              suggestedMin: 0
              
          }
          
      }],
      xAxes: [{
        ticks: {
        autoSkip: false
        }
        }]
  },
    title: {
      display: false,
      text: 'Population growth (millions): Europe & Africa'
    },
    legend: { display: false }
  }
 
  
});
})
.catch(function(error) {
  console.log('Request failed', error)
});
      
