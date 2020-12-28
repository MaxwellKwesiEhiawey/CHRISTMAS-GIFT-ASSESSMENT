var visa = document.querySelector("#visa");
var mscard = document.querySelector("#mscard");
var mtn = document.querySelector("#mtn");
var tigo = document.querySelector("#tigo");
var visaBody = document.querySelector("#panel-body-card");
var momoBody = document.querySelector("#panel-body-momo");

function onLoad(){
    visa.addEventListener('click', cardHandler);
    mtn.addEventListener('click', momoHandler);
    mscard.addEventListener('click', cardHandler);
    tigo.addEventListener('click', momoHandler);
}

const cardHandler = function(e){
    momoBody.style.display = "none";
    visaBody.style.display = "block";
}
const momoHandler = function(e){
    visaBody.style.display = "none";
    momoBody.style.display = "block";
}