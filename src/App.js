
import React, { useContext } from 'react';
import './App.css';
import { FormContext } from './FormContext';
import Start from './Start';
import Procedure from './Procedure';
import Exclusion from './Exclusion';
import Selection from './Selection';
import Finish from './Finish';

import styled, {keyframes} from 'styled-components';

import { fadeIn } from 'react-animations';


import {CSSTransition} from "react-transition-group";



const FadeIn = styled.div`animation: 2s ${keyframes`${fadeIn}`} `;




function App() {

  const {step, appeared} = React.useContext(FormContext)

  const [stepValue, setStepValue] = step

  {/*Use it for CSS Transition */}
  const [appearedValue, setAppearedValue] = appeared

 const toggleAppeared = () => setAppearedValue(value => !value);

  return (
      <div className="App">
        
        <p className="progress-p">Progress</p>
        {/* Use bar for the user to see progress bar */}
        <div className="progress-bar">

          <div style={{width: stepValue === 0? "0%": stepValue === 1? "20%": stepValue === 2? "40%" : stepValue === 3? "60%" : stepValue === 4? "80%" : "100%"}}>
          </div>
        </div>

          

         
          {stepValue==1? 
          <FadeIn>
            <Start /> 
          </FadeIn>
         :null}

          {stepValue==2? 
           <FadeIn>
            <Procedure />  
          </FadeIn>
          :null}

          {stepValue==3? 
            <FadeIn>
              <Exclusion /> 
            </FadeIn>
          :null}

          {stepValue==4? 
            <FadeIn>
              <Selection /> 
            </FadeIn>
          :null}

          {stepValue==5? 
            <FadeIn>
              <Finish /> 
            </FadeIn>
          :null}

         
         

          
          


          

      </div>
  );
}

export default App;
