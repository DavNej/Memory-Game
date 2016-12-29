var MemoryGame = {};

 MemoryGame.imageSources = [];
 
 MemoryGame.selectedCards = 0;
 MemoryGame.firstCard = 0;
 MemoryGame.secondCard = 0;
 MemoryGame.pairs=6;

 MemoryGame.paused = false;

 MemoryGame.back = "url(./images/back.jpg)";

MemoryGame.createBoard = function(){

    var container = document.getElementsByClassName('container')[0];

    //create array of image sources
    for (var i = 0; i < 6; i++){
        MemoryGame.imageSources.push("images/"+ (i+1) + ".jpg");
        MemoryGame.imageSources.push("images/"+ (i+1) + ".jpg");
    }

    MemoryGame.shuffle(MemoryGame.imageSources);

    for (var i=0; i < 4; i++){
        var row = document.createElement('div');
        row.classList.add("row");
        //row.id = "row" + (i+1);

        for (var j=0; j < 3; j++){
            var card = document.createElement('div');
            card.classList.add("card", "col-xs-3");
            card.id = (3*i + j);
            card.style.borderRadius = "5px";
            card.style.backgroundImage = MemoryGame.back;
            card.addEventListener("click", MemoryGame.pick);
            row.appendChild(card);
        }
        document.getElementsByClassName('container')[0].appendChild(row);
    }
}
MemoryGame.shuffle = function(array) {
    var j, temp, i;
    
    for (i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        temp = array[i - 1];
        array[i - 1] = array[j];
        array[j] = temp;
    }
    // for (var i = 0; i < 2*array.length; i++){
    //     var random = Math.floor(Math.random()*copy.length);
    //     shuffled.push(array[random2]);
    //     array.splice(random, 1);
    // }
}

MemoryGame.pick =function(e){
    
    if (!MemoryGame.paused){       
        //show


        e.target.style.backgroundImage = "url(" + MemoryGame.imageSources[e.target.id] + ")";
        console.log('Hit!');
        if (MemoryGame.selectedCards == 0){
            MemoryGame.firstCard = e.target;
            MemoryGame.selectedCards=1;
        }
        else{
            MemoryGame.secondCard = e.target;
            MemoryGame.paused = true;
            MemoryGame.compare();
        }
    }
    //victory
                if (MemoryGame.pairs == MemoryGame.imageSources.length/2){
                    MemoryGame.win();
                }
                /*******/
} 

MemoryGame.compare = function(){
    if(MemoryGame.paused){
        if (MemoryGame.firstCard.style.backgroundImage == MemoryGame.secondCard.style.backgroundImage){
            //MemoryGame.firstCard.setAttribute("picked", "true");        
            MemoryGame.paused = false;
            MemoryGame.selectedCards = 0;
            MemoryGame.pairs++;
            console.log("Pairs :", MemoryGame.pairs);
         }

        //return card
        else if(MemoryGame.firstCard.style.backgroundImage != MemoryGame.secondCard.style.backgroundImage){
            setTimeout(function(){
                MemoryGame.firstCard.style.backgroundImage = MemoryGame.back;
                MemoryGame.secondCard.style.backgroundImage = MemoryGame.back;
                
                MemoryGame.firstCard = 0;
                MemoryGame.secondCard = 0;
                
                MemoryGame.paused=false;
                MemoryGame.selectedCards = 0;
            }, 1000);
        }
    }
}

MemoryGame.win = function(){
    $('#popup').click();
}

MemoryGame.start=function(){
    MemoryGame.createBoard();
}

MemoryGame.start();