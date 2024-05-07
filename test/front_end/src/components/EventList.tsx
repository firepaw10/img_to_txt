import React from 'react';
import {Event} from "../model";
// sub-components
import {SingleEvent} from './SingleEvent';


interface Props {
    events:Event[];
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}
interface dictionary {
    [key:string]:unknown;
}

class myObject {
    children: [];
    relationships: dictionary;
    constructor () {
        this.children = [];
        this.relationships = {"father":"", "mother":""};
    }

    setFatherRelationship(father: string) {
        this.relationships.father = father;
    }

}

 const EventList = ({events, setEvents}: Props) => {
    const test = new myObject();
    test.setFatherRelationship('Thomas');
    console.log(test);
    const curDate = Date.now();
    return (
        <div className="events">
            {events.map(ev => (
                <SingleEvent key={ev.id} event={ev} events={events} setEvents={setEvents}/>
            ))}
        </div>
    );
};

export default EventList;