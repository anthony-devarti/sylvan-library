import React from "react"
import { Table } from 'react-bootstrap';
import { dateTimeUnformatter } from "../../utilities/dateTimeFormatter";

class Invoice extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const reservation = this.props.reservation
        const list = this.props.list

        return (
            <div style={{padding:'1rem'}}>
                <h1>Reservation {reservation.id} Invoice</h1>
                <Table bordered>
                    <tbody>
                        <tr>
                            <td>
                                Delivery Note:
                            </td>
                            <td>
                                {reservation.note}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Pickup Method:
                            </td>
                            <td>
                                {reservation.pickup_method}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Pickup Date:
                            </td>
                            <td>
                                {dateTimeUnformatter(reservation.pickup_date)}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Return Date:
                            </td>
                            <td>
                                {dateTimeUnformatter(reservation.return_date)}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>QTY Del</th>
                            <th>Con Del</th>
                            <th>QTY Ret</th>
                            <th>Con Ret</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>{item.name}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <p>
                    Whats Next?: Accept this reservation in the Sylvan Library Portal.
                    Be sure to check that the cards you received match the cards on this invoice.
                </p>
                <p>
                    After accepting the reservation, the cards that you have accepted are your responsibility to maintain.
                    You are expected to return the cards by their return date.
                </p>
                <p>
                    To Return: Cards should be returned, on time, unsleeved, in the order on this invoice.
                </p>
                <p>
                    DO NOT sublend these cards to someone else.  You are solely responsible for maintaining these cards.
                    Failure to return cards by the return data can negatively impact your ability to remain in the program.
                </p>
            </div>
        )
    }
}

export default Invoice