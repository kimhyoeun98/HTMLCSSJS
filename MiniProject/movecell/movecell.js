let size; // 테이블의 가로, 세로 셀의 수
let curLoc; // 현재 커서가 출력된 셀 위치
let tdNodes; // 테이블 내의 td 노드의 리스트

window.onload = function() {
        const startBtn = document.querySelector("#startBtn");
    startBtn.addEventListener("click", doMoveCell);

    const inputBox = document.querySelector("#inputBox")
    inputBox.addEventListener("keydown", function(event) {
        if (event.key === 'Enter')
            doMoveCell();
    });
}

function doMoveCell() {
    makeTable();
    curLoc = 0;

    // 랜덤으로 초기 위치 선정
    curLoc = Math.floor(Math.random() * (size * size));
    console.log(curLoc)

    tdNodes[curLoc].style.backgroundColor = "violet";

    window.onkeydown = function(event) {
        if (event.key < 37 || event.key > 40) return;

        //  이전 셀 초기화
        tdNodes[curLoc].style.backgroundColor = "white";

        // row, col
        let row = Math.floor(curLoc / size);
        let col = curLoc % size;

        // 입력된 화살표 키에 따라 curLoc 계산
        switch (event.key) {
            case 'ArrowLeft' :
                if (col > 0) curLoc -= 1;
                else curLoc += (size - 1)
                break;
            case 'ArrowRight' :
                if (col < size-1) curLoc += 1;
                else curLoc -= (size - 1)
                break;
            case 'ArrowUp' :
                if (row > 0) curLoc -= size;
                else curLoc += size * (size-1)
                break;
            case 'ArrowDown' :
                if (row < size-1) curLoc += size;
                else curLoc -= size * (size-1);
                break;
        }

        tdNodes[curLoc].style.backgroundColor = "violet";

    }
    
}

function makeTable() {
    const inputBox = document.querySelector("#inputBox");
    if (inputBox.value == "") {
        return;
    }

    size = Number(inputBox.value);

    const displayArea = document.querySelector(".displayArea");
    let tableHTML = '<table>' + ('<tr>'+'<td></td>'.repeat(size) +'</tr>').repeat(size) + '</table>'
    displayArea.innerHTML = tableHTML;
    tdNodes = document.querySelectorAll('td');
}