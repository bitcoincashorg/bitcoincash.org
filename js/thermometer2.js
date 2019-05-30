


function updateCard(data) { 
    for ( i=0; i<data.length; i++) {
        balance += data[i].balance;
        balance += data[i].unconfirmedBalance;
        transactions += data[i].transactions.length
      }

      var countDownDate = new Date("Aug 1, 2019 15:37:25").getTime();
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      $("#days-to-go").html( days );


      $("#balance").html( balance.toFixed(2) + " BCH" );
      $("#transactions").html( transactions );
     
      var balance_percentage = ( balance / goal) * 100;
      $("#goal-bar").css("width", balance_percentage + "%");
      $(".goal-percentage").html(balance_percentage.toFixed() + "% of goal reached");
      
      
}





let goal = 800;
let balance = 0;
let transactions = 0;

let ABC_address = "bitcoincash:qp0kctzt552fhpypt7e6v5dtk3u4qjp3pst59ct28x";
let ABC_legacy = "19hYnDdS1hoMSxNbzLSWuso1jLSnntE3J7";

let BU_address = "bitcoincash:qpe28qt72runzsru4pp9cwmf7veppx9rpva4eqv9rf";
let BU_legacy = "1BT9uTHRJ1uxcoa9GEQctmagApwpAa1LXy";

let HD_address = "bitcoincash:qrr4f95f3n682ue6wxdn03ncptyjc53k7uyxwlt2tt";
let HD_legacy = "1KAxoTLSc8KYMucetJRBYWdK9n7yszMC3J";

let BC_address = "bitcoincash:qrg06kynha5mqrey8lsvrcne2yl9c3xtfqc2nj6a5q";
let BC_legacy = "1L433h1CWc5TQWXeYPk8cry7qDkwW7cGta";

let general_address = "bitcoincash:qq29gww57twmvq07las39p3m65x8nw2ngvvuq6adpn";
let general_legacy = "12rVQxQ31ZtpRCRKM924W7fs35GBdQm65J";



let restCall = {
  "addresses": [
    ABC_address,
    BU_address,
    HD_address,
    BC_address,
    general_address
  ]
}

let url = 'https://rest.bitcoin.com/v2/address/details/'


$.ajax({
  dataType: 'json',
  type: 'POST',
  contentType: 'application/json',
  url: url,
  data: JSON.stringify(restCall),
  success: function(data){    
    updateCard(data);
    console.log(data);
  },
  error: function(err) {
    console.log(err.responseJSON.error)
  }
});





let txWatcher = new WebSocket("wss://ws.blockchain.info/bch/inv")

txWatcher.onopen = event => {    
    txWatcher.send(JSON.stringify({ "op":"addr_sub", "addr": general_legacy }))
    console.log(`Subscribed to ${general_legacy}`)    
  }

  function onWatchedTx() {
    // Code below will be entered every time a BCH tx is received by a subscribed address
    txWatcher.onmessage = event => {
      let tx = JSON.parse(event.data)
      // Parse the received transaction
      console.log(`New transaction!`)
      console.log(tx)
      // Get the sending address (mb you want to have a popup saying "Received x from y!")
      console.log(`Sending Address:`)
      let sendingAddr = tx.x.inputs[0].prev_out.addr
      console.log(sendingAddr)
      // Parse the transaction to figure out how much was sent and to what address
      // First, initialize variables for this tx
      
      let amountGeneral = 0
      for (let i=0; i<tx.x.out.length; i++) {
        switch(tx.x.out[i].addr) {
          case general_legacy:
            amountGeneral += tx.x.out[i].value
            break
          default:
            // Do nothing
            // This case happens when the output didn't go to one of the watched addresses
            // Means it's probably a change output, back to sender
            //console.log(`Output not received by watched address; probably change from sender`)
        }
      }
     
      if (amountGeneral !== 0) {
        balance += amountGeneral/1e8;
        transactions += 1;
        $("#balance").html( balance.toFixed(2) + " BCH" );
        $("#transactions").html( transactions );
        $("#thank-you-card-general").fadeIn().html("<div class='inner-thank-you'><p>New Donation Received!</p><div>" + amountGeneral/1e8.toFixed(2) + " BCH was just donated from " + "<span>" + sendingAddr + "</span>" + " <br>Thank you!</div></div>").delay(5000).fadeOut();
      }      
    }
  }
  // Call this function onLoad
  onWatchedTx()







