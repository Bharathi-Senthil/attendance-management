import { Router } from "express";
import { ReportController } from "../controllers";

export class ReportRoutes {
  private router: Router;
  private controller: ReportController;

  constructor() {
    this.controller = new ReportController();
    this.router = Router();
    this.routes();
  }

  private routes() {
    //! GetDayReport
    this.router.get("/day", (req, res) =>
      this.controller.getDayReport(req, res)
    );
  }

  public getRouter() {
    return this.router;
  }
}
