// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { JWT } from 'core/entities/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiSignInUser } from 'services/api/apiUserService';

type RequestData = {
  accountId: string;
  signature: string;
};

type ResponseData = JWT;

type ResponseError = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>,
) {
  try {
    if (req.method === 'POST') {
      const { accountId, signature }: RequestData = req.body;
      apiSignInUser(accountId, signature).then((result) => {
        res.status(200).json(result);
      });
    } else {
      res.status(400).json({ message: 'HTTP status not supported.' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'An error has occured on the server.' });
  }
}
