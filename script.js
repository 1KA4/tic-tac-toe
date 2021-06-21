let arr = new Array(9).fill("");
let botArr = [];
let winPos = [[0,1,2], 
              [3,4,5], 
              [6,7,8], 
              [0,3,6], 
              [1,4,7], 
              [2,5,8], 
              [0,4,8], 
              [2,4,6]];

function clearArray(){
    for (let i = 0; i < arr.length; i++) {
        arr[i] = "";
    }
}

function addX(position) {
    let name = +$(position).attr("name");
    arr[name] = "x";
}

function addO(position) {
    let name = +$(position).attr("name");
    arr[name] = "o";
}

function checkArray() {
    $(".item").each(function(item) {
        if(arr[+item] == "x"){
            $("[name = "+ item +"]").html('<i class="fas fa-times"></i>');
        }
    
        if(arr[+item] == "o"){
            $("[name = "+ item +"]").html('<i class="far fa-circle"></i>');
        }
    });
}

function botStep(figure){
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] == ""){
            botArr.push(i);
        }
        
    }

    let rand = Math.floor(Math.random() * botArr.length);
    arr[botArr[rand]] = (figure == "o") ? "o" : "x";
    botArr = [];
    winCombitation();

}

function end(text){
    $(".modalWindow").addClass("modalShow");
    $(".modalTitle").text(text);
}

function winCombitation() {
    for (let i = 0; i < winPos.length; i++) {
        let xCounter = 0;
        let oCounter = 0;
        for (let y = 0; y < winPos[i].length; y++) {
            if(arr[winPos[i][y]] == "x"){
                xCounter++;
            }

            if(arr[winPos[i][y]] == "o"){
                oCounter++;
            }
        }

        if(xCounter == 3){
            end("You Win!");
            return;
        }

        if(oCounter == 3){
            end("You lose!");
            return;
        }
    }

    let flag = 0;
    arr.forEach((e) => {
        if(e != ""){
            flag++;
        }
    });

    if(flag == 9){
        end("Remis");
    }
}

$(".item").on("click",function() {
    let pos = +$(this).attr("name");
    let flag = false;
    if(arr[pos] == ""){
        addX(this);
        flag = true;
    }
    winCombitation();
    if(flag){
        botStep("o");
        
    }
    checkArray();
});

$(".modalNo").on("click", function(){
    window.close();
});

$(".modalYes").on("click", function() {
    $(".modalWindow").removeClass("modalShow");
    $(".item").html("");
    clearArray();
    checkArray();
});
