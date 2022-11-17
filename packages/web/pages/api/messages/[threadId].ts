// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiGetMessages } from 'services/api/apiMessageService';
import { Message } from 'core/entities/message';

type ResponseData = Message[];

type ResponseError = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>,
) {
  try {
    if (req.method === 'GET') {
      const { threadId } = req.query;
      apiGetMessages(threadId as string).then((result) => {
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
