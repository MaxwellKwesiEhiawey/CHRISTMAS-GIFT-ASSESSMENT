var select = document.getElementById("status");
var input = document.getElementById("cardCVC");
var apply = document.querySelector('#apply-coupon');
var total = document.querySelector('#total');
console.log(total.value)

select.addEventListener('change',function(){
    if(select.value == 'coupon') apply.style.display = 'block';
    else apply.style.display = 'none';
})

apply.addEventListener('click', function(){
    var newTotal = (total.value - (total.value * 0.3)).toFixed(2);
    total.value = newTotal;
})