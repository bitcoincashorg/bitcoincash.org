var address = "bitcoincash:qr9cwy7fsamcj53n47hmz6lcg0c0zye46c84r45vkv";
// temp address MUST BE REPLACED 

var amount = 800;
var url = 'https://rest.bitcoin.com/v2/address/details/' + address;
var balance = 0;
var percentage = 0;


function updateThermometer(data) { 
      balance = data.balance;
      balance += data.unconfirmedBalance;
      balance += 60;
  
      percentage = (balance / amount) * 100;
   
      updateLevel(percentage);
}

function updateLevel(percentageValue) {
    if (percentageValue >= 100) {

        percentageValue = 100;
        $("#mercury").css("border-radius", "50px 50px 0 0");
        $(".donation-request").html( amount + " BCH Goal Reached!");
        $("#mercury").css("height", percentageValue + "%");
        $(".amountline").css("display", "none");
    }

    else if (percentageValue < 0) { percentageValue = 0; }

    else {
      $(".donation-request").html( amount + " BCH");
      $("#mercury").css("height", percentageValue + "%");
      $(".amountlinenumber").append(balance.toFixed(3) + " BCH");
      $(".amountline").css("bottom", percentageValue + "%");
      $(".amountlinenumber ").css("bottom", percentageValue + "%");

    }
}





$.ajax({
  dataType: "json",
  url: url,
  success: function(data){
    updateThermometer(data);
  }
});


