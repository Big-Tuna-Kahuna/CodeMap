var body = document.body;
var search = document.getElementById("search");
var tilted = false;
var d = [];//for holding original json data
var objects;//for holding results of search on json data
var heights = [0,0,0,0,0,0,0,0,0,0];



    fetch('/static/all_locations_all_jobtypes.json')//fetch json file
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //appendData(data, 0);//sends json data to be displayed
            d = data;//copies data to d
            objects = data;//copies same data to objects
        })
        //logs errors to the console
        .catch(function (err) {
            console.log('error: ' + err);
        });

var per_page = 10;//starts website with 10 results per page
var j = 0;//stores which page currently on
var a = 0;//starting page to load results




function showDetails() {
    tilted = !tilted;
    if (tilted){
       body.classList.add('details');
       setHeight();
    }
    else
        body.classList.remove('details');

}

function setHeight(){



    barChildren = document.querySelectorAll(".bar");
    if(tilted){
        for ( i = 0; i < heights.length; i++){
            console.log(heights[i]);
            barChildren[i].style.height = heights[i] + "px";
            barChildren[i].style.marginTop = -heights[i] + "px";
            barChildren[i].querySelector("p").innerText = heights[i];
        }
    }
    else{
        for ( i = 0; i < heights.length; i++){
            console.log(heights[i]);
            barChildren[i].style.height =  "0px";
            barChildren[i].style.marginTop = "0px";
        }
    }
}

function calcHeight(){
    for ( i =0; i < heights.length; i++){
        heights[i] = (heights[i]/totalCount) * 100;
    }
}



function displayList(city) {
var temp = [];
if (city == 1){
    for(let i in objects){
        if(objects[i].location.includes('Seattle')){
            temp.push(objects[i]);
        }
    }
}if (city == 2){
    for(let i in objects){
        if(objects[i].location.includes('Francisco')){
            temp.push(objects[i]);
        }
    }
}if (city == 3){
    for(let i in objects){
        if(objects[i].location.includes('Jose')){
            temp.push(objects[i]);
        }
    }
}if (city == 4){
    for(let i in objects){
        if(objects[i].location.includes('Denver')){
            temp.push(objects[i]);
        }
    }
}if (city == 5){
    for(let i in objects){
        if(objects[i].location.includes('Austin')){
            temp.push(objects[i]);
        }
    }
}if (city == 6){
    for(let i in objects){
        if(objects[i].location.includes('Dallas')){
            temp.push(objects[i]);
        }
    }
}if (city == 7){
    for(let i in objects){
        if(objects[i].location.includes('Detroit')){
            temp.push(objects[i]);
        }
    }
}if (city == 8){
    for(let i in objects){
        if(objects[i].location.includes('Charlotte')){
            temp.push(objects[i]);
        }
    }
}if (city == 9){
    for(let i in objects){
        if(objects[i].location.includes('Raleigh')){
            temp.push(objects[i]);
        }
    }
}if (city == 10){
    for(let i in objects){
        if(objects[i].location.includes('Washington')){
            temp.push(objects[i]);
        }
    }
}




fetch('/hello', {

    // Declare what type of data we're sending
    headers: {
      'Content-Type': 'application/json'
    },

    // Specify the method
    method: 'POST',

    // A JSON payload
    body: JSON.stringify(temp)
}).then(function (response) {
    return response.text();
}).then(function (text) {

    console.log('POST response: ');

    // Should print 'OK' successful
    console.log(text);
});
}

//body.addEventListener('click', toggleTilt);
if (location.pathname.match(/fullcpgrid/i))
    setTimeout(toggleTilt, 1000);



//Help with this function
function find(query) {//searches the d array for title, cast, and genre by keyword
    //document.getElementById("jobs").innerHTML = "";
    objects = [];//clear array

    var title;//for title lowercase

    //City counters
    totalCount = 0;
    for (let i in heights){
        heights[i] = 0;
    }

    let value = query.toLowerCase();//value pulled from search bar
    for (var i =0; i < d.length; i++) {
        title = d[i].title.toLowerCase();//pulling data from array
        let company = d[i].company.toLowerCase();
        let location = d[i].location.toLowerCase();
        let summary = d[i].summary.toLowerCase();
        if (title.includes(value)) {//if title data equals search, push title into new array
           objects.push(d[i]);
        }
        if (company.includes(value)) {//if company data equals search, push title into new array
           objects.push(d[i]);
        }
        if (location.includes(value)) {//if location data equals search, push title into new array
           objects.push(d[i]);
        }
        //if (summary.includes(value)) {
        //    objects.push(d[i]);
        //}



    }

    //Loop through object:
    for (let i in objects) {
        //Temp holder
        var name = objects[i].location;
        //Counter for cities:
        if (name == 'Seattle, WA') {
            heights[0] ++;
            totalCount += 1;
        } else if (name.includes('Francisco')) {
            heights[1] ++;
            totalCount ++;
        } else if (name.includes('Jose')) {
            heights[2] ++;
            totalCount += 1;
        } else if (name.includes('Denver')) {
            heights[3] ++;
            totalCount += 1;
        } else if (name.includes('Austin')) {
            heights[4] ++;
            totalCount += 1;
        } else if (name.includes('Dallas')) {
            heights[5] ++;
            totalCount += 1;
        } else if (name.includes('Detroit')) {
            heights[6] ++;
            totalCount += 1;
        } else if (name.includes('Charlotte')) {
            heights[7] ++;
            totalCount += 1;
        } else if (name.includes('Raleigh')) {
            heights[8] ++;
            totalCount += 1;
        } else if (name.includes('Washington')) {
            heights[9] ++;
            totalCount += 1;
        }

    }
     for ( i = 0; i < heights.length; i++) {
         console.log(heights[i]);
     }
     document.getElementById("results").innerHTML = totalCount;
     showDetails();

    //function call here passing in count values for city:

    a = 0;
    //appendData(objects, a);//update view

}
