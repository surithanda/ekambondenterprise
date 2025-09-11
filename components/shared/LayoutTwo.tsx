import { Fragment, ReactNode } from 'react'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'

const LayoutTwo = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <Fragment>
      <Navbar />
      <main className="relative z-10 bg-backgroundBody dark:bg-secondary">{children}</main>
      <Footer />
    </Fragment>
  )
}

export default LayoutTwo
