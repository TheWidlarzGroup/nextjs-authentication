import React from 'react'
import Image from 'next/image'

const Logo = () => (
  <div className="flex flex-col mb-10">
    <Image src="/frog1.png" alt="me" width="64" height="64" />
    <p className="text-lg">Frog Auth</p>
  </div>
)

export default Logo
