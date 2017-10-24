// A comma separated list of currencies to display.
var ticker_currencies = "USD,EUR,JPY,CNY"

ticker = function(currencies) {
  var symbols = {
    USD: "$",
    CNY: "¥",
    JPY: "¥",
    EUR: "€"
  }

  $.ajax({
    type: "GET",
    url: "https://min-api.cryptocompare.com/data/price?fsym=BCH&tsyms=" + currencies,
    contentType: "application/json; charset=utf-8",
    timeout: 6000,
    error: function (x, t, m) {
      if ($('#ticker_value').html() === 'Loading...') {
        $('#ticker_value').html("N/A");
      }
    },
    success: function (currencyRates) {
      var output = [];

      $.each(currencyRates, function (currency, price) {
        var sym = symbols[currency];
        if (sym === undefined) {
          sym = "";
        }
        output.push("BCH/" + currency + "&nbsp;" + sym + price);
      });

      $('#ticker_value').html(output.join(" &bull; "));
    }
  }).done(function () {
    setTimeout(function(){ ticker(ticker_currencies); }, 10000);
  }).fail(function() {
    setTimeout(function(){ ticker(ticker_currencies); }, 10000);
  });
}

ticker(ticker_currencies);