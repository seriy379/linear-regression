const canvas = document.getElementById("canvas2d");
const context = canvas.getContext("2d");
const calc = document.getElementById("calc");
const clear = document.getElementById("clear");

const xy = [[], []];

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
	context.strokeStyle = '#00ff00';
	context.stroke();
}
  
drowXY();

// Drow blue line
function line() {
	const count = xy[0].length;
	let avgX = 0;
	let avgY = 0;
	let avgX2 = 0;
	let dispersX = 0;
	let dispersY = 0;
	let avgXY = 0;

	for (let i = 0; i < count; i += 1) {
		avgX += xy[0][i] / count;
		avgY += xy[1][i] / count;
		avgXY += xy[0][i] * xy[1][i] / count;
		avgX2 += xy[0][i] * xy[0][i] / count;
	}

	for (let i = 0; i < count; i += 1) {
			dispersX += (xy[0][i] - avgX) * (xy[0][i] - avgX) / count;
			dispersY += (xy[1][i] - avgY) * (xy[1][i] - avgY) / count;
	}

	const a = ( (avgX * avgY) - avgXY ) / ( (avgX * avgX) - avgX2 );
	const b = avgY - ( a * avgX ); 
	const fX = `y = ${a}x + ${b}`; 
	
	context.beginPath();
	let x = 0;
	let y = (a * x ) + b;
	context.moveTo(x, canvas.height - y);
	x = canvas.width;
	y = (a * x ) + b;
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

//стираем
function clearGrid(){
	xy[0] = [];
	xy[1] = [];
	context.clearRect(0, 0, canvas.width, canvas.height);
	drowXY();
}

clear.addEventListener('click', () => clearGrid());

calc.addEventListener('click', () => line());
