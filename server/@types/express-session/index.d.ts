import { User } from "../../models/User";
declare module "express-session" {
  interface Session {
    user?: User;
  }
  export interface SessionData {
    user: { [key: string]: any };
  }
}
