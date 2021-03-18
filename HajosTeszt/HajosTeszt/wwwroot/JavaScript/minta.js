console.log("minta fut!")

var faktoriális = function (n) {
    let eredmény = 1;
    for (var i = 2; i <=n; i++) {
        eredmény = eredmény * i;
    }
    return eredmény;
}

var faktoriálisR = (n) => {
    if (n===0 || n===1) {
        return 1;
    } else {
        return n * faktoriálisR(n - 1);
    }

}

for (var i = 0; i < 10; i++) {
    console.log(`${i} : ${faktoriálisR(i)}`)
}

function számítás() {
    let n = document.getElementById("nTb").value;
    let n2 = parseInt(n)
    if (n2) {
        let eredmény = faktoriálisR(n)
        document.getElementById("EredményDiv").innerText = eredmény;
    }
    else {
        document.getElementById("EredményDiv").innerText = "Nem számot adott meg!";
    }

}