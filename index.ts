import express, { Request, Response } from 'express';
import morgan from 'morgan';

export const app = express();
const createData = new Date().toString();
const port = process.env.PORT;

const line = (x: number[], y: number[]): string => {
  const count: number = x.length;
  let avgX: number = 0;
  let avgY: number = 0;
  let avgX2: number = 0;
  let dispersX: number = 0;
  let dispersY: number = 0;
  let avgXY: number = 0;

  for (let i = 0; i < count; i += 1) {
    avgX += x[i] / count;
    avgY += y[i] / count;
    avgXY += x[i] * y[i] / count;
    avgX2 += x[i] * x[i] / count;
  }
  console.log(`count = ${count}`);
  console.log(`avgX = ${avgX}`);
  console.log(`avgY = ${avgY}`);
  console.log(`avgXY = ${avgXY}`);
  console.log(`avgX2 = ${avgX2}`);


  for (let i = 0; i < count; i += 1) {
    dispersX += (x[i] - avgX) * (x[i] - avgX) / count;
    dispersY += (y[i] - avgY) * (y[i] - avgY) / count;
  }
  console.log(`dispersX = ${dispersX}`);
  console.log(`dispersY = ${dispersY}`);

  const a: number = ( (avgX * avgY) - avgXY ) / ( (avgX * avgX) - avgX2 );
  const b: number = avgY - ( a * avgX ); 
  const fX: string = `y = ${a}x + ${b}`; 
  console.log(fX);
  return fX;
};

const points = (x: number[], y: number[]) => {
  const count: number = x.length;
  const points = [];
  for (let i = 0; i < count; i += 1) {
    points[i] = ` ${x[i]}:${y[i]}`;
  }
  return points;
};

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.status(201).send({
    aliveAt: createData,
    timestamp: new Date().toString(),
    instance: process.env.HOSTNAME,
  });
});

app.get('/y', (req: Request, res: Response) => {
    const x: number[] = req.query.x.split(',');
    const y: number[] = req.query.y.split(',');
    if (!x || !y) {
      res.status(401).send('X,Y not inputed!');
    }
    if (x.length !== y.length) {
      res.status(401).send('count of X not equal count of Y');
    }
    res.send(`For points ${points(x, y)} calculated linear regression ${line(x, y)}`);
  });

app.listen(port, () => console.log(`Instance succesfully runned on ${port} port`));