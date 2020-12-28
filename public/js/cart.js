var input = document.getElementById('demoInput');
function onLoad(){
    input.addEventListener('input', inputHandler);
    var price = (document.getElementById('item-price').innerText).substring(3);
    var value = input.value;
    var total = Number(price) * Number(value);
    document.getElementById('item-total').innerText = `GH ${total}`;
}
function increment() {
    var value = input.value;
    var result = Number(value)+ 1;
    input.value = result;
    calculateTotal(result);
}
function decrement() {
    var value = input.value;
    var result = (Number(value) > 0)?Number(value)-1:0;
    input.value = result;
    calculateTotal(result);
}

function calculateTotal(val){
    var price = (document.getElementById('item-price').innerText).substring(3);
    var total = Number(price) * Number(val);

    document.getElementById('item-total').innerText = `GH ${total}`;
}

const inputHandler = function(e){
    var inputValue = e.target.value;
    calculateTotal(Number(inputValue));
}

//event listeners
