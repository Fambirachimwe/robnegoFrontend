import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getReservationById } from './util/api';
import axios from 'axios';
import { Card, LoadingOverlay, Text } from '@mantine/core';

const ReservationDetailPage = () => {
    const [visible, setVisible] = useState(false);
    const { id } = useParams();
    // const _myId = id;
    // const query = useQuery({ queryKey: ['reservations', id], queryFn: getReservationById });

    const { data, isLoading } = useQuery({
        queryKey: ['reservations', id], queryFn: async () => {
            const response = await axios.get('https://robnego-production.up.railway.app/reservation/' + id)

            // const data = await getReservationById(id)
            return response
        }
    })


    var _id, date, completed, phoneNumber, seatingType, numberOfPersons;
    if (data) {
        _id = data.data._id;
        date = data.data.date;
        completed = data.data.completed;
        phoneNumber = data.data.phoneNumber;
        seatingType = data.data.seatingType;
        numberOfPersons = data.data.numberOfPersons;
    }




    return (
        <div>

            {
                isLoading ? (
                    <div style={{ width: 400, position: 'relative' }}>
                        <LoadingOverlay visible={isLoading} overlayBlur={2} />
                        {/* ...other content */}
                    </div>
                ) :
                    (
                        <>

                            <Text mt="lg" pb="xl" size="lg">
                                Reservation:
                            </Text>
                            <Card>
                                <Text mt="lg" pb="xl" size="md">
                                    ID: {_id}
                                </Text>
                                <Text mt="lg" pb="xl" size="md">
                                    date: {date}
                                </Text>
                                <Text mt="lg" pb="xl" size="md">
                                    Number or people: {numberOfPersons}
                                </Text>

                                <Text mt="lg" pb="xl" size="md">
                                    phoneNumber {phoneNumber}
                                </Text>

                                <Text mt="lg" pb="xl" size="md">
                                    Seating {seatingType}
                                </Text>

                                <Text mt="lg" pb="xl" size="md">
                                    Filled {completed ? 'Completed' : "Pending"}
                                </Text>

                            </Card>

                        </>
                    )
            }

        </div>
    )
}

export default ReservationDetailPage
