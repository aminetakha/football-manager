import {
  BackgroundImage,
  Box,
  Card,
  Container,
  Flex,
  Image,
} from "@mantine/core";
import LogInForm from "./components/Login";
import { LoginValues } from "../../types";
import logo from "../../assets/football-manager.png";
import backgroundImage from "../../assets/football-manager-bg.png";
import useLogin from "./hooks/useLogin";

const Login = () => {
  const login = useLogin();

  const onSubmitHandler = (values: LoginValues) => {
    login.mutate(values);
  };

  return (
    <Box>
      <BackgroundImage src={backgroundImage}>
        <Container size="sm" h="100vh">
          <Flex h="100%" align="center">
            <Card
              shadow="sm"
              radius="md"
              pos="relative"
              flex={1}
              style={{ backgroundColor: "transparent" }}
            >
              <Box pos="relative" style={{ zIndex: 10 }}>
                <Card.Section my="lg">
                  <Flex justify="center">
                    <Image
                      radius={100}
                      w={200}
                      src={logo}
                      alt="Football Manager game logo with bold text and a football graphic"
                    />
                  </Flex>
                </Card.Section>
                <LogInForm onSubmit={onSubmitHandler} />
              </Box>
              <Box
                pos="absolute"
                top={0}
                bottom={0}
                right={0}
                left={0}
                bg="dark"
                opacity={0.4}
                style={{ zIndex: 0 }}
              ></Box>
            </Card>
          </Flex>
        </Container>
      </BackgroundImage>
    </Box>
  );
};

export default Login;
