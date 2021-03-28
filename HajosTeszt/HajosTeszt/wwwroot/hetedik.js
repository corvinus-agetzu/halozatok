
        var kérdések

       
        function letöltésBefejeződött(d) {
            console.log("Sikeres letöltés")
            //console.log(d)
            kérdések = d; console.log(kérdések);

}

window.onload = function () {
    var i = 0;

    válaszMegjelenítés(i);

    kérdésMegjelenítés(i);

    document.getElementById("előre").onclick = kattelőre;

    document.getElementById("vissza").onclick = katthátra;

    document.getElementById("válasz1").onclick = válasz1;
    document.getElementById("válasz2").onclick = válasz2;
    document.getElementById("válasz3").onclick = válasz3;




    function kérdésMegjelenítés(i) {
        let ide = document.getElementById("kérdés_szöveg");
        ide.innerText = kérdések[i].questionText;

        let idekep = document.getElementById("kép1");
        idekep.src = "https://szoft1.comeback.hu/hajo/" + kérdések[i].image;

    }

    function válaszMegjelenítés(i) {
        console.log(kérdések);
        let válasz1 = document.getElementById("válasz1");
        console.log(i);
        
        válasz1.innerText = kérdések[i].answer2;       
        let válasz2 = document.getElementById("válasz2");
        válasz2.innerText = kérdések[i].answer2;
        let válasz3 = document.getElementById("válasz3");
        válasz3.innerText = kérdések[i].answer3;

    }


    function kattelőre() {

        if (i < kérdések.length - 1) {
            i = i + 1
        }
        else { i = 0 };

        alapszín();
        válaszMegjelenítés(i);
        kérdésMegjelenítés(i);

    };

    function katthátra() {
        if (i > 0) {
            i = i - 1
        }
        else i = kérdések.length - 1;

        alapszín();
        válaszMegjelenítés(i);
        kérdésMegjelenítés(i);
    };

    function válasz1() {

        if (1 == kérdések[i].correctAnswer) {
            document.getElementById("válasz1").classList.add("jó")

        }
        else { document.getElementById("válasz1").classList.add("rossz") }
        document.getElementById("válasz1").classList.remove("kattinthato")
    };

    function válasz2() {

        if (2 == kérdések[i].correctAnswer) {
            document.getElementById("válasz2").classList.add("jó")
        }
        else document.getElementById("válasz2").classList.add("rossz");
        document.getElementById("válasz2").classList.remove("kattinthato")
    };

    function válasz3() {

        if (3 == kérdések[i].correctAnswer) {
            document.getElementById("válasz3").classList.add("jó")
        }
        else document.getElementById("válasz3").classList.add("rossz");
        document.getElementById("válasz3").classList.remove("kattinthato")
    };

    function alapszín() {
        document.getElementById("válasz1").classList.remove("jó")
        document.getElementById("válasz1").classList.remove("rossz")
        document.getElementById("válasz2").classList.remove("jó")
        document.getElementById("válasz2").classList.remove("rossz")
        document.getElementById("válasz3").classList.remove("jó")
        document.getElementById("válasz3").classList.remove("rossz")
        document.getElementById("válasz1").classList.add("kattinthato")
        document.getElementById("válasz2").classList.add("kattinthato")
        document.getElementById("válasz3").classList.add("kattinthato")
    }
}
