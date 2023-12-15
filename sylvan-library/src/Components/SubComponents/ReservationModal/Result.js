// the results of the search can be seen and selected from this section 
import { Button } from 'react-bootstrap'

export default function Results({item}) {

    return (
        <div className="result">
            <div>
                <img src={item.image} style={{maxWidth:'10vw'}}/>
            </div>
            <div>
                {item.name}
            </div>
            <Button onClick={() => console.log('butts', item.inventory_id)}>Reserve</Button>
        </div>
    )
}