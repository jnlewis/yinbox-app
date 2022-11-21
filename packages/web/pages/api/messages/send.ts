// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MessageTypes } from 'core/enums/messageTypes';
import { verifyToken } from 'modules/jwt/jwtHelper';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiSendMessage } from 'services/api/apiMessageService';

type RequestData = {
  threadId: string;
  recipient: string;
  message: string;
  messageType: MessageTypes;
};

type ResponseData = {
  message: string;
};

type ResponseError = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>,
) {
  try {
    if (req.method === 'POST') {
      const { threadId, recipient, message, messageType }: RequestData = req.body;

      const user = verifyToken(req.headers.authorization);
      if (!user?.accountId) {
        res.status(403).json({ message: 'Unauthorized.' });
      }

      apiSendMessage(threadId, user.accountId, recipient, message, messageType).then(() => {
        res.status(200).json({ message: 'Success' });
      });
    } else {
      res.status(400).json({ message: 'HTTP status not supported.' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'An error has occured on the server.' });
  }
}
