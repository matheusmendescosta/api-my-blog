import { Body, Container, Head, Html, Link, Tailwind, Text } from '@react-email/components';

interface SendPostEmail {
  postId: string;
  postTitle: string;
}

export const SendPostEmail = ({ postId, postTitle }: SendPostEmail) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 p-6">
          <Container className="bg-white p-6 rounded-lg shadow-md text-center">
            <Text className="text-xl font-bold text-gray-800">Um artigo do meu cérebro 🧠</Text>
            <Text className="text-gray-600">Aqui está o link do artigo {postTitle} que você salvou. Aproveite a leitura!</Text>
            <Text className="text-gray-600">Acesse no link abaixo 👇</Text>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition">
              <Link className="text-white" href={`https://matheusmendes.fun/brain/post/${postId}`}>
                <span className="text-white">Acesse agora</span>
              </Link>
            </button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
