import React, { useState, useEffect } from 'react'

function TableRow(props) {

    const [participants, setParticipants] = useState([]);

    const getParticipants = async () => {
        let users = [];
        try {
            let response = await fetch(`api/challenges/participants/${props.elem.match_id}`, { 
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            let allMatches = await response.json();

            if (response.ok) {
                //console.log(allMatches);
                allMatches.forEach((elem) => {
                    elem.Users.forEach((user) => {
                        users.push(user.firstName);
                    })
                })
            }
          } catch (error) {
            console.error("Error fetching all active challenges", error);
          }

        //console.log(users);

        setParticipants(users);
    }

    useEffect(() => {
        getParticipants();
        return () => {
          // clean up function
        };
    }, []);

    return(
        <tr key={props.elem.match_id}>
            <th scope="row">{props.elem.match_id}</th>
            <td>{participants[0]}, {participants[1]}</td>
            <td>{props.elem.distance + " miles"}</td>
            <td>{new Date(props.elem.deadline).getMonth()+1}/{new Date(props.elem.deadline).getDate()}/{new Date(props.elem.deadline).getYear()-100}</td>
        </tr>
    )
}

export default TableRow;