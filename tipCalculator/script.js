
function calcTip() {
  let Amount = document.getElementById("bill").value;
  let service = document.getElementById("service").value;
  let number = document.getElementById("people").value;

  if (Amount === "" || service == 0) {
    alert("Please enter values");
    return;
  }

  if (number === "" || number <= 1) {
    number = 1;
    document.getElementById("all").style.display = "none";
  } else {
    document.getElementById("all").style.display = "block";
  }


  let total = (Amount * service) / number;
  total = Math.round(total * 100) / 100;
  total = total.toFixed(2);

  document.getElementById("total").style.display = "block";
  document.getElementById("tip").innerHTML = total;

}

document.getElementById("total").style.display = "none";
document.getElementById("all").style.display = "none";


document.getElementById("calculateTip").onclick = function() {
  calcTip();

};
