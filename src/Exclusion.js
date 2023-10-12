import React, { useState, useEffect } from "react";
import { FormContext } from "./FormContext";
import Button from "./Button";

export default function Exclusion() {
  const { step, criteriaA, criteriaB, criteriaC, criteriaD, stateCheckbox } =
    React.useContext(FormContext);

  const [stepValue, setStepValue] = step;
  const [criteriaAValue, setCriteriaAValue] = criteriaA;
  const [criteriaBValue, setCriteriaBValue] = criteriaB;
  const [criteriaCValue, setCriteriaCValue] = criteriaC;
  const [criteriaDValue, setCriteriaDValue] = criteriaD;
  console.log("Criteria D:", criteriaDValue);
  


  const { testFormData } = React.useContext(FormContext);

  const [formData, setFormData] = testFormData;
  console.log("Exclusion is: ", formData.cadetails.cacountry);

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

  const getData = () => {
    fetch(
      `http://localhost:8081/api/v2/regulated/criteria/EXCLUSION_A?contractingOperator=CONTRACTING_AUTHORITY`
    )
      .then((res) => res.json())
      .then((res) => {
        setCriteriaAValue(res);
      });
    fetch(
      `http://localhost:8081/api/v2/regulated/criteria/EXCLUSION_B?contractingOperator=CONTRACTING_AUTHORITY`
    )
      .then((res) => res.json())
      .then((res) => {
        setCriteriaBValue(res);
      });
    fetch(
      `http://localhost:8081/api/v2/regulated/criteria/EXCLUSION_C?contractingOperator=CONTRACTING_AUTHORITY`
    )
      .then((res) => res.json())
      .then((res) => {
        setCriteriaCValue(res);
      });
    fetch(
      `http://localhost:8081/api/v2/regulated/criteria/EXCLUSION_D?contractingOperator=CONTRACTING_AUTHORITY`
    )
      .then((res) => res.json())
      .then((res) => {
        setCriteriaDValue(res);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1 className="header-info main-header">Part III: Exclusion grounds</h1>
      <form>
        <h1 className="header-info main-header">
          A: Grounds relating to criminal convictions
        </h1>

        <div className="checkbox-container">
          {criteriaAValue.map((item, index) => {
            return (
              <div className="checkbox-wrapper" key={index}>
                <label className="checkbox-label">
                  <input
                    className="checkbox checkbox-disabled"
                    type="checkbox"
                    name={`fullCriterionList[${index}].selected`}
                    checked={formData.fullCriterionList[index].selected}
                    disabled
                  />
                  <span className="custom-checkbox"></span>
                  {item.name}
                </label>
                <h4 className="item-description">{item.description}</h4>
              </div>
            );
          })}
        </div>

        <h1 className="header-info main-header">
          B: Grounds relating to the payment of taxes or social security
          contributions
        </h1>

        <div className="checkbox-container">
          {criteriaBValue.map((item, index) => {
            return (
              <div className="checkbox-wrapper" key={index}>
                <label className="checkbox-label">
                  <input
                    className="checkbox checkbox-disabled"
                    type="checkbox"
                    name={`fullCriterionList[${index + 6}].selected`}
                    checked={formData.fullCriterionList[index + 6].selected}
                    disabled
                  />
                  <span className="custom-checkbox"></span>
                  {item.name}
                </label>
                <h4 className="item-description">{item.description}</h4>
              </div>
            );
          })}
        </div>

        <h1 className="header-info main-header">
          C: Grounds relating to insolvency, conflicts of interests or
          proffesional misconduct
        </h1>

        <div className="checkbox-container">
          {criteriaCValue.map((item, index) => {
            return (
              <div className="checkbox-wrapper" key={index}>
                <label className="checkbox-label">
                  <input
                    className="checkbox checkbox-disabled"
                    type="checkbox"
                    name={`fullCriterionList[${index + 8}].selected`}
                    checked={formData.fullCriterionList[index + 8].selected}
                    onChange={handleCheckboxChange(index + 8)}
                  />
                  <span className="custom-checkbox"></span>
                  {item.name}
                </label>
                <h4 className="item-description">{item.description}</h4>
              </div>
            );
          })}
        </div>

        <h1 className="header-info main-header">
          D: Purely national exclusion grounds
        </h1>

        <div className="checkbox-container">
          {criteriaDValue.map((item, index) => {
            return (
              <div className="checkbox-wrapper" key={index}>
                <label className="checkbox-label">
                  <input
                    className="checkbox checkbox-disabled"
                    type="checkbox"
                    name={`fullCriterionList[${index + 23}].selected`}
                    checked={formData.fullCriterionList[index + 23].selected}
                    onChange={handleCheckboxChange(index + 23)}
                  />
                  <span className="custom-checkbox"></span>
                  {item.name}{" "}
                </label>
                <h4 className="item-description">{item.description}</h4>
              </div>
            );
          })}
        </div>

        <div className="button">
          <Button value={"Previous"} step={3} />
          <Button value={"Next"} step={3} />
        </div>
      </form>
    </div>
  );
}
