import { useNavigate,useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";
function Reward() {
    
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState('test');
    const [age, setAge] = useState('23');
    const handlenext = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post(`http://localhost:9000/postuser/cUYUrFibdgUzzmJdCs9kYnyJTGI3`, {
            name,
            age
          });
          console.log(response.data);
          navigate('/')
        } catch (error) {
          console.error(error);
        }
      };
    return(
        <div>
            Reward
            <button className="confirm_button" onClick={handlenext} style={{marginTop: "1vh"}}>
            Next
          </button>
        </div>
    )
}
export default Reward;