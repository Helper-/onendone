"use strict";

function Test() {
    console.log("This is working");
}

let foo = async () => "hello world";
let bar = async () => await foo();
bar();

module.exports = Test;