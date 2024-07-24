import React from 'react'
import { Typography } from "../../app/MTailwind";

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-8 bg-primary-green text-white border-none rounded z-10">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  text-center md:justify-between">
        <img src="/assets/logo-mt.png" alt="logo-ct" width={140} height={60}  className="" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-bright-teal 
              hover:font-bold focus:text-primary-blue focus:font-bold "
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-bright-teal 
              hover:font-bold focus:text-primary-blue focus:font-bold "
            >
              License
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-bright-teal 
              hover:font-bold focus:text-primary-blue focus:font-bold "
            >
              Contribute
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-bright-teal 
              hover:font-bold focus:text-primary-blue focus:font-bold "
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-bold text-dark-text">
        &copy; 2024 A Way Home
      </Typography>
    </footer>
  )
}

export default Footer
