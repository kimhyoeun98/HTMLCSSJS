window.onload = function () {

  const savedToList = JSON.parse(localStorage.getItem("todoList"));

  // 저장된 할 일 목록이 있으면
  if (savedToList) {
    for (let todo of savedToList) {   
      createToDo(todo);               //createToDo 함수 호출
    }
  }

  const inputBox = document.querySelector("#inputBox");
  inputBox.addEventListener("keydown", (e) => {

    if (e.isComposing) return;
    if (e.key === "Enter") {
      createToDo();
    }
  });

  const startBtn = document.querySelector("#addBtn");
  startBtn.addEventListener("click", () => createToDo());

  //전체 삭제
  const allDeleteBtn = document.querySelector("#allDeleteBtn");
  allDeleteBtn.addEventListener("click", () => {
    const ulNode = document.querySelector("ul");

   //만약 할 일 목록 (li) 하나도 없다면
    if (ulNode.children.length === 0) {
      alert("삭제할 목록이 없습니다.");  //alert으로 경고창 띄우고
      return;    //종료
    }

    if (confirm("정말 삭제하시겠습니까?")) {  //확인 대화상자 띄우기

      localStorage.removeItem("todoList");   // localStorage에서 todoList 데이터 삭제
      ulNode.innerHTML = "";                 
    }
  });
};

function createToDo(todo) {
  const inputBox = document.querySelector("#inputBox");
  let text;

  if (todo) {
    text = todo.contents;
  } else {
    text = inputBox.value;
  }

  if (text.trim() === "") {
    alert("할 일을 입력해주세요.");
    return;
  }

  const liNode = document.createElement('li');

  //체크 버튼
  const checkBtn = document.createElement('button');
  checkBtn.classList.add("checkBtn");

  //할 일 텍스트
  const todoText = document.createElement('span');
  todoText.innerText = text;

  // 페이지 로드 시 기존에 체크된 항목 표시
  if (todo && todo.check) {
    todoText.classList.add('check');
    checkBtn.innerText = 'V';
  }

    checkBtn.addEventListener("click", function () {
    todoText.classList.toggle('check');

    if (checkBtn.innerText == "") checkBtn.innerText = "V";
    else checkBtn.innerText = "";

    saveToDoList();
  });

    //수정 버튼 
    const editBtn = document.createElement("button");
    editBtn.innerText = "수정";       //버튼은 수정으로 설정
    editBtn.classList.add("editBtn");   //editBtn이라는 클래스 추가

    editBtn.addEventListener("click", () => {
    const newText = prompt("수정할 내용을 입력하세요:", todoText.innerText);  
    //prompt 창 띄워서 새로운 내용 입력 받기

    //공백 일 시 실행 안됨
    if (newText !== null && newText.trim() !== "") {
      todoText.innerText = newText;
      saveToDoList();
    }
  });

  //삭제 버튼
    const delBtn = document.createElement('button');
    delBtn.innerText = 'X';
    delBtn.classList.add("delBtn");
    delBtn.addEventListener("click", function () {
      liNode.remove();

      saveToDoList();
  });



  // 생성된 요소들을 li 노드에 추가
  liNode.appendChild(checkBtn); //체크
  liNode.appendChild(todoText); //할일
  liNode.appendChild(editBtn);  //수정
  liNode.appendChild(delBtn);   //삭제

  // ul에 생성된 new li를 append 
  const ulNode = document.querySelector('ul');
  ulNode.appendChild(liNode);

  document.querySelector('#todolist').style.display = 'block';
  inputBox.value = '';

  // 새로운 항목 추가될 때만 저장 함수를 호출 
  if (!todo) {
    saveToDoList();
  }
}

function saveToDoList() {
  const todoList = document.querySelectorAll('li');
  const storageKey = 'todoList'; 

  if (todoList.length === 0) {
    localStorage.removeItem(storageKey);
    document.querySelector('#todolist').style.display = 'none'; // 목록이 없으면 다시 숨김
    return;
  }

  const saveItems = [];
  for (let node of todoList) {
    const todoObj = {
      contents: node.querySelector('span').innerText,
      check: node.querySelector('span').classList.contains('check')
    };
    saveItems.push(todoObj);
  }

  localStorage.setItem(storageKey, JSON.stringify(saveItems));
}