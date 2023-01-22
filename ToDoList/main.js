//유저가 값을 입력한다.
//+버튼을 클릭시 할일이 추가 된다.
//유저가 delete버튼을 누르면 리스트에서 완전 삭제 된다.
//check버튼을 누르면 밑줄이 그어진다
 //1.check버튼을 클릭하는 순간 true, false
 //2.true이면 끝난걸로 간주하고 밑줄 보여 주기
 //3.false이면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면 언더바가 이동
//끝난 탭과 진행중인 탭을 구분한다. 
//전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput=document.getElementById("task-input");

let addButton=document.getElementById("add-button");
addButton.addEventListener("click", plusTask);//클릭하면 plus함수로 이동()


let checkButton=document.getElementById("check-button");
let deleteButton=document.getElementById("delete-button");

let tabs=document.querySelectorAll(".task-tabs div");//task-tabs의 아래 있는 div모두 get
console.log(tabs)
let mode="all";
let filterList=[];
let taskList=[];
for (let i=1; i<tabs.length; i++){//under-line제외
    tabs[i].addEventListener("click", function(event){
        filter(event);
    });
}


function filter(event){//tab을 click할때 마다 filter함수가 실행이 된다.
    mode=event.target.id;//변수쓰기 귀찮으니까 mode로 간단히
    filterList=[];
    document.getElementById("under-line").style.width=event.target.offsetWidth+"px";
    document.getElementById("under-line").style.top=event.target.offsetTop+event.target.offsetHeight+"px";
    document.getElementById("under-line").style.left=event.target.offsetLeft+"px";
    
    console.log("change tab click bar : "+event.target.id);//event.target::어떤걸 click했는지 알고 싶을때 사용
    
    if(mode="ongoing"){//만약 진행중이면 
        for(let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete==false){//완료되지 않은것들만 filterList에 저장
                filterList.push(taskList[i]);
            }    
        }
        //taskList=filterList;//이렇게 쓰면 taskList가 filterList로 덮어 쓰기 되서 다시 all-tab을 누르면 filterList만 보여줘(이전의 모두 data증발) 
        render();
    }else if(mode=="done"){
        console.log("you clicked mode Done?")
        for(let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete){
                filterList.push(taskList[i]);
            }    
        }
        render();
    }
    
}


function plusTask(){
    //let taskContent=taskInput.value;
    let task={//객체
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    };
    taskList.push(task);
    console.log("plus");
    console.log(taskList);
    render();
}

function render(){//UI-Update
    let list=[];//filter-function내의 list가 덮어쓰여지는 문제점을 해결하기 위해 아무의미 없는 배열 선언
    if(mode=="all"){
        list=taskList;
    }//만약 mode==all이면 list는 기존의 taskList
    else{
        list=filterList;
    }//ongoing상태이면, list에 filterList를 할당
    
    let resultHTML='';
    for(let i=0;i<list.length;i++){//렌더링할때 현재 tab-mode에 맞는 list를 rendering
        if(list[i].isComplete){
            resultHTML+=`<div class="task">
            <div class="task-done"> ${list[i].taskContent}</div>
            <div>
                <button class="button-checked" onclick="toggleComplete('${list[i].id}')" >Check</button>
                <button  onclick="toggleDelete('${list[i].id}')">Delete</button>
            </div>
          </div>`;
        }else{
            resultHTML+=`<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button class="button-checked" onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }
    }
    document.getElementById("task-board").innerHTML=resultHTML;
}


function toggleComplete(id){
    console.log("id: "+id);
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
        // if()
    }
    console.log(taskList);
    
    //changeColor();
    render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substring(2,9);
}

function deleteTask(id){
    console.log("delete id"+id);
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList.splice(i,1);//task.length=0과 동일 단, 성능적으로 splice가 우수하여 splice사용함. 
            break;
        }
    }
    render();//값이 update되면 UI도 update해줘야 
    console.log(taskList);
}

