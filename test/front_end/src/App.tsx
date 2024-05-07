import React, { useMemo, useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {MyModal} from './components/Modal';
import InputField from './components/InputField';
import {Event} from './model';
import EventList  from './components/EventList';
import {ImageLoader}  from './components/ImageLoader';



 
interface pythonOutput {
  data: string;
}
function App() {
  const [event, setEvent] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);
  const [text, setText] = useState<pythonOutput>({'data':''});

  //const worker: Worker = useMemo(() => new Worker(new URL("./worker.ts", import.meta.url)), []);
  // this worker is allowing for multi-threaded execution to prevent cpu-intensive operations
  // from blocking the primary execution thread.

  // useEffect(() => {
  //   worker.onmessage = (ev) => {
  //       alert(ev.data);
  //   }
  // }, [worker]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (event) {
      setEvents([...events, {id:Date.now(), title: event, isDone:false, date:new Date()}]);
      setEvent("");
    };
 
  }
  console.log(events);
  // const apiCall = () => {
  //   const filePath = "C:\\Users\\E08802\\PycharmProjects\\ImageTextParser\\.venv\\PROGRAM.py";
  //   const response = fetch("/api/createWorker?filePath="+filePath).then((resp) => {
  //     console.log(resp);
  //     resp.json().then((data) => {
  //         console.log(data);
  //         setText(data);
  //     });
  //   });
  // }

  return (
    <div className="App">
      <header className="App-header">
        <span className="heading">Taskify</span>
        <MyModal title="Subscribe to our newsletter"></MyModal>
        <InputField event={event} setEvent={setEvent} handleAdd={handleAdd}/>
        <EventList events={events} setEvents={setEvents}/>
        {/* <button onClick={() => {worker.postMessage(null)}}>Run Long Process</button> */}
        {/* <button className="btn" onClick={apiCall}>Execute Python Script</button> */}
        <ImageLoader setText={setText}/>
        <div style={{maxWidth: "85vw", overflowWrap:"break-word"}}>
          {(text && (<strong>
              {text.data}
          </strong>))}
        </div>
      </header>
    </div>
  );
}

export default App;
