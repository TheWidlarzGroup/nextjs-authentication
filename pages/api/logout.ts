import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers } = req

  try {
    const { data, headers: returnedHeaders } = await axios.delete(
      'http://localhost:3001/auth/logout',
      {
        headers,
      }
    )
    //  Update headers on requester using headers from Node.js server response
    Object.entries(returnedHeaders).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1] as string)
    )

    res.send(data)
  } catch ({ response: { status, data } }) {
    res.status(status).json(data)
  }
}
