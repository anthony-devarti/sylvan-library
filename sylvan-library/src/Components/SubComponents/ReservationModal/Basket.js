//shows the user what cards they have already added to their cart to reserve
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';


export default function Basket({ removeItemFromBasket }) {

    const contents = useSelector(state =>
        state.basket.contents
    )

    const liability = useSelector(state =>
        state.basket.value
    )

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
                    return (
                        <tr>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.inventory_id}
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => removeItemFromBasket(item)}>
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