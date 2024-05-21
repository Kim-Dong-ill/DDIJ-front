import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Load = ({LoadData},{updateData}) => {

    useEffect(() => {
        const sendLocation = async () => {
            let nowCoords = false;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
                function success(position) {
                    nowCoords = position.coords;
                }
                function error(error) {
                    console.log("geolocation 오류" + error.code + ":" + error.message);
                }
            }
            let userId;
            if(localStorage.getItem('userId' ? userId = this : userId=0))
            try {
                const response = await axios.get(`/index/${userId}`, { params: nowCoords });
                console.log('Location sent successfully:', response.data);
                // const userList = response.data.user
                // const petList = response.data.pet
                // const newData = { coords : {nowCoords}, useList, petList}
                // updateData(newData)
            } catch (error) {
                console.error('Error sending location:', error);
            }
        };
        sendLocation();
    }, []);

    return (
        <div>
            <h1>Geolocation Example</h1>
            <ul>
                {/*{userList.map((user, index) => (*/}
                {/*    <li key={index}>*/}
                {/*        ID: {user.id}, Latitude: {user.latitude}, Longitude: {user.longitude}*/}
                {/*    </li>*/}
                {/*))}*/}
                {/*{petList.map((pet, index) => (*/}
                {/*    <li key={index}>*/}
                {/*        ID: {pet.id}, Latitude: {pet.latitude}, Longitude: {pet.longitude}*/}
                {/*    </li>*/}
                {/*))}*/}

            </ul>
        </div>
    );
};

export default Load;