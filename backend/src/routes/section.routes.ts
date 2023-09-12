import { Router } from "express";
import { SectionController } from "../controllers";
import { verifyAdmin } from "../middleware";

export class SectionRoutes {
  private router: Router;
  private controller: SectionController;

  constructor() {
    this.controller = new SectionController();
    this.router = Router();
    this.routes();
  }

  private routes() {
    //! GetPaged
    this.router.get("/page", verifyAdmin, (req, res) =>
      this.controller.getPaged(req, res)
    );

    //! GetAll
    this.router.get("/", (req, res) => this.controller.getAll(req, res));

    //! GetById
    this.router.get("/:id", verifyAdmin, (req, res) =>
      this.controller.getById(req, res)
    );

    //! Post
    this.router.post("/", verifyAdmin, (req, res) =>
      this.controller.post(req, res)
    );

    //! Put
    this.router.put("/:id", verifyAdmin, (req, res) =>
      this.controller.update(req, res)
    );

    //! Delete
    this.router.delete("/:id", verifyAdmin, (req, res) =>
      this.controller.delete(req, res)
    );
  }

  public getRouter() {
    return this.router;
  }
}
