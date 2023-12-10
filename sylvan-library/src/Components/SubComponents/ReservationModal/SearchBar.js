//ideally, this search functionality will be pretty robust, and will show results in the inventory section
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import Result from './Result'
import { ECHO_TOKEN } from '../../../AppConstants'

export default function SearchBar() {

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    console.log(searchResults)

    const request = async () => {
        const endpoint = `https://api.echomtg.com/api/inventory/view/?start=0&limit=100$sort=name&search=${search}`;
        const res = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ECHO_TOKEN}`
            }
        })
        const data = await res.json();
        setSearchResults(data.items)
        return data;
    }

    return (
        <div className='search'>
            <div>

                <Form.Label htmlFor="search">Card Search</Form.Label>
                <Form.Control
                    className='search-field'
                    type="text"
                    id="search"
                    onChange={e => setSearch(e.target.value)}
                />
                <Button onClick={request}>Go!</Button>
            </div>
            <div className='results'>
                {searchResults.map((item) => {
                    return (
                        <Result item={item}/>
                    )
                })}
            </div>
        </div>
    )
}