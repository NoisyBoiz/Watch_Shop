import express from 'express';
import cors from 'cors';
import watchs from './Routes/watchs.js';
import admins from './Routes/admins.js';
import colors from './Routes/colors.js';
import sizes from './Routes/sizes.js';
import bodyParser from 'body-parser';

const app = express();
// const port = process.env.PORT;
const port = 3005;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.json());
app.use(cors());

app.use("/watchs", watchs);
app.use("/admins", admins);
app.use("/colors", colors);
app.use("/sizes", sizes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});