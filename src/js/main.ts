"use strict";

// import {} from "@types/googlemaps";


function Test() {
    console.log("This is working so well.");
}

// let test = async () => "hello world";
// let bar = async () => await test();
// bar();
Test();

// module.exports = Test;

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
            const lat = listener[0].geometry.location;
            console.log("This is the lat: %s ", JSON.stringify(lat.toJSON()));

        }


    });
}