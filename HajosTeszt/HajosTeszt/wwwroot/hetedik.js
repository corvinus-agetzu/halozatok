window.onload = function () {
    var csomag;
    function kérdésMegjelenítés(kérdés) {
      //  console.log(kérdés);
        
        document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
        document.getElementById("válasz1").innerText = kérdés.answer1
        document.getElementById("válasz2").innerText = kérdés.answer2
        document.getElementById("válasz3").innerText = kérdés.answer3
       if (kérdés.image == "") {
           teszt = document.getElementById("kép1");
           if (teszt != null) { teszt.remove(); }
           console.log("nincs kép");
           }
       else {
           console.log("van kép");
           ujkep = document.createElement("img");
           ujkep.id = "kép1";
           document.getElementById("kép").appendChild(ujkep);
           document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        }

      
        csomag = kérdés;
    }

    function kérdésBetöltés(id) {
        fetch(`/questions/${id}`)
            .then(response => {
                if (!response.ok) {
                    console.error(`Hibás válasz: ${response.status}`)
                }
                else {
                    return response.json()
                }
            })
            .then(data => kérdésMegjelenítés(data));
    }    




    function kattelőre() {

        if (i < 800) {
            i = i + 1
        }
        else { i = 0 };

        alapszín();
        kérdésBetöltés(i);
       

    };

    function katthátra() {
        if (i > 0) {
            i = i - 1
        }
        else i = 799;

        alapszín();
        kérdésBetöltés(i);
       
    };

    function válasz1() {

        if (1 == csomag.correctAnswer) {
            document.getElementById("válasz1").classList.add("jó")

        }
        else { document.getElementById("válasz1").classList.add("rossz") }
        document.getElementById("válasz1").classList.remove("kattinthato")
    };

    function válasz2() {

        if (2 == csomag.correctAnswer) {
            document.getElementById("válasz2").classList.add("jó")
        }
        else document.getElementById("válasz2").classList.add("rossz");
        document.getElementById("válasz2").classList.remove("kattinthato")
    };

    function válasz3() {

        if (3 == csomag.correctAnswer) {
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

  
    i = 1;
    kérdésBetöltés(i);


    document.getElementById("előre").onclick = kattelőre;

    document.getElementById("vissza").onclick = katthátra;

    document.getElementById("válasz1").onclick = válasz1;
    document.getElementById("válasz2").onclick = válasz2;
    document.getElementById("válasz3").onclick = válasz3;
}