/* 
This is just the little red or yellow flag that appears at the top right corner of the reservationcard 
yellow means a decision is needed
red means we've reached a failed state (check this language, because I don't think it matches)
There could be a situation where two are needed, and they should stack with red on top

*/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faBolt } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function NotificationFlag({ notiType, mousoverMessage }) {

    let type = notiType == 'danger' ? 'danger' : 'warning'

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {mousoverMessage}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            <div className={`notification ${type}`}>
                {type == 'danger' ?
                    <FontAwesomeIcon icon={faExclamation} />
                    :
                    <FontAwesomeIcon icon={faBolt} />
                }
            </div>
        </OverlayTrigger>
    )
}