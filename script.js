const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let history = [];

/* =========================
   PRIME CHECK
========================= */
function isPrime(n){

    if(n < 2) return false;

    for(let i=2;i*i<=n;i++){

        if(n % i === 0){
            return false;
        }
    }

    return true;
}

/* =========================
   FACTORS
========================= */
function getFactors(n){

    let arr = [];

    for(let i=1;i<=n;i++){

        if(n % i === 0){
            arr.push(i);
        }
    }

    return arr;
}

/* =========================
   ANALYSIS
========================= */
function analyze(){

    let n = parseInt(
        document.getElementById("n").value
    );

    if(isNaN(n)) return;

    let prime = isPrime(n);

    let factors = getFactors(n);

    let binary = n.toString(2);

    let hex = n.toString(16).toUpperCase();

    document.getElementById("result").innerHTML = `
        <b>Prime:</b> ${prime ? "Yes" : "No"} <br><br>

        <b>Factors:</b> ${factors.join(", ")} <br><br>

        <b>Binary:</b> ${binary} <br><br>

        <b>Hex:</b> ${hex}
    `;

    document.getElementById("explain").innerText =
        prime
        ? `${n} is prime because it has only 2 divisors.`
        : `${n} is composite because extra divisors exist.`;

    addHistory("Analyzed " + n);
}

/* =========================
   HISTORY
========================= */
function addHistory(text){

    history.push(text);

    let ul =
        document.getElementById("history");

    ul.innerHTML = "";

    history.slice(-10).forEach(item=>{

        let li =
            document.createElement("li");

        li.innerText = item;

        ul.appendChild(li);
    });
}

/* =========================
   ULAM SPIRAL
========================= */
function ulam(){

    let size =
        parseInt(document.getElementById("n").value)
        || 100;

    ctx.clearRect(0,0,600,600);

    let x = 300;
    let y = 300;

    let dx = 1;
    let dy = 0;

    let segmentLength = 1;
    let segmentPassed = 0;

    let segmentCount = 0;

    for(let n=1;n<size*size;n++){

        if(isPrime(n)){

            ctx.fillStyle = "#00ffcc";

            ctx.fillRect(x,y,3,3);
        }

        x += dx * 4;
        y += dy * 4;

        segmentPassed++;

        if(segmentPassed === segmentLength){

            segmentPassed = 0;

            let temp = dx;

            dx = -dy;
            dy = temp;

            segmentCount++;

            if(segmentCount % 2 === 0){
                segmentLength++;
            }
        }
    }

    document.getElementById("explain").innerText =
        "Ulam Spiral visualizes prime distribution.";

    addHistory("Generated Ulam Spiral");
}

/* =========================
   PRIME DISTRIBUTION
========================= */
function primeGraph(){

    let n =
        parseInt(document.getElementById("n").value)
        || 100;

    ctx.clearRect(0,0,600,600);

    let x = 10;

    for(let i=1;i<=n;i++){

        let h =
            isPrime(i)
            ? 150
            : 30;

        ctx.fillStyle =
            isPrime(i)
            ? "#00ffcc"
            : "#444";

        ctx.fillRect(
            x,
            500-h,
            8,
            h
        );

        x += 10;
    }

    document.getElementById("explain").innerText =
        "Prime graph shows where primes occur.";

    addHistory("Generated Prime Graph");
}

/* =========================
   MODULAR CIRCLE
========================= */
function modCircle(){

    let mod =
        parseInt(document.getElementById("n").value)
        || 20;

    ctx.clearRect(0,0,600,600);

    let cx = 300;
    let cy = 300;
    let r = 220;

    for(let i=0;i<mod;i++){

        let angle =
            (Math.PI*2*i)/mod;

        let x1 =
            cx + r*Math.cos(angle);

        let y1 =
            cy + r*Math.sin(angle);

        ctx.beginPath();

        ctx.arc(x1,y1,4,0,Math.PI*2);

        ctx.fillStyle="#00ffcc";

        ctx.fill();

        let j = (i*2)%mod;

        let angle2 =
            (Math.PI*2*j)/mod;

        let x2 =
            cx + r*Math.cos(angle2);

        let y2 =
            cy + r*Math.sin(angle2);

        ctx.beginPath();

        ctx.moveTo(x1,y1);

        ctx.lineTo(x2,y2);

        ctx.strokeStyle="#555";

        ctx.stroke();
    }

    document.getElementById("explain").innerText =
        "Modular circles visualize modular arithmetic.";

    addHistory("Generated Modular Circle");
}

/* =========================
   DOWNLOAD REPORT
========================= */
function download(){

    const image =
        canvas.toDataURL("image/png");

    const result =
        document.getElementById("result")
        .innerHTML;

    const explanation =
        document.getElementById("explain")
        .innerText;

    const historyText =
        history.join("<br>");

    const html = `
    <html>

    <head>

    <title>Math Report</title>

    <style>

    body{
        font-family:Arial;
        padding:20px;
    }

    img{
        max-width:600px;
        border:1px solid black;
    }

    </style>

    </head>

    <body>

    <h1>Math Engine Report</h1>

    <h2>Visualization</h2>

    <img src="${image}">

    <h2>Analysis</h2>

    <div>${result}</div>

    <h2>Explanation</h2>

    <p>${explanation}</p>

    <h2>History</h2>

    <p>${historyText}</p>

    </body>

    </html>
    `;

    const blob = new Blob(
        [html],
        {type:"text/html"}
    );

    const link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "math-report.html";

    link.click();
}