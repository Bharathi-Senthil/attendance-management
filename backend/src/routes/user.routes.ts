import { Router } from "express";
import { UserController } from "../controllers";

export class UserRoutes {
  private router: Router;
  private controller: UserController;

  constructor() {
    this.controller = new UserController();
    this.router = Router();
    this.routes();
  }

  private routes() {
    //! GetPaged
    this.router.get("/page", (req, res) => this.controller.getPaged(req, res));

    //! GetAll
    this.router.get("/", (req, res) => this.controller.getAll(req, res));

    //! GetById
    this.router.get("/:id", (req, res) => this.controller.getById(req, res));

    //! Register
    this.router.post("/register", (req, res) => this.controller.post(req, res));

    //! Login
    this.router.post("/login", (req, res) => this.controller.login(req, res));

    //! Put
    this.router.put("/:id", (req, res) => this.controller.update(req, res));

    //! Delete
    this.router.delete("/:id", (req, res) => this.controller.delete(req, res));
  }

  public getRouter() {
    return this.router;
  }
}
