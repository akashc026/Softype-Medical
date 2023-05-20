/* eslint-disable prettier/prettier */
import { createStyles,  Stack } from '@mantine/core';
import { getReferenceString,createReference } from '@medplum/core';
import React, { useState, useEffect } from 'react';
import { getStartMonth, CalendarInput } from '@medplum/react';
import { useMedplum } from '@medplum/react';
import { QuestionnaireForm } from '@medplum/react';
import { ResourceAvatar } from '@medplum/react';
import { ResourceName } from '@medplum/react';
import { useResource } from '@medplum/react';
import { MedplumClient } from '@medplum/core';

import { Appointment, Patient, Questionnaire, QuestionnaireResponse, Reference, Schedule, Slot } from '@medplum/fhirtypes';

const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        minHeight: 400,
    },
    info: {
        minWidth: 300,
        padding: 20,
        borderRight: `1px solid ${theme.colors.gray[3]}`,
    },
    selection: {
        minWidth: 300,
        padding: 20,
    },
}));

export interface SchedulerProps {
    schedule: Schedule | Reference<Schedule>;
    questionnaire: Questionnaire | Reference<Questionnaire>;
}



function SchedulerPage(props:SchedulerProps): JSX.Element {
    const { classes } = useStyles();
    const medplum = useMedplum();
    const schedule = useResource(props.schedule);
    const questionnaire = useResource(props.questionnaire);
    const [slots, setSlots] = useState<Slot[]>();
    // const slotsRef = useRef(slots);
    const [month, setMonth] = useState(getStartMonth());
    const [date, setDate] = useState<Date>();
    const [slot, setSlot] = useState<Slot>();
    const [response, setResponse] = useState<QuestionnaireResponse>();
    const [appointment,setAppointment] = useState<Appointment>()
    const profile = medplum.getProfile() as Patient;
    useEffect(() => {
        if (schedule) {
            setSlots([]);
            medplum
                .searchResources('Slot', new URLSearchParams([
                ['_count', (30 * 24).toString()],
                ['schedule', getReferenceString(schedule)],
                ['start', 'gt' + getStart(month)],
                ['start', 'lt' + getEnd(month)],
            ]))
            .then(data=>setSlots(data))
                .catch(console.log);
        }
        else {
            setSlots(undefined);
        }
    }, [medplum, schedule, month]);
    if (!schedule || !slots || !questionnaire) {
        return <></>;
    }
    const handleClick = async(s:Slot):Promise<void>=>{
        setSlot(s)
       await medplum.updateResource({
            resourceType:"Slot",
            id:s.id,
            status:'busy',
            start:s?.start,
            end:s?.end,
            schedule:createReference(schedule)
        }).catch((e)=>{
            console.log(e)
        })
        await medplum.createResource({
            resourceType:"Appointment",
            status:"booked",
            slot:[createReference(s)] ,
            start:s.start,
            end:s.end,
            participant:[{
                actor:schedule.actor?.[0],
                status:"needs-action"
            },{
                actor:createReference(profile),
                status:"needs-action"
            }]
        }).then((d:Appointment)=>setAppointment(d))



        const client = new MedplumClient({
              headers: {
                'Access-Control-Allow-Origin': '*'
              }
          });
        

        await client.sendEmail({
            to: profile?.telecom?.[0].value,
            cc: 'akashc@softype.com',
            subject: 'Appointment created sucessfully',
            text: `Your Appointment has been booked sucessfully 
            Please find the details below
            Date                   enddate               status
             ${appointment?.start} ${appointment?.end} ${appointment?.status} `,
          }).catch(e=>console.log('e',e));
    }

    const actor = schedule.actor?.[0];
    return (React.createElement("div", { className: classes.container, "data-testid": "scheduler" },
        React.createElement("div", { className: classes.info },
            actor && React.createElement(ResourceAvatar, { value: actor, size: "xl" }),
            actor && (React.createElement('text', { size: "xl", weight: 500 },
                React.createElement(ResourceName, { value: actor }))),
            React.createElement("p", null, "1 hour"),
            date && React.createElement("p", null, date.toLocaleDateString()),
            slot && React.createElement("p", null, formatTime(new Date(slot?.start as string)))),
        React.createElement("div", { className: classes.selection },
            !date && (React.createElement("div", null,
                React.createElement("h3", null, "Select date"),
                React.createElement(CalendarInput, { slots: slots, onChangeMonth: setMonth, onClick: setDate }))),
            date && !slot && (React.createElement("div", null,
                React.createElement("h3", null, "Select time"),
                React.createElement(Stack, null, slots.map((s) => {
                    const slotStart = new Date(s.start as string);
                    return (s.status === 'free' && slotStart.getTime() > date.getTime() &&
                        slotStart.getTime() < date.getTime() + 24 * 3600 * 1000 && (React.createElement("div", { key: s.id },
                        React.createElement('button' , { variant: "outline", style: { width: 150 }, onClick: () => handleClick(s) }, formatTime(slotStart)))));
                })))),
            date && slot && !response && (React.createElement(QuestionnaireForm, { questionnaire: questionnaire, submitButtonText: 'Next', onSubmit: setResponse })),
            date && slot && response &&  (<>
            <table>
                <thead>
                      <tr>
                         <td>Doctor</td>
                        <td>Description</td>
                        <td>start</td>
                        <td>end</td>
                    </tr>
                </thead>    
                <tbody>
                    <tr>
                        <td>{appointment?.participant?.find(p=>p.actor?.type === "Practitioner")?.actor?.display}</td>
                        <td>{appointment?.description}</td>
                        <td>{appointment?.start}</td>
                        <td>{appointment?.end}</td>
                    </tr>
                </tbody>
             
              </table></>
                
                ))));
}
function getStart(month:Date) :string{
    return formatSlotInstant(month.getTime());
}
function getEnd(month:Date) :string{
    return formatSlotInstant(month.getTime() + 31 * 24 * 60 * 60 * 1000);
}
function formatSlotInstant(time:number) :string{
    return new Date(Math.max(Date.now(), time)).toISOString();
}
function formatTime(date:Date):string {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export { SchedulerPage };
//# sourceMappingURL=Scheduler.mjs.map
