// the results of the search can be seen and selected from this section 
import { Button } from 'react-bootstrap'

export default function Results({item}) {
    return (
        <div className="result">
            <div>
                <img src={item.image} />
            </div>
            <div>
                {item.name}
            </div>
            <Button>Reserve</Button>
        </div>
    )
}