import React from 'react'
import { useState, createContext } from 'react'
import json_data from './ESPD_schema.json'

console.log("JSON Data is: " ,json_data) 
console.log("Operator is: " ,json_data.operator) 
console.log("Operator is: " ,json_data.procurementPublicationNumber) 

export const FormContext = createContext();

export const FormProvider = props => {

  
    /*Update JSON with React */
    /*Form data has the structure of the json file */

    const [formData, setFormData] = useState(json_data);
    console.log("Form data is: " ,formData)

    const [step, setStep] = useState(1)

    const [state, setState] = React.useState({
        operator: json_data.operator,
        action: "",
        ESPD_type: ""
      })
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState([])

    const [criteriaA, setCriteriaA] = useState([])
    const [criteriaB, setCriteriaB] = useState([])
    const [criteriaC, setCriteriaC] = useState([])
    const [criteriaD, setCriteriaD] = useState([])

    const [selection, setSelection] = useState("no")
    const [selectionA, setSelectionA] = useState([])
    const [selectionB, setSelectionB] = useState([])
    const [selectionC, setSelectionC] = useState([])
    const [selectionD, setSelectionD] = useState([])

    const [appeared,setAppeared] = useState(true) 


    return (
        <FormContext.Provider 
        value={{ testFormData:[formData, setFormData], info:[state, setState], country:[country, setCountry], countries:[countries, setCountries], step:[step,setStep], criteriaA:[criteriaA, setCriteriaA], criteriaB:[criteriaB, setCriteriaB] , criteriaC:[criteriaC, setCriteriaC] , criteriaD:[criteriaD, setCriteriaD], selection:[selection, setSelection], selectionA:[selectionA, setSelectionA], selectionB:[selectionB, setSelectionB], selectionC:[selectionC, setSelectionC], selectionD:[selectionD, setSelectionD] , appeared:[appeared,setAppeared] } }>
            {props.children}
        </FormContext.Provider>
    )
}
