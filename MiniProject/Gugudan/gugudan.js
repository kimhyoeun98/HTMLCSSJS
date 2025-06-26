window.onload = function() {
    const btnNode = document.querySelector("#displayBtn");
    btnNode.addEventListener("click", doGugudan);
}

function doGugudan() {
    const inputBox = document.querySelector("#inputBox");
    const danNumber = inputBox.value;
    if (danNumber === "") return;

    document.querySelector("#danNumber").innerText = `${danNumber}단`

    let result = "";
    for (let i = 1; i <= 9; i++) {
        result += `${danNumber} x ${i} = ${String(danNumber * i).padStart(2,' ')}<br>`
    }

    const resultNode = document.querySelector("#result");
    resultNode.innerHTML = result;

    document.querySelector('.displayArea').style.display = 'block';
}