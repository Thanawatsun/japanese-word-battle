import { useNavigate,useLocation } from 'react-router-dom';
function Reward() {
    
    const location = useLocation();
    const navigate = useNavigate();
    const handlenext = () => {
        navigate('/')
    }
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