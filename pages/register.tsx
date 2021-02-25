import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/dist/client/router'
import { PageWrapper } from './login'
import Logo from '../components/Logo'
import FormWithLabel from '../components/FormWithLabel'
import InputWithError from '../components/InputWithError'

interface Values {
  email: string
  password: string
  name: string
}

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  name: yup.string().required(),
})

const initialValues: Values = {
  email: '',
  password: '',
  name: '',
}

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
        topText="Sign Up"
        buttonText="Submit"
        redirectText="Login instead"
        onRedirect={() => router.push('/login')}>
        <InputWithError name="email" formik={formik} label="E-mail" />
        <InputWithError name="name" formik={formik} label="Name" />
        <InputWithError name="password" formik={formik} label="Password" type="password" />
      </FormWithLabel>
    </PageWrapper>
  )
}

export default Auth
