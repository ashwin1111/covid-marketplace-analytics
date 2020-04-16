
$('.tbl-accordion-nested').each(function(){
    var thead = $(this).find('thead');
    var tbody = $(this).find('tbody');
    
    tbody.hide();
    thead.click(function(){
      tbody. slideToggle();
    })
  });   

/*--------------  coin_sales1 start ------------*/








 

function show_modal(time_slots_arr){
    console.log(time_slots_arr);

    if (time_slots_arr.length>0){
        var k= '<p>';
            for (j=0;j<time_slots_arr.length;j++){
                k+=time_slots_arr[j];
                k+='<br>';
            }
            k+='</p>';
            document.getElementById('slots').innerHTML = k;
            break;
    }
    else{
        document.getElementById('slots').innerHTML = "No Timeslots assigned";
    }
}
    
    

  







// var today = new Date();
// var curr_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
// console.log(curr_date);

let today = new Date().toISOString().slice(0, 10)

console.log(today)

     
fetch('https://covid19-pollachi.herokuapp.com/analytics/get_date_counts?on_date='+today+'', {mode: 'cors'})
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {
    console.log('Request successful', text);
    
    
    var date_wise_data = JSON.parse(text).DateWise_data;

    
    
  

                    
                    var k = '<tbody>'
                    for(i = 0;i < date_wise_data.length; i++){
                        // var temp=s_state[i].replace(/ +/g, "");
                        console.log(i);
                        var time_slots=[]
                        for (m=0;m< date_wise_data[i]['time_slot_data'].length;m++){
                            time_slots.push(date_wise_data[i]['time_slot_data'][m]['time_slot_range'])
                        }
                        console.log(time_slots);

                        k+= '<tr>';
                        k+= '<td>' + date_wise_data[i]['market_palce_name'] + '</td>';
                        k+= '<td>' + date_wise_data[i]['market_place_address'] + '</td>';
                        k+= '<td>' + date_wise_data[i]['present_people'] + '</td>';
                        k+= '<td>' + date_wise_data[i]['visited_people'] + '</td>';
                        k+= '<td>' + date_wise_data[i]['customer_max_count'] + '</td>';
                        
                        k+='<td><button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleLongModalLong2'+i+'" >View</button></td>';
                        k+='<div class="modal fade" id="exampleLongModalLong2'+i+'">';
                        k+='            <div class="modal-dialog">';
                        k+='                <div class="modal-content">';
                        k+='                    <div class="modal-header">';
                        k+='                        <h5 class="modal-title" style=" color: #007bff; ">Time Slots</h5>';
                        k+='                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>';
                        k+='                    </div>';
                        k+='                    <div class="modal-body">';
                        
            
                        k+='                        <p >'+time_slots.join('</br>')+'</p>';

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





                   






