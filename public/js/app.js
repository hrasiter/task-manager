console.log('Client side javascript file is loaded')

const message1= document.querySelector('#message-1')
const message2= document.querySelector('#message-2')

message1.textContent = ''
message2.textContent = ''

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDM0MWEyNTViZGFjYzFhOWRmMTZlNGEiLCJpYXQiOjE2MTQyMDAzMzl9.OyRlZ8ST-71vKp70NZ43PHQ96gdNZGSFo1aV-jNuyfk");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("tasks", requestOptions)
.then((response) => {

    response.json().then((data) => {
        if(data.error){
            message1.textContent = data.error
            message2.textContent = ''
        }
        else{
            // message1.textContent = data.place
            // message2.textContent = data.forecast
            message1.textContent = ''
            data.forEach(task => {
                message1.textContent += ' ' + task.description
            });


        }

    })
})
