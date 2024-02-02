//shows the user what cards they have already added to their cart to reserve
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import removeLineItem from '../../../apiActions/removeLineItem';


export default function Basket({ removeItemFromBasket }) {

    const dispatch = useDispatch()

    const contents = useSelector(state => state.basket.contents)
    const liability = useSelector(state => state.basket.value)
    const idReservation = useSelector(state => state.basket.openReservationID)

    return (
        <table>
            <thead>
                <tr>
                    <td>
                        <b>Name</b>
                    </td>
                    <td>ID</td>
                    <td>
                        <b>Remove</b>
                    </td>
                </tr>
                {contents.map((item) => {
                    console.log(item)
                    return (
                        <tr key={item.id_inventory}>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.id_inventory}
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => dispatch(removeLineItem(item, idReservation))}>
                                    X
                                </Button>
                            </td>
                        </tr>
                    )
                })}
            </thead>
            <tfoot>
                <tr>
                    <td>
                        <b>Total: </b>
                    </td>
                    <td>
                        {contents.length} items valued at ${liability}
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}