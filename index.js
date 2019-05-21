const button = document.getElementById("button");
const inputX = document.getElementById("x");
const inputY = document.getElementById("y");

const line = (x, y)=> {
    const count = x.length;
    let avgX = 0;
    let avgY = 0;
    let avgX2 = 0;
    let dispersX = 0;
    let dispersY = 0;
    let avgXY = 0;

    for (let i = 0; i < count; i += 1) {
        avgX += x[i] / count;
        avgY += y[i] / count;
        avgXY += x[i] * y[i] / count;
        avgX2 += x[i] * x[i] / count;
    }

    for (let i = 0; i < count; i += 1) {
        dispersX += (x[i] - avgX) * (x[i] - avgX) / count;
        dispersY += (y[i] - avgY) * (y[i] - avgY) / count;
    }

    const a = ( (avgX * avgY) - avgXY ) / ( (avgX * avgX) - avgX2 );
    const b = avgY - ( a * avgX ); 
    const fX = `y = ${a}x + ${b}`; 
    console.log(fX);

    return fX;
};

const points = (x, y) => {
    const count = x.length;
    const points = [];

    for (let i = 0; i < count; i += 1) {
        points[i] = ` ${x[i]}:${y[i]}`;
    }

    return points;
};

function show() {
    const x = inputX.value.split(',');
    const y = inputY.value.split(',');

    if (x == "" || y == "") {
        alert('X,Y not inputed!');
        return;
    }

    if (x.length !== y.length) {
        alert('count of X not equal count of Y');
        return;
    }

    alert(`For points ${points(x, y)} calculated linear regression ${line(x, y)}`);
};

button.addEventListener('click', () => show());
