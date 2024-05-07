import React, {useState, useEffect} from 'react';
import "./componentStyles.css";
import { Modal, Button } from "react-bootstrap";

interface ModalProps {
    title: String;
}
class Spy {
  target;
  working_hours;
  commander;
  constructor(target:string, working_hours:string, commander:string){
    this.target=target;
    this.working_hours = working_hours;
    this.commander = commander;
  }
}

var grantWatcher = new Spy('Grant', '7-4:30', 'Maraqueisha');
console.log(grantWatcher.commander);
export function MyModal(props:ModalProps) {
    const { title } = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const oneMinuteInMilliseconds = 1000 * 60;

    useEffect(()=>{
        console.log(`Triggering modal pop-up in one minute from now (${new Date().toLocaleDateString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})})`);
        setTimeout(function(){
            console.log('1 minute elapsed.');
            handleShow();
        }, oneMinuteInMilliseconds)
    }, []);

    return (
        <div className="modalDiv">
            <Button variant="primary" onClick={handleShow}>
                click modal
            </Button>
            <Modal show={show} onHide={handleClose} id="dialog">
              <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form className="modalForm">
                    <div className="form-group">
                        <label htmlFor='email'>Email Address</label>
                        <input id="email" className="form-control" type="text"></input>
                    </div>
                    <Button variant="primary" type="submit">Submit</Button>
                </form>
                </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
        </div>
    )
}