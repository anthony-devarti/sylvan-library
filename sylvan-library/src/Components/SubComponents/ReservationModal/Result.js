// the results of the search can be seen and selected from this section 
import { Button } from 'react-bootstrap'

export default function Results({item, addToBasket}) {


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
            <Button onClick={() => addToBasket(item)}>Reserve</Button>
        </div>
    )
}