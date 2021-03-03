import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers } = req
  try {
    const { data } = await axios.get('http://localhost:3001/me', {
      headers,
    })
    res.send(data)
  } catch ({ response: { status, data } }) {
    res.status(status).json(data)
  }
}
