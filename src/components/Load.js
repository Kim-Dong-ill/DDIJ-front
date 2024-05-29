import React, { useEffect, useState } from 'react';
import axiosInstance from "../utils/axios";

const Load = ({ LoadData, updateData }) => {
    useEffect(() => {
        const sendLocation = async () => {
            let nowCoords = {
                latitude: LoadData.Coords.latitude,
                longitude: LoadData.Coords.longitude
            };

            if (navigator.geolocation) {
                try {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(
                            resolve,
                            reject,
                            { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
                        )});
                    nowCoords.latitude = position.coords.latitude;
                    nowCoords.longitude = position.coords.longitude;

                    let userid = "664c4171a9e4f2a9a11b291c";

                    console.log(localStorage);
                    console.log(`유저아이디는 => ${userid}`);
                    try {
                        const body = {
                            nowCoords : nowCoords
                        }
                        const response = await axiosInstance.post(`/index/${userid}`, body);
                        console.log('Location sent successfully:', response.data);
                        const userList = response.data.nearUser.map(user => user._id);
                        const circleList = response.data.nearCircle.map(circle => circle._id);
                        const newData = { Coords: nowCoords, userList, circleList };
                        updateData(newData);
                    } catch (error) {
                        console.error('Error sending location:', error);
                    }
                } catch (error) {
                    console.error("geolocation 오류" + error.code + ":" + error.message);
                }
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        };

        sendLocation();
    }, []);
    return (
        <div>
            <p>TEST_VERSION</p>
        </div>
    );
};

export default Load;