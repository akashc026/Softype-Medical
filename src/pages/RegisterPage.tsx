/* eslint-disable prettier/prettier */
import { BackgroundImage, Box, SimpleGrid } from '@mantine/core';
import { RegisterForm, useMedplum } from '@medplum/react';
import { useNavigate } from 'react-router-dom';
import {  MEDPLUM_PROJECT_ID, MEDPLUM_RECAPTCHA_SITE_KEY } from '../config';

export function RegisterPage(): JSX.Element {
  const navigate = useNavigate();

  const medplum = useMedplum();
  medplum.updateResource({
    resourceType: "Project",
    id: "d08db73d-28cd-4590-ace8-06c924a97793",
    defaultPatientAccessPolicy: {
      reference: 'AccessPolicy/926019f0-6f05-492d-aa4a-791dd674b9a1',
    },
  });
  return (
    <SimpleGrid cols={2}>
      <Box pt={100} pb={200}>
        <RegisterForm
          type="patient"
          projectId={MEDPLUM_PROJECT_ID}
          recaptchaSiteKey={MEDPLUM_RECAPTCHA_SITE_KEY}
          onSuccess={() => navigate('/')}
        >
          <h2>Register with Softype MedCare</h2>
        </RegisterForm>
      </Box>
      <BackgroundImage src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1567&amp;q=80" />
    </SimpleGrid>
  );
}
