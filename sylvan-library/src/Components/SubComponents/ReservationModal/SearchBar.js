//ideally, this search functionality will be pretty robust, and will show results in the inventory section
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import Result from './Result'
import { ECHO_TOKEN } from '../../../AppConstants'

export default function SearchBar({addToBasket}) {

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const request = async () => {
        const endpoint = `https://api.echomtg.com/api/inventory/view/?start=0&limit=100$sort=name&search=${search}`;
        const res = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ECHO_TOKEN}`
            }
        })
        const data = await res.json();
        //we probably want to filter these search results according to outstanding inventory ids that are not available, that way we're not showing stuff that isn't available
        //this process will actively require us to have the backend running and hooked up correctly.
        if (data.status != 'error') {
            setSearchResults(data.items)
        }
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
                {searchResults.map((item) => {
                    return (
                        <Result item={item} />
                    )
                })}
            </div>
        </div>
    )
}