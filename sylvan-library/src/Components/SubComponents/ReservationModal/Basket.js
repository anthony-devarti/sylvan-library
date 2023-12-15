//shows the user what cards they have already added to their cart to reserve

const items = [{ name: 'The Chain Veil', quantity: 2 }, { name: 'Butts', quantity: 20 }]

export default function Basket({ contents }) {
    return (
        <table>
            <thead>
                <tr>
                    <td>
                        <b>Name</b>
                    </td>
                    <td>
                        <b>QTY</b>
                    </td>
                </tr>
                {items.map((item) => {
                    return (
                        <tr>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.quantity}
                            </td>
                        </tr>
                    )
                })}
            </thead>
        </table>
    )
}