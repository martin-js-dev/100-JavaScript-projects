//Calculate Tip
function calculateTip() {
    var amount = document.getElementById("amount").value;
    var satisfaction = document.getElementById("satisfaction").value;
    var numPeople = document.getElementById("number-people").value;


    if (amount === "" || satisfaction == 0) {
        alert("Please enter values");
        return;
    }

    if (numPeople === "" || numPeople <= 1) {
        numPeople = 1;
        document.getElementById("each").style.display = "none";
    } else {
        document.getElementById("each").style.display = "block";
    }


    var total = (amount * satisfaction) / numPeople;

    total = Math.round(total * 100) / 100;

    total = total.toFixed(2);

    document.getElementById("tip-amount").style.display = "block";
    document.getElementById("tip").innerHTML = total;

}


document.getElementById("tip-amount").style.display = "none";
document.getElementById("each").style.display = "none";


document.getElementById("calculate").onclick = function () {
    calculateTip();

};
