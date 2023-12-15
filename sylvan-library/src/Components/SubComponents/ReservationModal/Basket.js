//shows the user what cards they have already added to their cart to reserve
import {Button} from 'react-bootstrap';

const items = [{ name: 'The Chain Veil', quantity: 2 }, { name: 'Butts', quantity: 20 }]

export default function Basket({contents, removeItemFromBasket}) {

    return (
        <table>
            <thead>
                <tr>
                    <td>
                        <b>Name</b>
                    </td>
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
                        {contents.length}
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}