// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Chat } from 'core/entities/chat';
import { verifyToken } from 'modules/jwt/jwtHelper';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiGetChatsByOwner } from 'services/api/apiChatService';

type ResponseData = Chat[];

type ResponseError = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>,
) {
  try {
    if (req.method === 'GET') {
      
      const { owner } = req.query;

      // Verify user
      const user = verifyToken(req.headers.authorization);
      if (user?.accountId !== owner) {
        res.status(403).json({ message: 'Unauthorized.' });
      }

      apiGetChatsByOwner(owner as string).then((result) => {
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
