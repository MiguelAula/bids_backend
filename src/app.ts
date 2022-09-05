import express, { Response } from "express";
import bodyParser from "body-parser";
import { Server } from 'http';
import { Express } from 'express-serve-static-core'
import { IAppResources } from "./resources";

export class App {
  private app: Express;
  private server: Server;
  private processValue<T>(value: T | Error, res: Response, callback: (value: T) => void) {
    if (value instanceof Error) {
      res.status(400);
      res.send(value);
    } else {
      callback(value);
    }
  }

  constructor(resources: IAppResources) {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/:userID/login", (req, res) => {
      const sessionKeyOrError = resources.userController.login(parseInt(req.params.userID));
      this.processValue(sessionKeyOrError, res, (sessionKey) => {
        res.send({ sessionKey: sessionKey });
      });
    });

    app.post("/:itemID/bid", (req, res) => {
      const userIDOrError = resources.userController.getUserIDFromSession(req.query.sessionKey.toString());
      this.processValue(userIDOrError, res, (userID) => {
        const maybeError = resources.bidController.bid(parseInt(req.params.itemID), userID, req.body.bid);
        this.processValue(maybeError, res, () => {
          res.send()
        });
      });
    });

    app.get("/:itemID/topBidList", (req, res) => {
      const topBidList = resources.bidController.topBidList(parseInt(req.params.itemID));
      res.send(topBidList);
    });

    this.app = app;
  }

  getExpressApp(): Express {
    return this.app;
  }

  serve(port: number, callback?: () => void) {
    const app = this.app;

    const defaultCallback = () => console.log(`Application is running on port ${port}.`);
    this.server = app.listen(port, callback || defaultCallback);

    return this.server;
  }

  close(callback?: () => void) {
    const defaultCallback = () => console.log("server closed");
    return this.server.close(callback || defaultCallback);
  }
}