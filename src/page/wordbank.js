import React, {useEffect } from 'react';
import fetchJishoData from '../JishoAPI';
function WordBank(){
    
  useEffect(() => {
    fetchJishoData()
      .then(data => console.log(data));
  }, []);
    return(
        <div>
            <h1>
                Hellow world
            </h1>
        </div>
    )
}
export default WordBank;
