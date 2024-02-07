/* 
The ReservationProgressBar component is a styling component 
meant to take a reservation, and display the current status in an appealing way.  
It assumes that we have the reservation status and outputs the progress.  
Think like the dominoes progress bar on a delivery

for space consideration, stages should be associated with icons unless they are active.


*/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHandshakeSimple, faHandsHoldingCircle, faRightLeft, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { reservationStage } from "../../../AppConstants";

export default function ReservationProgressBar({ stage }) {

    let approved, delivered, borrowed, returned

    switch (stage) {
        case reservationStage.approved:
            approved = 'active'
            break;
        case reservationStage.delivered:
            delivered = 'active'
            approved = 'completed'
            break;
        case reservationStage.borrowed:
            borrowed = 'active'
            approved = 'completed'
            delivered = 'completed'
            break;
        case reservationStage.returned:
            returned = 'active'
            approved = 'completed'
            delivered = 'completed'
            borrowed = 'completed'
            break;
        default:
            break;
    }

    return (
        <div className="progress-bar">
            <div className={`node ${approved}`}>
                <FontAwesomeIcon icon={faCheck} />
                Approved
            </div>
            <div className={`node ${delivered}`}>
                <FontAwesomeIcon icon={faHandshakeSimple} />
                Delivered
            </div>
            <div className={`node ${borrowed}`}>
                <FontAwesomeIcon icon={faHandsHoldingCircle} />
                Borrowed
            </div>
            <div className={`node ${returned}`}>
                <FontAwesomeIcon icon={faRightLeft} />
                Returned
            </div>
            {/* this will never be active, because if the reservation is complete, this card won't be visible  */}
            <div className='node'>
                <FontAwesomeIcon icon={faCircleCheck} />
                Complete
            </div>
        </div>
    )
}