

function updateCard(data) { 
      ABC_balance = data[0].balance;
      ABC_balance += data[0].unconfirmedBalance;
      $("#ABC_balance").html( ABC_balance.toFixed(2) + " BCH" );
      $("#add-abc-address").html( ABC_address );
      var ABC_percentage = (ABC_balance / goalAmount) * 100;
      $("#abc-bar").css("width", ABC_percentage + "%");
      $("#abc-goal").html( ABC_percentage.toFixed(2) + "% of goal reached" );
      $('#abc-badger').attr('data-to', ABC_address); 


      BU_balance = data[1].balance;
      BU_balance += data[1].unconfirmedBalance;
      $("#BU_balance").html( BU_balance.toFixed(2) + " BCH" );
      $("#add-bu-address").html( BU_address );
      var BU_percentage = (BU_balance / goalAmount) * 100;
      $("#bu-bar").css("width", BU_percentage + "%");
      $("#bu-goal").html( BU_percentage.toFixed(2) + "% of goal reached" );
      $('#bu-badger').attr('data-to', BU_address);


      HD_balance = data[2].balance;
      HD_balance += data[2].unconfirmedBalance;
      $("#HD_balance").html( HD_balance.toFixed(2) + " BCH" );
      $("#add-hd-address").html( HD_address );
      var HD_percentage = (HD_balance / goalAmount) * 100;
      $("#hd-bar").css("width", HD_percentage + "%");
      $("#hd-goal").html( HD_percentage.toFixed(2) + "% of goal reached" );
      $('#hd-badger').attr('data-to', HD_address); 


      BC_balance = data[3].balance;
      BC_balance += data[3].unconfirmedBalance;
      $("#BC_balance").html( BC_balance.toFixed(2) + " BCH" );
      $("#add-bc-address").html( BC_address );
      var BC_percentage = (BC_balance / goalAmount) * 100;
      $("#bc-bar").css("width", BC_percentage + "%");
      $("#bc-goal").html( BC_percentage.toFixed(2) + "% of goal reached" );
      $('#bc-badger').attr('data-to', BC_address);   
    
}


function totalBalance(data) { 

      for ( i=0; i<data.length; i++) {
        total_balance += data[i].balance;
        total_balance += data[i].unconfirmedBalance;
      }

      $(".total-dontations").html(total_balance.toFixed(2) + " BCH Total Raised");
      var total_percentage = (total_balance / goalAmount) * 100;
      $(".total-percentage").html(total_percentage.toFixed(0) + "% raised of " + goalAmount + "BCH Goal");
      $("#total-bar").css("width", total_percentage + "%");
      $("#total-goal").html( total_percentage + "% of goal reached" );
    
}


// REPLACE THESE ADDRESSES BEFORE LAUNCH
// SETUP GOAL BCH AMOUNT TO RAISE

let goalAmount = .2;
let ABC_address = "bitcoincash:qzv23kyk5nan5qgdwrml0hmld6d2eawqlgh8d4hjxv";
let BU_address = "bitcoincash:qqge3f8vxxglxrk49gj2424tswr9gp4nf58pwrx8c3";
let HD_address = "bitcoincash:qq0uxvqjxktfdg9h8dq9p8am9pfwg5pu3gpvk0qvzt";
let BC_address = "bitcoincash:qqrrx43rvs8w7yet3atcwwy60gvjdtupry6ypdml8g";
let total_balance = 0;



let postingObj = {
  "addresses": [
    ABC_address,
    BU_address,
    HD_address,
    BC_address
  ]
}

let urlDos = 'https://rest.bitcoin.com/v2/address/details/'


$.ajax({
  dataType: 'json',
  type: 'POST',
  contentType: 'application/json',
  url: urlDos,
  data: JSON.stringify(postingObj),
  success: function(data){    
    updateCard(data);
    totalBalance(data);
  },
  error: function(err) {
    console.log(err.responseJSON.error)
  }
});















