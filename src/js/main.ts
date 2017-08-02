"use strict";

function Test() {
    console.log("This is working so well.");
}

let foo = async () => "hello world";
let bar = async () => await foo();
bar();
Test();

// module.exports = Test;