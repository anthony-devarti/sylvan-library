// the results of the search can be seen and selected from this section 
import { Button } from 'react-bootstrap'

export default function Results({item, addToBasket}) {

    return (
        <div className="result">
            <div>
                <img src={item.image} style={{maxWidth:'10vw'}}/>
            </div>
            <div>
                {item.name}
            </div>
            <Button onClick={() => addToBasket(item)}>Reserve</Button>
        </div>
    )
}