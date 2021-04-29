import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers } = req
  try {
    const response = await axios.get('http://localhost:3001/frogs', {
      headers,
    })

    res.status(200).json(response.data)
  } catch ({ response: { status, data } }) {
    res.status(status).json(data)
  }
}
