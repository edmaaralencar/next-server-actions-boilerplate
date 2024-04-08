import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Text
} from '@react-email/components'
import * as React from 'react'

interface VerifyEmailProps {
  verificationCode?: number
  email?: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export function VerifyEmail({
  verificationCode = 123132,
  email = 'edmar@gmail.com'
}: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verificação de e-mail</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Verificação de e-mail</Heading>
          <Text style={text}>Seja bem-vindo à ELearn!</Text>
          <Text style={text}>
            Para começar a utilizar a plataforma, é necessário finalizar o
            processo de registro, que envolve a confirmação através do seu
            endereço de e-mail.
          </Text>
          <Row>
            <Text style={text}>Código de confirmação:</Text>
            <Text style={{ ...text, fontWeight: 'bold', fontSize: 32 }}>
              {verificationCode}
            </Text>
          </Row>

          <Text style={text}>
            Caso você não tenha criado uma conta na ELearn, apenas ignore esse
            e-mail.
          </Text>

          <Button
            style={button}
            href={`${baseUrl}/verification-token?email=${email}&token=${verificationCode}`}
          >
            Verificar o link
          </Button>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  color: '#212121'
}

const container = {
  padding: '24px',
  margin: '24px auto',
  backgroundColor: '#1e293b',
  borderRadius: '8px'
}

const button = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  color: '#0f172a',
  padding: '12px 20px',
  backgroundColor: '#3b82f6',
  borderRadius: '8px'
}

const h1 = {
  color: '#fff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '15px'
}

const text = {
  color: '#fff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px'
}
