import { useNavigate,useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";
function Reward() {
    
    const location = useLocation();
    const navigate = useNavigate();
    const { quizData } = location.state; // รับค่า quizData จาก state
    const {act_count} = location.state;
    const { userdefine } = location.state;
    const [name, setName] = useState('test002');
    const [age, setAge] = useState('2300');
    const handlenext = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post(`http://localhost:9000/postuser/${userdefine.uid}`, {
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