import { UserError } from "graphql-errors";
import { ADMIN } from "../../constants";
import Portfolio from "../../models/portfolio";

export function portfoliosByStudent(_, args, req) {
  if (
    args.studentUsername &&
    req.auth.type !== ADMIN &&
    args.studentUsername !== req.auth.username
  ) {
    throw new UserError("Permission Denied");
  }
  const studentUsername = args.studentUsername
    ? args.studentUsername
    : req.auth.username;

  return Portfolio.findAll({
    where: {
      studentUsername
    }
  });
}

export function portfolioByPeriod(_, args, req) {
  // Students can only look at their own portfolios
  // TODO: uncomment the student stuff for when students are
  // requesting their porfolios
  if (args.studentUsername && req.auth.type !== ADMIN) {
    throw new UserError("Permission Denied");
  }
  const periodId = args.periodId;

  const studentUsername = args.studentUsername
    ? args.studentUsername
    : req.auth.username;

  return Portfolio.find({
    where: {
      studentUsername,
      portfolioPeriodId: periodId
    }
  });
}
