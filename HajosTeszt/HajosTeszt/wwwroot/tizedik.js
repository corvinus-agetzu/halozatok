








window.onload = function() {

 


    function kérdésBetöltés(questionNumber, destination) {
        fetch(`/questions/${questionNumber}`)
            .then(
                result => {
                    if (!result.ok) {
                        console.error(`Hibás letöltés: ${response.status}`)
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
                        displayedQuestion = 0;
                        kérdésMegjelenítés();
                    }

                }
            );
    }



    var hotList = []; //Az éppen gyakoroltatott kérdések listája 
    var displayedQuestion; //A hotList-ből éppen ez a kérdés van kint
    var numberOfQuestions = 4; //Kérdések száma a teljes adatbázisban
    const questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
    var nextQuestion = 0; //A következő kérdés száma a teljes listában
    var timeoutHandler;



    init();
    displayedQuestion = 0;
    kérdésMegjelenítés();
    document.getElementById("előre").onclick = kattelőre;

    document.getElementById("vissza").onclick = katthátra;

    document.getElementById("válasz1").onclick = valasz1;
    document.getElementById("válasz2").onclick = valasz2;
    document.getElementById("válasz3").onclick = valasz3;



    function init() {
        for (var i = 0; i < questionsInHotList; i++) {
            let q = {
                question: {},
                goodAnswers: 0
            }
            hotList[i] = q;
        }

        //Első kérdések letöltése
        for (var i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    }


    function kérdésMegjelenítés() {
        let kérdés = hotList[displayedQuestion].question;

        let ide = document.getElementById("kérdés_szöveg");
        ide.innerText = kérdés.questionText;

        let idekep = document.getElementById("kép1");
        idekep.src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;

        let válasz1 = document.getElementById("válasz1");
        válasz1.innerText = kérdés.answer1;
        let válasz2 = document.getElementById("válasz2");
        válasz2.innerText = kérdés.answer2;
        let válasz3 = document.getElementById("válasz3");
        válasz3.innerText = kérdés.answer3;

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
                // if (nextQuestion = numberOfQuestions) return;
                nextQuestion = nextQuestion + 1;
            }


        } else { document.getElementById("válasz" + valaszsorszam).classList.add("rossz") };

        for (i = 1; i < 4; i++) {
            document.getElementById("válasz" + i).style.pointerEvents = "none"
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