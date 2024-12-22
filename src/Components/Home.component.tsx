import React, { useState } from 'react';
import {useEffect} from 'react';

import {apiService} from '../Services/api.service.ts';
import { BASE_URL, GET_RESERVATIONS } from '../Constants/constants.ts';
import ReservationTable from './ReservationsTable.tsx';

const Home = () => {

    const [searchString, setSearchString] = useState('');
    const [reservations, setReservations] = useState(new Map());
    const [expandedRows, setExpandedRows] = useState({} as { [key: string]: boolean });

    useEffect(() => {
        apiService.getService(BASE_URL + GET_RESERVATIONS)
            .then(handleSucess)
            .catch(handleError);
    }, [searchString])

    const handleSucess = (data): void => {
        setReservations(data);
    }

    const handleError = (err: Response): void => {
        console.error(err);
    }

    const handleInputChange = (event) => {
        setSearchString(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(isSearchMode()){
            setReservations({searchString:reservations[searchString]});

        }
    };

    const handleRowClick = (key: string) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    const getTotalAmmountForEachProduct = (arrayOfProducts): number => {
        let totalAmmount = 0;
        for(let product of arrayOfProducts){
            if(product.productCost){
                totalAmmount += product.productCost;
            }
        }

        return totalAmmount;
    }

    const isSearchMode = (): boolean =>{
        return searchString !== '';
    }

    const getProductStatus = (productStatus: boolean | undefined): string => {
        if (productStatus === true) {
            return 'active';
        }
        if (productStatus === false) {
            return 'cancelled';
        }
        return 'N/A';
    };

    const getRowBackgroundColor = (productStatus: boolean | undefined): string => {
        if (productStatus === true) {
            return 'green';
        }
        if (productStatus === false) {
            return 'red';
        }
        return 'transparent';
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="inputField">Input:</label>
                <input
                    type="text"
                    id="inputField"
                    value={searchString}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
        <table border="1">
            <thead>
                <tr>
                    <th>Reservation UUID</th>
                    <th>Number of Active Purchases</th>
                    <th>Sum of Active Charges</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(reservations).map(([key, valueArray]) => {
                    const isExpanded = expandedRows[key];
                    return (
                        <>
                            <tr key={`${key}-header`} onClick={() => handleRowClick(key)} style={{cursor: 'pointer'}}>
                                <td>{key}</td>
                                <td>{valueArray.length}</td>
                                <td>{getTotalAmmountForEachProduct(valueArray)}</td>
                            </tr>

                            {isExpanded && (
                                <>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Status</th>
                                        <th>Charge</th>
                                    </tr>
                                    {valueArray?.map((item, index) => (
                                        <tr key={`${key}-${index}`} style={{ backgroundColor: getRowBackgroundColor(item.productStatus) }}>
                                            <td>{item.productName}</td>
                                            <td>{getProductStatus(item.productStatus)}</td>
                                            <td>{item.productCost}</td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </>
                    );
                })}
            </tbody>
        </table>
        </div>
    )
}

export default Home;
