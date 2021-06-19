const submitBtn = document.getElementById('submitBtn');
const inputID = document.getElementById('inputID');
const container = document.getElementById('container');
const clearAll = document.getElementById('clearAll');


let locationsArr = [];
let tempNode = '';

submitBtn.addEventListener('click', submitLocation)
clearAll.addEventListener('click', clearAllFunc)


function clearAllFunc() {
    locationsArr = []
    renderArr();
    setData()
}

function submitLocation() {
    locationsArr.push(inputID.value)
    console.log(locationsArr)

    renderArr()
}

function renderArr() {
    container.textContent = '';
    for (let i = 0; i < locationsArr.length; i++) {
        // container.textContent = '';

        const leftDiv = document.createElement('div')
        const rightDiv = document.createElement('div')


        const newCard = document.createElement('div');
        const newSpan = document.createElement('span')
        // newSpan.setAttribute('id', 'spanID')
        // const newContent = document.createTextNode(locationsArr[i])
        // asyncWeather()
        // newCard.appendChild(newContent)
        container.appendChild(newCard)
        // newCard.appendChild(newSpan)
        newCard.classList.add('weatherCard')
        rightDiv.classList.add('rightDiv')
        leftDiv.classList.add('leftDiv')
        newCard.append(leftDiv)
        newCard.append(rightDiv)
        // container.append(rightDiv)

        asyncWeather()

        async function asyncWeather(){
            // inputID = inputID.value;
            console.log(inputID);
            
            const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + locationsArr[i] + ',&APPID=20bfa48eac5aa19ce97a2f0bab3b4f8f&units=metric', {mode: 'cors'})
            const weatherData = await response.json();
            console.log(response);
            console.log(weatherData);
            tempNode = weatherData.main.temp;
            humidNode = weatherData.main.humidity;
            feelsLikeNode = weatherData.main.feels_like;
            weatherImg = weatherData.weather[0].icon;
            imgSrc = 'http://openweathermap.org/img/wn/' + weatherImg + '@2x.png';
            weatherDesc = weatherData.weather[0].description;
            console.log(tempNode)
            // spanID.textContent = tempNode;
            // const feels_like = weatherData.main.feels_like
            // newData = document.createTextNode(feels_like)
            // cardDiv.appendChild(newData)
            const classesLeftDiv = document.getElementsByClassName('leftDiv')
            const classesrightDiv = document.getElementsByClassName('rightDiv')
            classesLeftDiv[i].textContent += ' ' + locationsArr[i];
            // classesrightDiv[i].textContent += humidNode + '% Humidity';
            // classesrightDiv[i].innerHTML += '<br>';
            // classesrightDiv[i].textContent += feelsLikeNode + '°C Feels like';
            rightDiv.append(document.createElement('div'))
            rightDiv.innerHTML += `<div>Humidity: <span id="humidRight"></span></div>
                                    
                                    `
            rightDiv.innerHTML += "<div><h4>Feels like: <span id='innerNodeFeel'></span></h4></div>"
            rightDiv.innerHTML += '<div><img src="" alt="" id="imgRight"></div>'
            rightDiv.innerHTML += "<div>Feels like: <span id='weatherDescRight'></span></div>"

            document.getElementById('innerNodeFeel').innerText += feelsLikeNode;
            document.getElementById('humidRight').innerText += humidNode;
            document.getElementById('imgRight').src = imgSrc;
            document.getElementById('weatherDescRight').innerText += weatherDesc;

            

            rightDiv.append += "<h1>Test</h1>";

            leftDiv.innerHTML += "<div><h1 id='degreesLeft'></h1></div>"
            document.getElementById('degreesLeft').innerText += tempNode + '°C';
            // rightDiv.append(document.createElement('div').textContent = 'fffffffffff');
            // rightDiv.append(document.createElement('div').textContent = '645645544345');
            document.getElementById('humidRight').setAttribute('id', locationsArr.length);
            document.getElementById('degreesLeft').setAttribute('id', locationsArr.length);
            document.getElementById('imgRight').setAttribute('id', locationsArr.length);
            document.getElementById('innerNodeFeel').setAttribute('id', locationsArr.length);
            document.getElementById('weatherDescRight').setAttribute('id', locationsArr.length);
            
            setData()

        }
    }

}

function setData() {
    localStorage.setItem(`locationsArr`, JSON.stringify(locationsArr));
}

function restore() {
    if(!localStorage.locationsArr) {
        // render();
    }else {
        let objects = localStorage.getItem('locationsArr') // gets information from local storage to use in below loop to create DOM/display
        objectsParse = JSON.parse(objects);
        locationsArr = objectsParse;
        renderArr();
    }
}

restore()


// async function asyncWeather(){
//     // inputID = inputID.value;
//     console.log(inputID);
    
//     const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputID.value + ',&APPID=20bfa48eac5aa19ce97a2f0bab3b4f8f&units=metric', {mode: 'cors'})
//     const weatherData = await response.json();
//     console.log(response);
//     console.log(weatherData);
//     const feels_like = weatherData.main.feels_like
//     cardDiv.textContent += (feels_like);
// }