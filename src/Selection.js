import React, { useState, useEffect, useContext } from "react";
import { FormContext } from "./FormContext";
import Finish from "./Finish";
import Button from "./Button";

export default function Selection() {
  const { selection, selectionA, selectionB, selectionC, selectionD } =
    React.useContext(FormContext);

  const [selectionValue, setSelectionValue] = selection;
  const [selectionAValue, setSelectionAValue] = selectionA;
  const [selectionBValue, setSelectionBValue] = selectionB;
  const [selectionCValue, setSelectionCValue] = selectionC;
  const [selectionDValue, setSelectionDValue] = selectionD;

  function handleChange(event) {
    setSelectionValue(event.target.value);
  }

  const getData = () => {
    fetch(`http://localhost:8081/api/v2/regulated/criteria/SELECTION_A`)
      .then((res) => res.json())
      .then((res) => {
        setSelectionAValue(res);
      });
    fetch(`http://localhost:8081/api/v2/regulated/criteria/SELECTION_B`)
      .then((res) => res.json())
      .then((res) => {
        setSelectionBValue(res);
      });
    fetch(`http://localhost:8081/api/v2/regulated/criteria/SELECTION_C`)
      .then((res) => res.json())
      .then((res) => {
        setSelectionCValue(res);
      });
    fetch(`http://localhost:8081/api/v2/regulated/criteria/SELECTION_D`)
      .then((res) => res.json())
      .then((res) => {
        setSelectionDValue(res);
      });
  };


  const { testFormData } = React.useContext(FormContext);

  const [formData, setFormData] = testFormData;
  console.log("Selection is: ", formData.cadetails.cacountry);

  // Handle checkbox changes for nested arrays and objects
  const handleCheckboxChange = (index) => (e) => {
    const { name, checked } = e.target;

    const [parent, index, prop] = name.match(/\d+|[a-zA-Z]+/g);

    setFormData((prevFormData) => {
      const updatedFullCriterionList = prevFormData.fullCriterionList.map(
        (item, idx) => {
          if (idx === Number(index)) {
            return {
              ...item,
              [prop]: checked,
            };
          }
          return item;
        }
      );

      return {
        ...prevFormData,
        [parent]: updatedFullCriterionList,
      };
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2 className="header-info main-header">Part IV: Selection criteria</h2>
      <header>
        Contracting authorities must indicate which selection criteria will be
        applied by 'ticking' the checkbox placed before the relevant criterion.
        Do you want to use the selection criteria from A to D?
      </header>
      <input
        type="radio"
        value="yes"
        name="selection"
        onChange={handleChange}
      />
      yes
      <br />
      <input type="radio" value="no" name="selection" onChange={handleChange} />
      no
      <br />
      <div className="button">
        <Button value={"Previous"} step={4} />
        <Button value={"Next"} step={4} />
      </div>
      {selectionValue === "yes" ? (
        <form>
          <div>
            <h1 className="header-info main-header">A: Sutability</h1>

            <div className="checkbox-container">
              {selectionAValue.map((item, index) => {
                return (
                  <div className="checkbox-wrapper" key={index}>
                    <label className="checkbox-label">
                      <input
                        className="checkbox"
                        type="checkbox"
                        name={`fullCriterionList[${index + 33}].selected`}
                        checked={
                          formData.fullCriterionList[index + 33].selected
                        }
                        onChange={handleCheckboxChange(index + 33)}
                      />
                      <span className="custom-checkbox"></span>
                      {item.name}
                    </label>
                    <h4 className="item_description">{item.description}</h4>
                  </div>
                );
              })}
            </div>

            <h1 className="header-info main-header">B: Economic and financial standing</h1>

            <div className="checkbox-container">
              {selectionBValue.map((item, index) => {
                return (
                  <div className="checkbox-wrapper" key={index}>
                    <label className="checkbox-label">
                      <input
                        className="checkbox"
                        type="checkbox"
                        name={`fullCriterionList[${index + 37}].selected`}
                        checked={
                          formData.fullCriterionList[index + 37].selected
                        }
                        onChange={handleCheckboxChange(index + 37)}
                      />
                      <span className="custom-checkbox"></span>
                      {item.name}
                    </label>
                    <h4 className="item_description">{item.description}</h4>
                  </div>
                );
              })}
            </div>

            <h1 className="header-info main-header">
              C: Technical and professional ability
            </h1>

            <div className="checkbox-container">
              {selectionCValue.map((item, index) => {
                return (
                  <div className="checkbox-wrapper" key={index}>
                    <label className="checkbox-label">
                      <input
                        className="checkbox"
                        type="checkbox"
                        name={`fullCriterionList[${index + 45}].selected`}
                        checked={
                          formData.fullCriterionList[index + 45].selected
                        }
                        onChange={handleCheckboxChange(index + 45)}
                      />
                      <span className="custom-checkbox"></span>
                      {item.name}
                    </label>
                    <h4 className="item_description">{item.description}</h4>
                  </div>
                );
              })}
            </div>

            <h1 className="header-info main-header">
              D: Quality assurance schemes and environmental management
              standards
            </h1>

            <div className="checkbox-container">
              {selectionDValue.map((item, index) => {
                return (
                  <div className="checkbox-wrapper" key={index}>
                    <label className="checkbox-label">
                      <input
                        className="checkbox"
                        type="checkbox"
                        name={`fullCriterionList[${index + 62}].selected`}
                        checked={
                          formData.fullCriterionList[index + 62].selected
                        }
                        onChange={handleCheckboxChange(index + 62)}
                      />
                      <span className="custom-checkbox"></span>
                      {item.name}
                    </label>
                    <h4 className="item_description">{item.description}</h4>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="button">
            <Button value={"Previous"} step={4} />
            <Button value={"Next"} step={4} />
          </div>
        </form>
      ) : null}
    </div>
  );
}
