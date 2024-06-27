import { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { Container } from './styles'

export interface LayoutsProps {
  title: string
  description: string
  url: string
  dataSource: string
  children: ReactNode
}

export const Layouts = ({
  title,
  description,
  children,
  url,
  dataSource,
}: LayoutsProps) => {
  return (
    <Container>
      <Header title={title} description={description} />
      <main>{children}</main>
      <Footer url={url} dataSource={dataSource} />
    </Container>
  )
}
