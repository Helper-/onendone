"use strict";

function Test() {
    console.log("This is working so well.");
}

let test = async () => "hello world";
let bar = async () => await test();
bar();
Test();

// module.exports = Test;