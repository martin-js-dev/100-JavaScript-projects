function temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    document.getElementById("outputCelsius").innerHTML = Math.round((valNum - 32) / 1.8);

    document.getElementById("outputKelvin").innerHTML = Math.round(((valNum - 32) / 1.8) + 273.15);
}
