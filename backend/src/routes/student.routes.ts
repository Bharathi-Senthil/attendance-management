import { Router } from "express";
import { StudentController } from "../controllers";
import { verifyAdmin } from "../middleware";

export class StudentRoutes {
  private router: Router;
  private controller: StudentController;

  constructor() {
    this.controller = new StudentController();
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

    this.router.get("/hour-present", (req, res) =>
      this.controller.getHourlyPresent(req, res)
    );

    this.router.get("/day-present", (req, res) =>
      this.controller.getDayPresent(req, res)
    );

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
