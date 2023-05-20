import { BackgroundImage, Box, Container, SimpleGrid } from '@mantine/core';
import { SignInForm } from '@medplum/react';
import { useNavigate } from 'react-router-dom';
import { MEDPLUM_GOOGLE_CLIENT_ID, MEDPLUM_PROJECT_ID } from '../config';

export function SignInPage(): JSX.Element {
  const navigate = useNavigate();
  return (

    <SimpleGrid cols={1}>
      <BackgroundImage style={{minHeight:'100%'}} src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1567&amp;q=80">
      <Box pt={100} pb={200}>

        <Container mih={450}>
        <SignInForm
          projectId={MEDPLUM_PROJECT_ID}
          googleClientId={MEDPLUM_GOOGLE_CLIENT_ID}
          onSuccess={() => navigate('/')}
        >
          <h2>Sign in to Softype MedCare</h2>
        </SignInForm>
        </Container>
        
      </Box>
      </BackgroundImage>
   
    </SimpleGrid>
  );
}
