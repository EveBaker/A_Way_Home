// src/components/Auth/Login.tsx
'use/client';

import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "../../app/MTailwind";


const Login: React.FC = () => {
  return (
    <Card className="w-96 bg-mid-gray text-dark-text border-2 hover:border-bright-teal">
      <CardHeader
        variant=""
        color="blue-gray"
        className="mb-4 grid h-28 place-items-center bg-light-gray border-4 border-primary-green"
      >
        <Typography variant="h3" color="blue-gray">
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Email" size="lg" className='hover:bg-light-gray-2' />
        <Input label="Password" size="lg" className='hover:bg-light-gray-2' />
        <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="text" className='text-white bg-primary-green border-2 border-primary-blue hover:border-2 hover:border-primary-blue hover:bg-bright-teal hover:text-primary-blue' fullWidth>
          Sign In
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Sign up
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  )
}

export default Login;
