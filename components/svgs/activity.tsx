import * as React from "react"
import { SVGProps } from "react"
const Activity = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="currentColor"
    {...props}
  >
    <path
      fill="currentColor"
      d="M30.9 7.56c-.08.5-.12 1-.12 1.5 0 4.5 3.64 8.139 8.12 8.139.5 0 .98-.058 1.48-.138v16.138c0 6.782-4 10.802-10.8 10.802H14.801C8 44 4 39.98 4 33.199V18.4C4 11.6 8 7.56 14.802 7.56H30.9Zm.402 12.16c-.543-.06-1.08.18-1.402.62l-4.838 6.26-5.543-4.36a1.58 1.58 0 0 0-1.14-.32 1.55 1.55 0 0 0-1 .599l-5.918 7.702-.122.18c-.34.638-.18 1.458.42 1.9.28.18.58.3.92.3.463.02.9-.222 1.18-.6l5.02-6.462 5.7 4.282.18.118c.64.34 1.44.182 1.9-.42l5.78-7.458-.08.04c.32-.44.38-1 .16-1.5-.218-.5-.7-.84-1.217-.88ZM39.18 4C41.84 4 44 6.16 44 8.82s-2.16 4.82-4.82 4.82-4.82-2.16-4.82-4.82S36.52 4 39.18 4Z"
    />
  </svg>
)
export default Activity
