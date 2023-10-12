import React from 'react'
import { FormContext } from './FormContext';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Button(props) {

    const {step} =  React.useContext(FormContext)
    const [stepValue, setStepValue] = step

    function handleSubmitNext(){
        setStepValue(props.step+1)
        console.log("we in first")
      }

    function handleSubmitPrev(){
        setStepValue(props.step-1)
        console.log("we in second")
    }



  return (
    <div>
        {props.value=="Next" ?
            <input  className="btn btn-outline-primary" type="submit"  value={props.value} onClick={handleSubmitNext}/>
        :
        <input  className="btn btn-outline-primary" type="submit"  value={props.value} onClick={handleSubmitPrev}/>
        }
    </div>
  )
}
