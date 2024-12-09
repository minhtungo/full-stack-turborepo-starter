import type { Request, RequestHandler, Response } from 'express';

import { ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/lib/httpHandlers';
import { StatusCodes } from 'http-status-codes';

const getUsers: RequestHandler = async (_req: Request, res: Response) => {
  const serviceResponse = ServiceResponse.success('Hello', null, StatusCodes.OK);

  return handleServiceResponse(serviceResponse, res);
};

// const getUser: RequestHandler = async (req, res) => {
//   const id = Number.parseInt(req.params.id as string, 10);
//   const serviceResponse = await userService.findById(id);
//   return handleServiceResponse(serviceResponse, res);
// };

export const userController: Record<string, RequestHandler> = {
  getUsers,
  // getUser,
};
