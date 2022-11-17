// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from 'core/entities/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiGetChatsByOwner } from 'services/api/apiChatService';
import { apiGetUser } from 'services/api/apiUserService';

type ResponseData = User;

type ResponseError = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>,
) {
  try {
    if (req.method === 'GET') {
      const { account } = req.query;
      apiGetUser(account as string).then((result) => {
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
