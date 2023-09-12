import { Router } from "express";
import { ResetController } from "../controllers";
import { verifyAdmin } from "../middleware";

export class ResetRoutes {
  private router: Router;
  private controller: ResetController;

  constructor() {
    this.controller = new ResetController();
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.get("/promotion", verifyAdmin, (req, res) =>
      this.controller.promotion(req, res)
    );
  }

  public getRouter() {
    return this.router;
  }
}
