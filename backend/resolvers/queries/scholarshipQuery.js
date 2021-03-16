import { UserError } from "graphql-errors";
import { ADMIN, JUDGE } from "../../constants";
import Scholarship from "../../models/scholarship";
import PortfolioPeriod from "../../models/portfolioPeriod"


export function scholarship(_, args, req) {
  return Scholarship.findById(args.id);
}

export function scholarships(_, args, req) {
  if (
    req.auth.type !== ADMIN
  ) {
    throw new UserError("Permission Denied");
  }

  // Apply ordering, if desired
  const order = args.orderBy
    ? { order: [[args.orderBy.sort, args.orderBy.direction]] }
    : {};

  return Scholarship.findAll(order)
}

