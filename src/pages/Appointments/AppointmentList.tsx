import { ActionIcon, Avatar, Badge, Button, Card, Group, ScrollArea, Select, Table, Text, createStyles } from '@mantine/core';
import { createReference, formatDateTime } from '@medplum/core';
import { Appointment } from '@medplum/fhirtypes';
import { Document, ResourceBadge, useMedplum } from '@medplum/react';
import { IconCheck, IconPlaystationX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/Loading';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },
}));


export function AppointmentList(): JSX.Element {
  const medplum = useMedplum();
  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const profile = medplum.getProfile();
  const [appointments, setAppointments] = useState<Appointment[]>()
  console.log('profile', profile);



  useEffect(() => {

    const appointmentArr = medplum.searchResources('Appointment', `patient=Patient/${profile?.id}`).then(
      (data) => {
        setAppointments(data)
      }
    ).catch((err) => console.error(err));;
    console.log('appointments', appointmentArr)
  }, [profile])

  const handleClick = async (appointment: Appointment, action: string) => {
    await medplum.patchResource(
      'Appointment',
      appointment.id as string,
      [
        { op: 'replace', path: '/participant/0/status', value: action },
        { op: 'replace', path: '/status', value: action === "accepted" ? "booked" : "cancelled" },
      ]
      // participant:[
      //   {
      //     actor:{
      //       reference:`Practitioner/${profile?.id}`
      //       display:profile?.name[0]
      //     },
      //     status:action as any
      //   },
      //   {
      //       appointment.participant
      //   }
      // ],
      // status:action === "accepted" ? "booked" : "cancelled"
    ).then(data => {
      setAppointments(prev => {
        let index = prev?.findIndex((ap) => ap.id === data.id)
        prev![index!] = data;

        return [...prev!]
      })
    }).catch(e => {
      console.log(e)
      return false
    })
  }
  if (!appointments) {
    return <Loading />;
  }
  // return (
  //   <Document>
  //     <h1>Appointments</h1>
  //     <table className="foo-table">
  //       <thead>
  //         <tr>
  //           <th>Name</th>
  //           <th>Start time</th>
  //           <th>End time</th>
  //           <th>last update</th>
  //           <th>Status</th>
  //           <th></th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {appointments.map((appointment) => (
  //           <tr key={appointment.id}>

  //             <td>{appointment.participant?.find((op) => op.actor?.reference?.includes("Patient"))?.actor?.display}</td>
  //             <td>{appointment.start}</td>

  //             <td>{appointment.end}</td>
  //             <td>{formatDateTime(appointment.meta?.lastUpdated)}</td>
  //             <td>{appointment.status}</td>
  //             <td>
  //               <Group spacing={3} position="right">
  //                 <ActionIcon onClick={() => { handleClick(appointment, "accepted") }} color="green">
  //                   <IconCheck size="2rem" stroke={3} />
  //                 </ActionIcon>
  //                 <ActionIcon onClick={() => handleClick(appointment, "cancelled")} color="red">
  //                   <IconPlaystationX size="2rem" stroke={1.5} />
  //                 </ActionIcon>
  //               </Group>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //     <div style={{ marginTop: 50 }}>
  //       <Button>New</Button>
  //       <Button>Import</Button>
  //     </div>
  //   </Document>
  // );

  return (
    <>
      <h1>Appointment Status</h1>
      <ScrollArea>
      {appointments.map((item) => (
        <Card withBorder radius="md" className={classes.card}>
        <Table miw={800} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Start</th>
              <th>End</th>
              <th>Last Updated</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            
              <tr key={item.id}>
                <td>
                  <Group spacing="sm">

                    <div>
                      <Text fz="sm" fw={500}>
                        <ResourceBadge value={item.participant?.find((op) => op.actor?.reference?.includes("Practitioner"))?.actor} />
                      </Text>
                    </div>
                  </Group>
                </td>

                <td>
                  <Text fz="sm" fw={500}>
                    {formatDateTime(item.start)}
                  </Text>
                </td>
                <td><Text fz="sm" fw={500}>
                  {formatDateTime(item.end)}
                </Text></td>
                <td>
                  <Text fz="sm" fw={500}>
                    {formatDateTime(item.meta?.lastUpdated)}
                  </Text></td>
                <td>
                  {item.status == "booked" ? (
                    <Badge fullWidth>Booked</Badge>
                  ) : (
                    <Badge color="red" fullWidth>
                      {item.status}
                    </Badge>
                  )}
                </td>
                {/* <td>
                  <Group spacing={3} position="right">
                    <ActionIcon onClick={() => { handleClick(item, "accepted") }} color="green">
                      <IconCheck size="2rem" stroke={3} />
                    </ActionIcon>
                    <ActionIcon onClick={() => handleClick(item, "cancelled")} color="red">
                      <IconPlaystationX size="2rem" stroke={1.5} />
                    </ActionIcon>
                  </Group>
                </td> */}
              </tr>
           
          </tbody>
        </Table>
        
      </Card>
         ))}
      </ScrollArea>
      
    </>
  );
}




