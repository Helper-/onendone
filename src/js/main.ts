"use strict";

function initAutoComplete() {
    // Create the search box and link it to the UI element.
    const input = <HTMLInputElement>document.getElementById("autocomplete");
    const searchBox = new google.maps.places.SearchBox(input);
    searchBox.addListener("places_changed", function(){
        const listener = searchBox.getPlaces();

        if (listener.length == 0) {
            return;
        }
        else {
            const loc = listener[0].geometry.location;
            console.log("This is the loc: %s ", JSON.stringify(loc.toJSON()));

            // const xhr = new XMLHttpRequest();
            // xhr.open("POST", "http://localhost:8000/query");
            // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            // xhr.send(JSON.stringify(loc.toJSON()));

            // xhr.onreadystatechange = function () { // Call a function when the state changes.
            //     if (xhr.readyState == 4 && xhr.status == 200) {
            //         console.log(xhr.response);
            //         displayRestaurant(xhr.response);
            //     }
            // };

        }


    });
}

function sendInput() {
    let sendArr: Array<any> = [];
    sendArr.push((<HTMLInputElement>document.getElementById("keyword")).value);
    console.log(sendArr);

    // const xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://localhost:8000/query");
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    // xhr.send(JSON.stringify(loc.toJSON()));

    // xhr.onreadystatechange = function () { // Call a function when the state changes.
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //         console.log(xhr.response);
    //         displayRestaurant(xhr.response);
    //     }
    // };
}

function displayRestaurant (response: any) {
    const tempObj = JSON.parse(response);

    OrderByArray(tempObj.Results, "rating").map(item => item.rating);
    console.log(tempObj.Results);
}

function OrderByArray(values: any[], orderType: any) {
    return values.sort((a, b) => {
        if (a[orderType] > b[orderType]) {
            return -1;
        }

        if (a[orderType] < b[orderType]) {
            return 1;
        }

        return 0;
    });
}