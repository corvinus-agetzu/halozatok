window.onload = function () {

    console.log("start");

    let hova = document.getElementById("ide");

    hova.classList.add("sor");

    for (var s = 0; s < 10; s++) {

        let szám = document.createElement("div");
        szám.classList.add("elem");
        szám.innerText = s;
        szám.style.color = "white";
        szám.style.background = `rgb(0,0,${255 - s * 20})`;
        hova.appendChild(szám);

    }


    //faktoriális fgv

    var faktorialis = function (n) {
        let er = 1;
        for (let i = 2; i <= n; i++) {
            er = er * i;

        }
        return er;
    }

    // pascal háromszög

    let pharomszog = document.getElementById("Pascal");

    for (var s = 0; s < 10; s++) {

        let sr = document.createElement("div");

        sr.classList.add("sor");

        pharomszog.appendChild(sr);

        for (var oszlop = 0; oszlop <= s; oszlop++) {

            let o = document.createElement("div");

            o.classList.add("elem");

            o.innerText = faktorialis(s) / (faktorialis(oszlop) * faktorialis(s - oszlop));
            o.style.background = "rgb(247,251,50)";
            //  `rgb(${255 / 10 * s},0,${255 / 10 * o})`

            sr.appendChild(o);
        }
    }




}