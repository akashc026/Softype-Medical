import { Patient, Practitioner, Schedule } from '@medplum/fhirtypes';
import { Document, ResourceAvatar, ResourceBadge, ResourceName, Scheduler, useMedplum } from '@medplum/react';
import { SchedulerPage } from '../components/SchedulerPage.jsx';
import { Box, Button, Card, Modal, ScrollArea, Stack, Table, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { createReference } from '@medplum/core';
import { InfoSection } from '../components/InfoSection.js';

export function GetCare(): JSX.Element {
  const medplum = useMedplum();
  const [opened, { open, close }] = useDisclosure(false);
  const patient = medplum.getProfile() as Patient;
  const schedule = medplum.searchOne('Schedule').read();

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
  }


  const Modaldata = doctor?.map((data) => {
    return (

      <Card shadow="xl" padding="sm" radius="xl" withBorder display='flex' style={{ marginTop: 10 }}>
        <Table>
          <tr>
            <td>
              <Text fz='xl'>
                <ResourceBadge value={data} />
              </Text>
            </td>
            <td align='right'>
              <Button onClick={() => handleClick(data)} variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }} color="blue" mt="xl" size='md' radius="md" style={{ marginBottom: '20px', marginRight: '25px' }}>
                Choose
              </Button>
            </td>
          </tr>
        </Table>

      </Card>
    )
  })


  if (patient.generalPractitioner && patient.generalPractitioner.length > 0) {
    return (

      <Document width={800}>
        <SchedulerPage
          schedule={schedule as Schedule}
          questionnaire={{
            resourceType: 'Questionnaire',
            name: 'Test',
            item: [
              {
                id: 'id-1',
                linkId: 'q1',
                type: 'string',
                text: 'Question 1',
              }
            ],
          }}
        />
      </Document>
    );
  }
  else {
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
            <Modal.Body>
              {Modaldata as any}
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>

        <Box p="sm">
          <InfoSection title="Please Choose Doctor First">
            <Box p="md">
              <Stack align="center">
                <Button onClick={open} size="lg">Choose Doctor</Button>
              </Stack>
            </Box>
          </InfoSection>
        </Box>
      </>
    );
  }
}
