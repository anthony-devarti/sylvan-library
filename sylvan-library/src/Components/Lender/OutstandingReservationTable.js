import { useEffect, useState, useRef } from "react";
import { Button, Table, Modal, Container, Row, Col } from "react-bootstrap";
import lenderGetReservations from "../../apiActions/lenderGetReservations";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../SubComponents/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faArrowUpRightFromSquare, faPrint } from "@fortawesome/free-solid-svg-icons";
import { dateTimeUnformatter } from "../../utilities/dateTimeFormatter";
import getReservationCardsList from "../../apiActions/getReservationCardsList";
import { useReactToPrint } from 'react-to-print';
import PrintComponent from "./PrintComponent";

const OutstandingReservationTable = () => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const dispatch = useDispatch()
    const tableDataPending = useSelector(state => state.lender.tableLoading)
    const tableData = useSelector(state => state.lender.openReservations)
    const [selectedReservation, setSelectedReservation] = useState()
    const [list, setList] = useState([])

    useEffect(() => {
        lenderGetReservations(dispatch)
    }, [])

    useEffect(() => {
        getReservationCardsList(selectedReservation.id)
            .then((reservationCardsList) => {
                setList(reservationCardsList);
            })
            .catch((error) => {
                console.error('Error fetching reserved cards list:', error);
                // Handle the error if needed
                setList([])
            });
    }, [selectedReservation])

    if (tableDataPending) {
        return (
            <Loader fullscreen />
        )
    }

    const CardListTable = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Card Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td>
                            Total:
                        </td>
                        <td>
                            {list.length} total cards in this Reservation
                        </td>
                    </tr>
                </tbody>
            </Table>
        )
    }

    const Example = () => {
        const componentRef = useRef();
        const handlePrint = useReactToPrint({
            content: () => componentRef.current,
        });

        return (
            <div>
                <CardListTable ref={componentRef} />
                <button onClick={handlePrint}>Print this out!</button>
            </div>
        );
    };

    function DefaultVisualizer(isDefaultState) {
        if (isDefaultState == false) {
            return (
                <>
                    <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#c1481f", }} />
                </>
            )
        }
        return (
            <>
                <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#116431", }} />
            </>
        )
    }

    function ActionButton({ actionNeeded }) {
        if (actionNeeded.responsibility == 'borrower') {
            return (
                <Button disabled>Borrower Responsibility</Button>
            )
        }
        return (
            <>
                <Button>{actionNeeded.button_text}</Button>
            </>
        )
    }

    function ReservationDetailsModal() {
        return (
            <Modal show={show} onHide={handleClose} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Reservation {selectedReservation?.id} Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                Note:
                            </Col>
                            <Col>
                                {selectedReservation?.note}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Pickup Time:
                            </Col>
                            <Col>
                                {dateTimeUnformatter(selectedReservation?.pickup_date) || 'By event described in note'}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Return Time:
                            </Col>
                            <Col>
                                {dateTimeUnformatter(selectedReservation?.return_date)}
                            </Col>
                        </Row>
                    </Container>
                    <CardListTable />

                </Modal.Body>
                <Modal.Footer>
                    <PrintComponent list={list} reservation={selectedReservation} />
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <>
            <h1>Outstanding Reservations</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Reservation #</th>
                        <th>Borrower</th>
                        <th>Stage</th>
                        <th>Pickup DateTime</th>
                        <th>Return DateTime</th>
                        <th>Email</th>
                        <th>Issue</th>
                        <th>Details</th>
                        <th>Action Needed</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((reservation) => {
                        return (
                            <tr key={reservation.id}>
                                <td>{reservation.id}</td>
                                <td>{reservation.user_info.name}</td>
                                <td>{reservation.reservation_status_info.stage.name}</td>
                                <td>{dateTimeUnformatter(reservation.pickup_date)}</td>
                                <td>{dateTimeUnformatter(reservation.return_date)}</td>
                                <td>
                                    <a href={`mailto:${reservation.user_info.email}`}>
                                        {reservation.user_info.email}
                                    </a>
                                </td>
                                <td>{<DefaultVisualizer isDefaultState={reservation.default_state} />}</td>
                                <td>
                                    <Button onClick={() => [
                                        console.log(reservation),
                                        setSelectedReservation(reservation),
                                        setShow(true)
                                    ]
                                    }>
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                    </Button>
                                </td>
                                <td>{<ActionButton actionNeeded={reservation.decision_point_info.action_required} />}</td>
                            </tr>
                        )
                    })}
                    <ReservationDetailsModal show={show} onHide={() => setShow(false)} />
                </tbody>
            </Table>
            Showing {tableData.length} total reservations.
        </>
    )
}

export default OutstandingReservationTable