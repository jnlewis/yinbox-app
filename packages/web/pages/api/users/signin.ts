// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiCreateChat } from 'services/api/apiChatService';
import { apiSignInUser } from 'services/api/apiUserService';

type RequestData = {
  accountId: string;
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
      const { accountId }: RequestData = req.body;
      apiSignInUser(accountId).then(() => {
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
