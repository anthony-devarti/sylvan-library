import { useRef } from "react";
import ReactToPrint from 'react-to-print';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import Invoice from "./Invoice";

export default function PrintComponent({list, reservation}) {
    let componentRef = useRef();

    return (
        <>
            <ReactToPrint
                trigger={() => <Button><FontAwesomeIcon icon={faPrint} /></Button>}
                content={() => componentRef}
            />
            {/* the invoice is not rendered on the page, but it is here so it can be printed  */}
            <div style={{ display: 'none' }}>
                <Invoice list={list} reservation={reservation} ref={(el) => (componentRef = el)}/>
            </div>
        </>
    )
}