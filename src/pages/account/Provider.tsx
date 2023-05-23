import { Box, Button, Stack, Title, Text, Card, Center, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, ScrollArea } from '@mantine/core';

import { Patient, Practitioner } from '@medplum/fhirtypes';
import { ResourceAvatar, ResourceBadge, ResourceName, useMedplum } from '@medplum/react';
import { InfoSection } from '../../components/InfoSection';
import { useEffect, useState } from 'react';
import { createReference } from '@medplum/core';


export function Provider(): JSX.Element {
  const medplum = useMedplum();
  const patient = medplum.getProfile() as Patient;
  const [opened, { open, close }] = useDisclosure(false);
  // const [doctor_name,SetDoctorName]= useState(patient.generalPractitioner)
  const [doctor, setDoctor] = useState<Practitioner[]>();
  useEffect(() => {
    medplum.searchResources("Practitioner").then(data => setDoctor(data));

  }, [medplum, patient])

  function handleClick(data: Practitioner) {
    medplum.updateResource({
      ...patient, generalPractitioner: [createReference(data)]
    }).then(() => {
      close();
      window.location.reload();
    })



    // window.location.reload();
  }

  const Modaldata = doctor?.map((data) => {
    return (
      
      <Card shadow="xl" padding="sm" radius="xl" withBorder display='flex' style={{ marginTop:10 }}>
        <Table>
          <tr>
            <td>
              <Text fz='xl'>
              <ResourceBadge value={data} />
              </Text>
            </td>
            <td align='right'>
              <Button onClick={() => handleClick(data)} variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }} color="blue" mt="xl" size='md' radius="md" style={{ marginBottom: '20px',marginRight: '25px' }}>
                Choose
              </Button>
            </td>
          </tr>
        </Table>

      </Card>
    )
  })

  console.log(Modaldata);

  if (patient.generalPractitioner && patient.generalPractitioner.length > 0) {
    return (
      <>
        <Modal.Root
          opened={opened}
          onClose={close}
          title="Choose Doctor"
          size="xl"
          scrollAreaComponent={ScrollArea.Autosize}
        >
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>
              <Modal.Title><h1>Choose Doctor</h1></Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>
            <Modal.Body>{Modaldata as any}</Modal.Body>
          </Modal.Content>
        </Modal.Root>
        <Box p="xl">
          <Title mb="lg">My Provider</Title>
          <InfoSection title="My Primary Care Provider">
            <Box p="xl">
              <Stack align="center">
                <ResourceAvatar size={200} radius={100} value={patient.generalPractitioner[0]} />
                <Title order={2}>
                  <ResourceName value={patient.generalPractitioner[0]} />
                </Title>
                <Button onClick={open} size="xl">Choose a Primary Care Provider</Button>
              </Stack>
            </Box>
          </InfoSection>
        </Box>
      </>
    );
  }

  return (
    <Box p="xl">
      <Title mb="lg">Choose a provider</Title>
      <InfoSection title="My Primary Care Provider">Softype MedCare</InfoSection>
    </Box>
  );
}
