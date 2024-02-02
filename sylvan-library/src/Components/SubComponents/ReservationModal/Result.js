// the results of the search can be seen and selected from this section 
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

export default function Results({item, addToBasket}) {

    const currentReservation = useSelector(state => state.basket.openReservationID)
    const dispatch = useDispatch()

    return (
        <div className="result">
            <div>
                <img src={item.image} alt='card' style={{maxWidth:'10vw'}}/>
            </div>
            <div>
                {item.name}
            </div>
            <div>
                {item.inventory_id}
            </div>
            <Button onClick={() => addToBasket(item, currentReservation, dispatch)}>Reserve</Button>
        </div>
    )
}