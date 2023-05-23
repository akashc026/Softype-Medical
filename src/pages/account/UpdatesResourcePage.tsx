import { Paper, Text } from '@mantine/core';
import { OperationOutcome, Patient, Resource } from '@medplum/fhirtypes';
import { Document, ResourceForm, useMedplum } from '@medplum/react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function UpdateResourcePage(): JSX.Element {

  const navigate = useNavigate();
  const { resourceType } = useParams();
  const { id } = useParams();
  const medplum = useMedplum();
  const [error, setError] = useState<OperationOutcome | undefined>();
  const resource = medplum.readResource(resourceType as Resource["resourceType"],id!).read()

  return (
    <>
      <Paper p="xl" shadow="xs" radius={0}>
        <Text weight={500}>Edit&nbsp;{resourceType}</Text>
      </Paper>
      <Document>
        <ResourceForm
          defaultValue={resource}
          onSubmit={(formData: Resource) => {
            console.log(formData);
            setError(undefined);
            medplum
              .updateResource(formData)
              .then((result) => navigate('/'))
              .catch(setError);
          }}
          outcome={error}
        />
      </Document>
    </>
  );
}
