import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/dist/client/router'
import styled from 'styled-components'
import tw from 'twin.macro'
import InputWithError from '../components/InputWithError'
import FormWithLabel from '../components/FormWithLabel'
import Logo from '../components/Logo'

interface Values {
  email: string
  password: string
}

const loginSchema = yup.object({
  email: yup.string().email('Provide correct e-mail').required('Required'),
  password: yup.string().required('Required'),
})

const initialValues: Values = {
  email: '',
  password: '',
}
export const PageWrapper = styled.div`
  ${tw`text-near-black bg-ice-blue w-full flex  flex-col items-center justify-center`}
  height: 100vh;
`

const Auth = () => {
  const router = useRouter()

  const formik = useFormik({
    validationSchema: loginSchema,
    initialValues,
    onSubmit: () => {
      router.push('/')
    },
  })

  return (
    <PageWrapper>
      <Logo />
      <FormWithLabel
        onSubmit={formik.handleSubmit}
        topText="Sign In"
        buttonText="Submit"
        redirectText="Register instead"
        onRedirect={() => router.push('/register')}>
        <InputWithError name="email" formik={formik} label="E-mail" />
        <InputWithError name="password" formik={formik} label="Password" type="password" />
      </FormWithLabel>
    </PageWrapper>
  )
}

export default Auth
