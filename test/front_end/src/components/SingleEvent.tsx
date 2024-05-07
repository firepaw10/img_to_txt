import React, { useState } from 'react';
import "./componentStyles.css";
import {Event} from "../model";
import { AiFillEdit, AiFillDelete} from "react-icons/ai";
import { MdDone} from "react-icons/md";

interface EventProps {
    event: Event;
    events: Event[];
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
};


export function SingleEvent({event, events, setEvents}: EventProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const [editEvent, setEditEvent] = useState<string>(event.title);
    
    const handleDone = (id:number) => {
        setEvents(
            events.map((event) => 
               event.id === id ? {...event, isDone: !event.isDone} : event
            )
        );
        console.log(`event ${event.id} is done.`);
    }

    const handleDelete = (id:number) => {
        setEvents(events.filter(a => a.id !== id));
    };

    const handleEdit = (e:React.FormEvent, id:number) => {
        e.preventDefault();
        setEvents(events.map((event) => (
            event.id === id ? {...event, title:editEvent} : event
        )));
        setEdit(false);
    };
    return (
        <form id={"event"+event.id} className="events__single neucha-regular" onSubmit={(e) => handleEdit(e, event.id)}>
            
            {
                edit ? (
                        <input value={editEvent} onChange={(e) => setEditEvent(e.target.value)} className="events__single--edit"/>
                ):event.isDone ? (
                    <s className="events__single--text">
                         {event.title} <br></br>
                         {event.date.toLocaleDateString()}
                    </s>
                ) : (
                    <span className="events__single--text">
                        {event.title} <br></br>
                        {event.date.toLocaleDateString()}
                    </span>
                )
            }
           
           
            <div className="icon-group">
                <span className="icon">
                    <AiFillDelete onClick={() => {handleDelete(event.id)}}/>
                </span>
                <span className="icon" onClick={() => {handleDone(event.id)}}>
                    <MdDone />
                </span>
                <span className="icon">
                    <AiFillEdit  onClick={(e) => {
                        if(!edit && !event.isDone) {
                            setEdit(!edit);
                        }
                        if(edit) {
                            handleEdit(e, event.id);
                        }
                    }}/>
                </span>
            </div>
        </form>
    )
}