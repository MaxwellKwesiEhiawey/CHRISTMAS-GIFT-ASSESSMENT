var table = document.getElementById('user-item-body'),
    inputHash = {
        '0': 'name',
        '1': 'email',
        '2': 'usertype',
        '3': 'userid',
        '4': 'department',
        '5': 'status'
    };

// Get the modal
var modal = document.getElementById("myModal");

var addusermodal = document.getElementById("adduserModal");

// Get the button that opens the modal
var btn = document.getElementById("kc_fab_main_btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var spanUser = document.getElementsByClassName("closeUser")[0];


for ( var i in inputHash )
inputHash[ i ] = document.getElementById( inputHash[ i ] );

table.addEventListener( 'click', function( evt ) {
    var target = evt.target;
    
    if ( target.nodeName != 'TD' )
        return;
    
    var columns = target.parentNode.getElementsByTagName( 'td' );

    for ( var i in inputHash)
        if (inputHash[i].nodeName === 'INPUT'){
            inputHash[ i ].value = columns[ i ].innerHTML;
        }
        else if(inputHash[i].nodeName === 'SELECT'){
            for(var k, j = 0; k = inputHash[ i ].options[j]; j++) {
                if(k.value === columns[ i ].innerHTML) {
                    inputHash[i].selectedIndex = j;
                    break;
                }
            }
        }
        

    modal.style.display = "block";
} );

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display == "none"
}

spanUser.onclick = function() {
  addusermodal.style.display == "none"
}

btn.onclick = function() {
    addusermodal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == addusermodal) {
    addusermodal.style.display = "none";
  }
}