import { Router } from "express";
import { ReasonController } from "../controllers";

export class ReasonRoutes {
  private router: Router;
  private controller: ReasonController;

  constructor() {
    this.controller = new ReasonController();
    this.router = Router();
    this.routes();
  }

  private routes() {
    //! GetById
    this.router.get("/:mentorId", (req, res) =>
      this.controller.getById(req, res)
    );

    //! Post
    this.router.post("/", (req, res) => this.controller.post(req, res));

    //! Put
    this.router.put("/:id", (req, res) => this.controller.update(req, res));
  }

  public getRouter() {
    return this.router;
  }
}
