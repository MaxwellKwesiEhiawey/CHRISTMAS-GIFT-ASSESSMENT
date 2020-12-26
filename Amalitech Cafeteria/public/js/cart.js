var input = document.getElementById('demoInput');
function increment() {
    var value = input.value;
    input.value = Number(value)+1;
}
function decrement() {
    var value = input.value;
    input.value = Number(value)-1;
}