import express from "express";
import { RouteRepositoryPostgres } from "../../outbound/postgres/routeRepository.postgres";
import { getRoutes } from "../../../core/application/getRoutes";
import { setBaseline } from "../../../core/application/setBaseline";
import { getComparison } from "../../../core/application/getComparison";

const router = express.Router();
const getRoutesHandler = getRoutes(RouteRepositoryPostgres);
const setBaselineHandler = setBaseline(RouteRepositoryPostgres);
const getComparisonHandler = getComparison(RouteRepositoryPostgres);

router.get("/routes", async (req, res) => {
  try {
    const filters = {
      vesselType: req.query.vesselType as string,
      fuelType: req.query.fuelType as string,
      year: req.query.year ? Number(req.query.year) : undefined,
    };
    const data = await getRoutesHandler(filters);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/routes/:id/baseline", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await setBaselineHandler(id);
    res.json({ ok: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/routes/comparison", async (req, res) => {
  try {
    const result = await getComparisonHandler();
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
