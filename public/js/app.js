const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';

document.querySelector('form').addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = search.value;
    messageOne.textContent = "Loading..";
    messageTwo.textContent = "";

    fetch('/weather?location='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error;
            messageTwo.textContent = "";
        }else{
            messageOne.textContent = data.forecast;
            messageTwo.textContent =  data.location + ' , '+data.region;
        }
    })
})
})