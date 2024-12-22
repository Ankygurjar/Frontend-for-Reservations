import React, { useState } from 'react';
import {useEffect} from 'react';

import {apiService} from '../Services/api.service.ts';
import { BASE_URL, GET_RESERVATIONS } from '../Constants/constants.ts';
import ReservationTable from './ReservationsTable.tsx';

const Home = () => {

    const [searchString, setSearchString] = useState('');
    const [reservations, setReservations] = useState(new Map());

    useEffect(() => {
        apiService.getService(BASE_URL + GET_RESERVATIONS)
            .then(handleSucess)
            .catch(handleError);
    }, [])

    const handleSucess = (data): void => {
        setReservations(data);
        console.log(data);
    }

    const handleError = (err: Response): void => {
        console.error(err);
    }

    return (
        <div>
            <table border="1" >
                <thead>
                    <tr>
                        <th>Reservation UUID</th>
                        <th>Number of Active Purchases</th>
                        <th>Sum of Active Charges</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(reservations).map(([key, valueArray]) => (
                        valueArray.map((item, index) => (
                            <tr key={`${key}-${index}`}>
                                <td>{key}</td>
                                <td>{valueArray.length}</td>
                                <td>{item.productCost}</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home;
