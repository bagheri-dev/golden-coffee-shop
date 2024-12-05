import * as React from "react"
import { SVGProps } from "react"
const Curve = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={100}
    height={22}
    fill="currentColor"
    {...props}
  >
    <path fill="currentColor" d="M50 0c19 0 31 22 50 22H0C18.75 22 31 0 50 0Z" />
  </svg>
)
export default Curve
