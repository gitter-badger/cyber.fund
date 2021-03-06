Template['btcPriceSimple'].helpers({
  price: function(){
    var btc = CurrentData.findOne({_id: "Bitcoin"});
    if (btc && btc.metrics) return Blaze._globalHelpers.readableNumbers( parseFloat(btc.metrics.price.usd).toFixed(2));
    return ""
  }
});
