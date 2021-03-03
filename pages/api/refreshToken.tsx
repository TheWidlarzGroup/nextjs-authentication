import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers } = req
  try {
    const { data, headers: returnedHeaders } = await axios.post(
      'http://localhost:3001/auth/refresh-token', // refresh token Node.js server path
      undefined,
      {
        headers,
      }
    )
    //  Update headers on requester using headers from Node.js server response
    Object.entries(returnedHeaders).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1] as string)
    )
    res.status(200).json(data) // Send response to client
  } catch (error) {
    throw new Error(error)
  }
}
