import styled from 'styled-components'
import React from 'react'

export const StyledButton = styled.button`
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1);
  }
  &:focus {
    box-shadow: 0px 0px 0px 3px rgba(0, 0, 0, 0.1);
  }
`

export interface Props {
  className?: string
  onClick?: () => void
}

const Button: React.FC<Props> = ({ children, className, onClick }) => (
  <StyledButton
    onClick={onClick}
    type="submit"
    className={`bg-primary text-white rounded-xl w-max self-center py-2 px-4 focus:outline-none transition shadow-sm-light ${className}`}>
    {children}
  </StyledButton>
)

export default Button
