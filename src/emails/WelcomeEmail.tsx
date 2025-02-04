import { Body, Container, Head, Html, Tailwind, Text } from '@react-email/components';

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 p-6">
          <Container className="bg-white p-6 rounded-lg shadow-md text-center">
            <Text className="text-xl font-bold text-gray-800">Bem-vindo ao my brain, {name}! 🎉</Text>
            <Text className="text-gray-600">
              Seu perfil está atualmente em análise. Assim que for aprovado, você poderá começar a criar e publicar suas postagens.
            </Text>
            <Text className="text-gray-600">Fique atento! Enviaremos um e-mail assim que seu perfil estiver pronto para uso.</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
