//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 300;  //time in ms, 5 seconds for example
var $input = $('#knifeInput');

//on keyup, start the countdown
$input.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});

function doneTyping() {
    let input = $('#knifeInput').val();
    fetch('https://api.nangurepo.com/v2/assassin?name=' + input)
    .then(response => response.json())
    .then(data => {
        $('#valuetable').find('tr:gt(0)').remove();
        data.forEach(function(knife) {
            $('#valuetable').append(
                `<tr><th><img width=96 height=96 src="images/${knife['NAME'].toUpperCase().replace(/ /g,"_")}.png"></th><th>${knife['NAME']}</th><th>${knife['DEMAND']}</th><th>${knife['VALUE']}</th><th>${knife['OBTAIN']}</th><th>${knife['ORIGIN']}</th><th><button class="button" onclick="addItem('${knife['NAME']}', 'left')">LEFT</button><button class="button" onclick="addItem('${knife['NAME']}', 'right')">RIGHT</button><button class="button" onclick="addToInventory('${knife['NAME']}')">INVENTORY</button></th></tr>`
            );
        })
    });
}
