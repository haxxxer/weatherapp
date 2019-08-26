console.log('Client side javascript file is loaded!');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
let messageOne = document.querySelector('#message-one');
let messageTwo = document.querySelector('#message-two');


messageOne.textContent = 'Loding...';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    console.log('clicked')
    const location = search.value;
    fetch('http://localhost:3000/weather?address=' + location).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forcast;
                console.log(messageOne)
            }
        });
    });
});

