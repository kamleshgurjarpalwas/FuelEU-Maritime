import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routesRouter from '../../adapters/inbound/http/routesRouter';
import complianceRouter from '../../adapters/inbound/http/complianceRouter';
import bankingRouter from '../../adapters/inbound/http/bankingRouter';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});


app.use('/api', routesRouter);
app.use('/api', complianceRouter);
app.use('/api', bankingRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
