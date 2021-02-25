import { FormikHandlers, FormikProps, FormikValues } from 'formik'
import React from 'react'
import styled from 'styled-components'

export interface Props {
  formik: FormikProps<FormikValues>
  name: string
  onChange?: FormikHandlers['handleChange']
  label?: string
  type?: string
}

export const StyledInput = styled.input.attrs({
  className: `transition-colors shadow-xl-light duration-500 border-solid border-transparent w-full bg-ice-blue text-14 mb-1 font-medium rounded-xl px-5 h-12 mb-0 text-slate-gray focus:outline-none focus:border-primary placeholder-light-gray-blue
      `,
})`
  border-width: 1px;
`

const InputWithError: React.FC<Props> = ({
  label,
  formik: { values, errors, touched, handleChange },
  name,
  onChange = handleChange,
  ...rest
}) => (
  <div className="flex flex-col mb-2 text-light-black text-12 font-medium tracking-1px ">
    <label className="ml-1 uppercase" htmlFor={name}>
      {label}
    </label>
    <StyledInput type="text" value={values[name]} onChange={onChange} name={name} {...rest} />
    <p className="text-red-600 ml-1 h-4">{touched[name] && errors[name]}</p>
  </div>
)

export default InputWithError
