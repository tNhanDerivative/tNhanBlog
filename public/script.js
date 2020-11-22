function calculatePrice() {
    var buyPrice = Number(document.getElementById("buyPrice").value);
    var proType = document.getElementById("profitType").value;

    if (buyPrice=="") {
        alert("Please enter Buy in Price!");
        return;
    }
    if (proType==0){
        alert("Please enter Product Type");
        return;
    }

    // Calculate Price
    var salePrice = buyPrice + (buyPrice * proType);
    //Round to at most 2 decimal places  https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
    salePrice = Math.round(salePrice * 100) / 100;
    salePrice = salePrice.toFixed(2);

    document.getElementById("salePrice").innerHTML = salePrice;
    document.getElementById("priceDisplay").style.display ="block";
    
}

document.getElementById("priceDisplay").style.display = "none";

document.getElementById("calculate").onclick = function() {
    calculatePrice();
}