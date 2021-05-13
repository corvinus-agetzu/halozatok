function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${result.status}`)
                    return null;

                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) { //!!!!letöltésénél elkapni azt az esetet, amikor még nincs beállítva a displayedQuestion változó (értéke undefined), és éppen a hotList 0. helyére töltöttünk le kérdést!!!!!!!!!
                    console.log("na ezaz")
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }

            }
        );
}



var hotList = []; //Az éppen gyakoroltatott kérdések listája 
var displayedQuestion; //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions; //Kérdések száma a teljes adatbázisban
const questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var nextQuestion = 1; //A következő kérdés száma a teljes listában
var timeoutHandler;



window.onload = init;






function init() {

    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;



        //kérdések száma
        fetch("questions/count")
            .then(result => result.text())
            .then(n => { numberOfQuestions = parseInt(n) })

        //mentett állapot visszaolvasása
        if (localStorage.getItem("hotList")) {
            hotList = localStorage.getItem(hotlist);
        }
        if (localStorage.getItem("displayedQuestion")) {
            displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"))
        }
        if (localStorage.get("nextQuestion")) {
            nextQuestion = parseInt(localStorage.getItem("nextQuestion"))
        }

        //Első kérdések letöltése
        if (hotList.length() === 0) {
            for (var i = 0; i < questionsInHotList; i++) {
                kérdésBetöltés(nextQuestion, i);
                nextQuestion++;
            }
        } else {

            kérdésMegjelenítés()
        }

        // gombok
        document.getElementById("előre").onclick = kattelőre;

        document.getElementById("vissza").onclick = katthátra;

        document.getElementById("válasz1").onclick = valasz1;
        document.getElementById("válasz2").onclick = valasz2;
        document.getElementById("válasz3").onclick = valasz3;


    }


    function kérdésMegjelenítés() {
        let kérdés = hotList[displayedQuestion].question;

        document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
        document.getElementById("válasz1").innerText = kérdés.answer1
        document.getElementById("válasz2").innerText = kérdés.answer2
        document.getElementById("válasz3").innerText = kérdés.answer3
        if (kérdés.image == "") {
            teszt = document.getElementById("kép1");
            if (teszt != null) { teszt.remove(); }
            console.log("nincs kép");
        } else {
            console.log("van kép");
            ujkep = document.createElement("img");
            ujkep.id = "kép1";
            document.getElementById("kép").appendChild(ujkep);
            document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;

        }

    }




    function kattelőre() {
        clearTimeout(timeoutHandler);
        displayedQuestion++;
        if (displayedQuestion == questionsInHotList) { displayedQuestion = 0 };
        alapszín();
        kérdésMegjelenítés()
    };


    function katthátra() {
        clearTimeout(timeoutHandler);
        displayedQuestion--;
        if (displayedQuestion == -1) { displayedQuestion = questionsInHotList - 1 };
        alapszín();
        kérdésMegjelenítés()
    };

    function valasz1() {
        valasz(1);
    };

    function valasz2() {
        valasz(2);
    }

    function valasz3() {
        valasz(3);
    }


    function valasz(valaszsorszam) {
        timeoutHandler = setTimeout(kattelőre, 3000);
        if (valaszsorszam == hotList[displayedQuestion].question.correctAnswer) {

            document.getElementById("válasz" + valaszsorszam).classList.add("jó");

            if (hotList[displayedQuestion].goodAnswers < 2) {
                hotList[displayedQuestion].goodAnswers = hotList[displayedQuestion].goodAnswers + 1
                console.log(hotList[displayedQuestion].goodAnswers);
            } else {
                kérdésBetöltés(nextQuestion, displayedQuestion);
                if (nextQuestion = numberOfQuestions) return;
                nextQuestion = nextQuestion++;

            }


        } else { document.getElementById("válasz" + valaszsorszam).classList.add("rossz") };

        for (i = 1; i < 4; i++) {
            document.getElementById("válasz" + i).style.pointerEvents = "none"

            localStorage.setItem("hotlist", JSON.stringify(hotList));
            localStorage.setItem("displayedQuestion", displayedQuestion);
            localStorage.setItem("nextQuestion", nextQuestion);
        }


    };

    function alapszín() {
        document.getElementById("válasz1").classList.remove("jó")
        document.getElementById("válasz1").classList.remove("rossz")
        document.getElementById("válasz2").classList.remove("jó")
        document.getElementById("válasz2").classList.remove("rossz")
        document.getElementById("válasz3").classList.remove("jó")
        document.getElementById("válasz3").classList.remove("rossz")
        document.getElementById("válasz1").style.pointerEvents = "auto"
        document.getElementById("válasz2").style.pointerEvents = "auto"
        document.getElementById("válasz3").style.pointerEvents = "auto"
    }



};