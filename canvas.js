const canvas = document.getElementById("canvas2d");
const context = canvas.getContext("2d");
const calc = document.getElementById("calc");
const clear = document.getElementById("clear");
const grad01 = document.getElementById("grad01");
const grad001 = document.getElementById("grad001");
const grad0001 = document.getElementById("grad0001");
const grad00001 = document.getElementById("grad00001");
const grad000001 = document.getElementById("grad000001");

const xy = [[], []];

let mse = 2;
let currentMSE = 0;
let min = Infinity;
let gradK = 0;
let gradB = 0;
let itter = 0;
let k = 0;
let b = 0;

	// Drow XY
function drowXY() {
	// Drow X
	context.beginPath();
	context.moveTo(0, canvas.height);
	context.lineTo(canvas.width, canvas.height);
	context.strokeStyle = '#ff0000';
	context.stroke();
	
	// Drow Y
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(0, canvas.height);
	context.strokeStyle = '#ff0000';
	context.stroke();
}
  
drowXY();

function itteration(step, color) {
	const count = xy[0].length;
	gradK = 0;
	gradB = 0;
	stdY = 0;
	itter = 0;
	k = 0;
	b = 0;
	mse = Infinity;
	currentMSE = Infinity;
	min = Infinity;
	minK = Infinity;
	minB = Infinity;
	minI = undefined;


	for (let i = 0; i < count; i += 1) {
		stdY += xy[1][i];
	}

	while (Math.sqrt(mse) > (stdY / 100) && itter < 10000) {
		mse = 0;
		for (let i = 0; i < count; i += 1) {
			gradK += ((k * xy[0][i]) + b - xy[1][i]) * xy[0][i];
			gradB += ((k * xy[0][i]) + b - xy[1][i]);
		}

		k -= step / count * gradK;
		b -= step / count * gradB;
		itter += 1;
	
		for (let i = 0; i < count; i += 1) {
			mse += ((k * xy[0][i]) + b - xy[1][i]) * ((k * xy[0][i]) + b - xy[1][i]) / count;
		}
		// mse /= count;
		if (Math.sqrt((currentMSE - mse) * (currentMSE - mse)) < 0.01) {

			console.log(currentMSE, mse);
			return;
		}
		currentMSE = mse;

		if (mse < min) {
			min = mse;
			minK = k;
			minB = b;
			minI = itter;
		}

		document.getElementById('itter').innerHTML = minI;
		document.getElementById('i').innerHTML = itter;
		document.getElementById('k').innerHTML = k;
		document.getElementById('b').innerHTML = b;
		document.getElementById('s').innerHTML = mse;
		document.getElementById('min').innerHTML = min;
		document.getElementById('kmin').innerHTML = minK;
		document.getElementById('bmin').innerHTML = minB;
		document.getElementById('step').innerHTML = step;

		if (Math.sqrt((currentMSE - mse) * (currentMSE - mse)) < 0.0001 || itter == 10000) {
			context.beginPath();
			let x = 0;
			let y = (minK * x ) + minB;
			context.moveTo(x, canvas.height - y);
			x = canvas.width;
			y = (minK * x ) + minB;
			context.lineTo(x, canvas.height - y);
			context.strokeStyle = color;
			context.stroke();
		}
	}
}

// Drow blue line
function line() {
	const count = xy[0].length;
	let avgX = 0;
	let avgY = 0;
	let avgX2 = 0;
	let avgXY = 0;

	for (let i = 0; i < count; i += 1) {
		avgX += xy[0][i] / count;
		avgY += xy[1][i] / count;
		avgXY += xy[0][i] * xy[1][i] / count;
		avgX2 += xy[0][i] * xy[0][i] / count;
	}

	const k = ( (avgX * avgY) - avgXY ) / ( (avgX * avgX) - avgX2 );
	const b = avgY - ( k * avgX ); 
	document.getElementById('rk').innerHTML = k;
	document.getElementById('rb').innerHTML = b;

	context.beginPath();
	let x = 0;
	let y = (k * x ) + b;
	context.moveTo(x, canvas.height - y);
	x = canvas.width;
  y = (k * x ) + b;
	context.lineTo(x, canvas.height - y);
	context.strokeStyle = '#0000ff';
	context.stroke();
}

// Mouse coordinates
canvas.addEventListener('mousemove', function(evt){
document.getElementById('cx').innerHTML = evt.pageX - 8;
document.getElementById('cy').innerHTML = canvas.height + 7 - evt.pageY;
});

// Drow points
canvas.addEventListener('click', function(point){
const x = point.pageX - 8;
const y = point.pageY - 8;

context.fillStyle = '#000000';
context.fillRect( x, y , 3 , 3 );

xy[0].push(x);
xy[1].push(canvas.height - y - 1);
})

// Clean
function clearGrid(){
	xy[0] = [];
	xy[1] = [];
	context.clearRect(0, 0, canvas.width, canvas.height);
	drowXY();
}

clear.addEventListener('click', () => clearGrid());
calc.addEventListener('click', () => line());
grad01.addEventListener('click', () => itteration(0.01, '#FFBF00'));
grad001.addEventListener('click', () => itteration(0.001, '#FF4000'));
grad0001.addEventListener('click', () => itteration(0.0001, '#B40404'));
grad00001.addEventListener('click', () => itteration(0.00001, '#40FF00'));
grad000001.addEventListener('click', () => itteration(0.000001, '#0B610B'));
