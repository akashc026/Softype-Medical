import { createStyles, Text, Stack, Button } from '@mantine/core';
import { getReferenceString } from '@medplum/core';
import React, { useState, useRef, useEffect } from 'react';
import { getStartMonth, CalendarInput } from '@medplum/react';
import { useMedplum } from '@medplum/react';
import { QuestionnaireForm } from '@medplum/react';
import { ResourceAvatar } from '@medplum/react';
import { ResourceName } from '@medplum/react';
import { useResource } from '@medplum/react';

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

import { Questionnaire, Reference, Schedule, Slot } from '@medplum/fhirtypes';
export interface SchedulerProps {
    schedule: Schedule | Reference<Schedule>;
    questionnaire: Questionnaire | Reference<Questionnaire>;
}



function SchedulerPage(props:SchedulerProps) {
    const { classes } = useStyles();
    const medplum = useMedplum();
    const schedule = useResource(props.schedule);
    const questionnaire = useResource(props.questionnaire);
    const [slots, setSlots] = useState();
    const slotsRef = useRef();
    slotsRef.current = slots;
    const [month, setMonth] = useState(getStartMonth());
    const [date, setDate] = useState<Date>();
    const [slot, setSlot] = useState<Slot>();
    const [response, setResponse] = useState();
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
                .then(setSlots)
                .catch(console.log);
        }
        else {
            setSlots(undefined);
        }
    }, [medplum, schedule, month]);
    if (!schedule || !slots || !questionnaire) {
        return null;
    }
    const actor = schedule.actor?.[0];
    return (React.createElement("div", { className: classes.container, "data-testid": "scheduler" },
        React.createElement("div", { className: classes.info },
            actor && React.createElement(ResourceAvatar, { value: actor, size: "xl" }),
            actor && (React.createElement("text", { size: "xl", weight: 500 },
                React.createElement(ResourceName, { value: actor }))),
            React.createElement("p", null, "1 hour"),
            date && React.createElement("p", null, date.toLocaleDateString()),
            slot && React.createElement("p", null, formatTime(new Date(slot.start)))),
        React.createElement("div", { className: classes.selection },
            !date && (React.createElement("div", null,
                React.createElement("h3", null, "Select date"),
                React.createElement(CalendarInput, { slots: slots, onChangeMonth: setMonth, onClick: setDate }))),
            date && !slot && (React.createElement("div", null,
                React.createElement("h3", null, "Select time"),
                React.createElement(Stack, null, slots.map((s) => {
                    const slotStart = new Date(s.start);
                    return (slotStart.getTime() > date.getTime() &&
                        slotStart.getTime() < date.getTime() + 24 * 3600 * 1000 && (React.createElement("div", { key: s.id },
                        React.createElement(Button, { variant: "outline", style: { width: 150 }, onClick: () => setSlot(s) }, formatTime(slotStart)))));
                })))),
            date && slot && !response && (React.createElement(QuestionnaireForm, { questionnaire: questionnaire, submitButtonText: 'Next', onSubmit: setResponse })),
            date && slot && response && (React.createElement("div", null,
                React.createElement("h3", null, "You are done!"),
                React.createElement("p", null, "Check your email for a calendar invite."))))));
}
function getStart(month) {
    return formatSlotInstant(month.getTime());
}
function getEnd(month) {
    return formatSlotInstant(month.getTime() + 31 * 24 * 60 * 60 * 1000);
}
function formatSlotInstant(time) {
    return new Date(Math.max(Date.now(), time)).toISOString();
}
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export { SchedulerPage };
//# sourceMappingURL=Scheduler.mjs.map
