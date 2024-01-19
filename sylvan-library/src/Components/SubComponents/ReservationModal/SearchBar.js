//ideally, this search functionality will be pretty robust, and will show results in the inventory section
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import Result from './Result'
import { ECHO_TOKEN } from '../../../AppConstants'
import { useSelector } from 'react-redux'
import getReservedCardsList from '../../../apiActions/getReservedCardsList'

export default function SearchBar({addToBasket}) {

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const reservedCardsInState = useSelector(state => state.basket.reservedCards)

    const request = async () => {
        const endpoint = `https://api.echomtg.com/api/inventory/view/?start=0&limit=100$sort=name&search=${search}`;
        const res = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ECHO_TOKEN}`
            }
        })
        const data = await res.json();
        
        if (data.status != 'error') {
            setSearchResults(data.items)
        }
       
        //we probably want to filter these search results according to outstanding inventory ids that are not available, that way we're not showing stuff that isn't available
        return data;
    }

    return (
        <div className='search'>
            <div className='search-bar'>
                <Form.Control
                    className='search-field'
                    type="text"
                    id="search"
                    placeholder='Search'
                    onChange={e => setSearch(e.target.value)}
                />
                <Button className='go-button' onClick={request}>Go!</Button>
            </div>
            <div className='results'>
                { searchResults.length == 0 &&
                    <>
                    No Results
                    </>
                }
                {searchResults.map((item) => {
                    //just don't render them here if they are among the cards that are reserved already
                    if (reservedCardsInState && reservedCardsInState.includes(item.inventory_id)){
                        console.log('hiding something that is reserved')
                        return null
                    }
                    return (
                        <Result item={item} addToBasket={addToBasket} key={item.inventory_id}/>
                    )
                })}
            </div>
        </div>
    )
}