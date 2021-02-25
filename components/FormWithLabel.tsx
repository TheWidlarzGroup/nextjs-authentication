import React from 'react'
import styled from 'styled-components'
import Button from './Button'

export interface Props {
  onSubmit: () => void
  onRedirect: () => void
  topText: string
  redirectText: string
  buttonText: string
}

export const StyledButton = styled.button`
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    border: 1px solid #236645;
  }
`

const FormWithLabel: React.FC<Props> = ({
  children,
  onSubmit,
  topText,
  buttonText,
  onRedirect,
  redirectText,
}) => (
  <form
    onSubmit={onSubmit}
    className="bg-white flex flex-col p-4 w-1/4 rounded-xl flex flex-col shadow-sm-light">
    <p className="self-center text-xl font-bold mb-2">{topText}</p>
    {children}
    <Button>{buttonText}</Button>
    <div className="text-primary underline cursor-pointer self-center mt-2" onClick={onRedirect}>
      {redirectText}
    </div>
  </form>
)

export default FormWithLabel
