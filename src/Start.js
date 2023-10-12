import React, { useState, useEffect, useContext } from "react";
import { FormContext } from "./FormContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "./Button";

import axios from "axios";

export default function Start(props) {


  const { testFormData, info, country, countries, step } =
    React.useContext(FormContext);
  const [formData, setFormData] = testFormData;
  console.log("Set form data is: ", formData);

  const [stateValue, setStateValue] = info;
  const [countryValue, setCountryValue] = country;
  const [countriesValue, setCountriesValue] = countries;
  const [stepValue, setStepValue] = step;


  const [file, setFile] = useState();
  function handleChangeUpload(event) {
    setFile(event.target.files[0]);
    console.log("file is here");
    console.log(event.target.files[0]);
  }
 

  const [fileContent, setFileContent] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result;
      console.log("Content is: ", content);
      setFileContent(content);

      // Perform the XML to JSON conversion and update formData
      const requestOptionsXML = {
        method: "POST",
        headers: { "Content-Type": "application/xml" },
        body: content,
      };

      fetch("http://localhost:8081/api/importESPD/request", requestOptionsXML)
        .then((response) => response.json())
        .then((data) => {
          // Loop through the JSON data and update the corresponding selected property in formData
          const updatedFormData = formData.fullCriterionList.map((item) => {
            const newDataItem = data.fullCriterionList.find((newItem) => newItem.id === item.id);
            return newDataItem ? { ...item, selected: newDataItem.selected } : item;
          });

          // Merge the existing formData with the updated fullCriterionList (checkboxes)
          setFormData({ ...data, fullCriterionList: updatedFormData });
        })
        .catch((error) => console.error("Error while converting XML to JSON:", error));
    };

    reader.readAsText(file);
  };


  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the input field is nested, split the name to access the nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle checkbox changes for nested arrays and objects
  const handleCheckboxChange = (e) => {
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

  const handleChange = (e) => {
    const value = e.target.value;
    setStateValue({
      ...stateValue,
      [e.target.name]: value,
    });
  };

  function handleChangeCountry(event) {
    const selectedCountryName = event.target.value;

    // Find the corresponding country object in the countriesValue array
    const selectedCountry = countriesValue.find(
      (country) => country.name === selectedCountryName
    );

    // Ensure that a valid country is found before updating the state
    if (selectedCountry) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        cadetails: {
          ...prevFormData.cadetails,
          cacountry: selectedCountry.code, // Save the country code
        },
      }));
    }
  }

  const getData = () => {
    fetch("http://localhost:8081/api/v2/codelists/CountryIdentification")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCountriesValue(res);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="">
      <div className="start_headers_container">
        <h1 className="start_title">Welcome to the ESPD service</h1>

        <h3 className="start_description">
          European Single Procurement Document (ESPD) is a self-declaration of
          the businesses' financial status, abilities and suitability for a
          public procurement procedure. It is available in all EU languages and
          used as a preliminary evidence of fulfilment of the conditions
          required in public procurement procedures across the EU. Thanks to the
          ESPD, the tenderers no longer have to provide full documentary
          evidence and different forms previously used in the EU procurement,
          which means a significant simplification of access to cross-border
          tendering opportunities. From October 2018 onwards the ESPD shall be
          provided exclusively in an electronic form. National Electronic Public
          Procurement System (NEPPS) provides the current free web service
          (Promitheus ESPDint) for the buyers, bidders and other parties
          interested in filling in the ESPD/SSDD electronically. The online form
          can be filled in, printed and then sent to the buyer together with the
          rest of the bid. If the procedure is run electronically, the ESPD can
          be exported, stored and submitted electronically. The ESPD provided in
          a previous public procurement procedure can be reused as long as the
          information remains correct. Bidders may be excluded from the
          procedure or be subject to prosecution if the information in the ESPD
          is seriously misrepresented, withheld or cannot be complemented with
          supporting documents.
        </h3>
      </div>

      <form className="start-form">
        <label className="header-label">Who are you?</label>
        <br />
        <input
          className="Form-input"
          type="radio"
          value="contracting_authority"
          name="operator"
          onChange={handleChange}
        />
        <label className="Form-label  Form-label--radio" for="radio1">
          I am a contracting authority
        </label>
        <br />

        <input
          className="Form-input"
          type="radio"
          value="contracting_entity"
          name="operator"
          onChange={handleChange}
        />
        <label className="Form-label  Form-label--radio" for="radio1">
          {" "}
          I am a contracting entity
        </label>
        <br />
        <br />
        <br />
        <br />

        {stateValue.operator !== "" ? (
          <div>
            <label className="header-label">What would you like to do?</label>
            <br />
            <input
              className="Form-input"
              type="radio"
              value="create_ESPD"
              name="action"
              onChange={handleChange}
            />
            <label className="Form-label  Form-label--radio" for="radio1">
              Create a new ESPD
            </label>
            <br />

            <input
              className="Form-input"
              type="radio"
              value="reuse_ESPD"
              name="action"
              onChange={handleChange}
            />
            <label className="Form-label  Form-label--radio" for="radio1">
              Reuse an existing ESPD
            </label>
            <br />

            <input
              className="Form-input"
              type="radio"
              value="review_ESPD"
              name="action"
              onChange={handleChange}
            />
            <label className="Form-label  Form-label--radio" for="radio1">
              Review ESPD
            </label>
            <br />
            <br />
            <br />

            {stateValue.action === "create_ESPD" ? (
              <div>
                <label className="header-label">
                  Is the ESPD Chr(34)RegulatedChr(34) or
                  Chr(34)Self-ContainedChr(34)?
                </label>
                <br />
                <input
                  className="Form-input"
                  type="radio"
                  name="ESPD_type"
                  value="regulated"
                  onChange={handleChange}
                />
                <label className="Form-label  Form-label--radio" for="radio1">
                  Create Regulated
                </label>
                <br />

                <input
                  className="Form-input"
                  type="radio"
                  name="ESPD_type"
                  value="self_contained"
                  onChange={handleChange}
                />
                <label className="Form-label  Form-label--radio" for="radio1">
                  Create Self-Contained
                </label>
                <br />

                <br />
                <br />
                <br />
                <label className="header-label">
                  Where is your authority located?
                </label>
                <select
                  className="select-countries"
                  onChange={handleChangeCountry}
                >
                  <option value="select">--Select country--</option>
                  {countriesValue.map((item, i) => {
                    return (
                      <option className="option-countries" value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                <br />
              </div>
            ) : null}

            {stateValue.action === "reuse_ESPD" ? (
              <div>

                <form>

                  <div>
                    <input type="file" onChange={handleFileUpload} />
                  </div>
                </form>
              </div>
            ) : null}
          </div>
        ) : null}
        <br />
        <br />
        <br />

        <div className="button">
          <Button value={"Next"} step={1} />
        </div>
        
      </form>

    </div>
  );
}
