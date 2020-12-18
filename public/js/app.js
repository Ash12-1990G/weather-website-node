const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');

const loc = document.querySelector('#loc');

const temp = document.querySelector('#temp');

const msg = document.querySelector('#msg');

const icon = document.querySelector('#icon');
icon.src='/images/cloud.png';


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    messageOne.textContent='Loading..';
    fetch('/weather?address='+location).then((response) => {
        
        response.json().then((data) => {
           console.log(data);
            if (data.error) {
                if(messageOne){
                    
                    messageOne.textContent=data.error;
                    icon.src='/images/alert.png';
                }
               
                loc.textContent='';
                temp.textContent='';
                msg.textContent='';
                
            } else {
                loc.textContent = data.location;
                msg.textContent = data.forecast;
                temp.textContent = data.temperature+' F';
                icon.src=data.icon;
                messageOne.textContent = '';
                time.textContent = data.loacaltime;

            }
        });
    });
});