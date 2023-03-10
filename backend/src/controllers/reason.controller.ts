import { Request, Response } from "express";
import { ReasonService } from "../services";
import { Reason } from "../models";
import { getPagingData } from "../helpers";

export class ReasonController {
  private reasonService: ReasonService;

  constructor() {
    this.reasonService = new ReasonService(Reason);
  }

  getById(req: Request, res: Response) {
    let { date } = req.query;
    let { mentorId } = req.params;
    this.reasonService
      .find({
        where: {
          mentorId,
          date: new Date(String(date)),
        },
      })
      .then((reason) => {
        console.log({
          mentorId,
          date: new Date(String(date)),
        });
        res.status(200).json(reason);
      });
  }

  post(req: Request, res: Response) {
    let { reason, date, mentorId } = req.body;
    let newReason = new Reason({ reason, date, mentorId });
    this.reasonService
      .create(newReason)
      .then((reason) => res.status(201).json(reason))
      .catch((err) => res.status(400).json(err));
  }

  update(req: Request, res: Response) {
    let { id, reason, date, mentorId } = req.body;

    this.reasonService.get(req.params.id).then((section) => {
      if (section) {
        let updatedReason = new Reason({
          ...section.dataValues,
          id,
          reason,
          date,
          mentorId,
        });

        this.reasonService
          .update(id, updatedReason)
          .then(() => res.status(200).json(updatedReason))
          .catch((err) => res.status(400).json(err));
      } else
        res
          .status(404)
          .json({ message: `Reason id:${req.params.id} does not exists` });
    });
  }
}
