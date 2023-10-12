import React from "react";
import { FormContext } from "./FormContext";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "./Button";

export default function Procedure() {
  const { testFormData, country, countries, } = React.useContext(FormContext);

  const [formData, setFormData] = testFormData;
  console.log("Test is: ", formData.cadetails.cacountry);

  const [countryValue, setCountryValue] = country;
  const [countriesValue, setCountriesValue] = countries;




  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // If the input field is nested, update the formData accordingly
    if (name.includes(".")) {
      const nestedProperties = name.split(".");
      let updatedFormData = { ...formData };
  
      // Traverse the nested properties to access the correct object
      let currentObject = updatedFormData;
      for (let i = 0; i < nestedProperties.length - 1; i++) {
        currentObject = currentObject[nestedProperties[i]];
      }
  
      // Update the specific property
      const lastProperty = nestedProperties[nestedProperties.length - 1];
      currentObject[lastProperty] = value;
  
      // Update the state
      setFormData(updatedFormData);
    } else {
      // If the input field is not nested, update the property directly
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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

  
  
  
  
  
  return (
    <div>
      <h1 className="header-info main-header">Part I: Information concerning the procurement procedure and the contracting authority or contracting entity</h1>

      <form className="procedure-form">
        <header>Information about publication</header>
        <label>
          For procurement procedures in which a call for competition has been
          published in the Official Journal of the European Union, the
          information required under Part I will be automatically retrieved,
          provided that the electronic ESPD-service is used to generate and fill
          in the ESPD. Reference of the relevant notice published in the
          Official Journal of the European Union:
        </label>
        <br />
        <input
          type="text"
          className="input-user"
          name="cadetails.receivedNoticeNumber"
          value={formData.cadetails.receivedNoticeNumber}
          onChange={handleInputChange}
          placeholder="Received notice number"
        />
        <br />

        <input
          className="input-user"
          name="cadetails.procurementPublicationNumber"
          value={formData.cadetails.procurementPublicationNumber}
          onChange={handleInputChange}
          placeholder="Notice number in the OJS:"
        />
        <br />

        <label>
          In case publication of a notice in the Official Journal of the
          European Union is not required, please give other information allowing
          the procurement procedure to be unequivocally identified (e. g.
          reference of a publication at national level)
        </label>
        <br />
        <input
          className="input-user"
          name="cadetails.procurementPublicationURI"
          value={formData.cadetails.procurementPublicationURI}
          onChange={handleInputChange}
          placeholder="OJS URL"
        />
        <br />
        <br />
        <br />
      </form>


      <form>
        <header>Identity of the producer</header>
        <input
          className="input-user"
          name="cadetails.caofficialName"
          value={formData.cadetails.caofficialName}
          onChange={handleInputChange}
          placeholder="Official name:"
          required
        />
        <br />

        <input
          className="input-user"
          name="cadetails.id"
          value={formData.cadetails.id}
          onChange={handleInputChange}
          placeholder="VAT number, if applicable:"
        />
        <br />

        <input
          className="input-user"
          name="cadetails.webSiteURI"
          value={formData.cadetails.webSiteURI}
          onChange={handleInputChange}
          placeholder="Website (if applicable):"
        />
        <br />

        <input
          className="input-user"
          name="cadetails.postalAddress.city"
          value={formData.cadetails.postalAddress.city}
          onChange={handleInputChange}
          placeholder="City:"
        />
        <br />

        <input
          className="input-user"
          name="cadetails.postalAddress.addressLine1"
          value={formData.cadetails.postalAddress.addressLine1}
          onChange={handleInputChange}
          placeholder="Street and number:"
        />
        <br />

        <input
          className="input-user"
          name="cadetails.postalAddress.postCode"
          value={formData.cadetails.postalAddress.postCode}
          onChange={handleInputChange}
          placeholder="Postcode:"
        />
        <br />

        <input
          className="input-user"
          name="cadetails.contactingDetails.contactPointName"
          value={formData.cadetails.contactingDetails.contactPointName}
          onChange={handleInputChange}
          placeholder="Contact person:"
        />
        <br />

        <input
          className="input-user"
          name="cadetails.contactingDetails.telephoneNumber"
          value={formData.cadetails.contactingDetails.telephoneNumber}
          onChange={handleInputChange}
          placeholder="Telephone:"
        />
        <br />

        <input
          className="input-user"
          name="cadetails.contactingDetails.emailAddress"
          value={formData.cadetails.contactingDetails.emailAddress}
          onChange={handleInputChange}
          placeholder="Email:"
        />
        <br />

        <header>Country</header>
        <select
                  className="select-countries"
                  onChange={handleChangeCountry}
                >
                  <option value="select">{formData.cadetails.cacountry}</option>
                  {countriesValue.map((item, i) => {
                    return (
                      <option className="option-countries" value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
      </form>


      <br />
      <br />
      <br />


      <form>
        <header>Information about the procurement procedure</header>
        <input
          className="input-user"
          name="cadetails.procurementProcedureTitle"
          value={formData.cadetails.procurementProcedureTitle}
          onChange={handleInputChange}
          placeholder="Title:"
        />
        <br />

        <textarea
          className="input-user textarea-user"
          name="cadetails.procurementProcedureDesc"
          value={formData.cadetails.procurementProcedureDesc}
          onChange={handleInputChange}
          placeholder="Short description:"
        />
        <br />

        <input
          className="input-user"
          name="cadetails.procurementProcedureFileReferenceNo"
          value={formData.cadetails.procurementProcedureFileReferenceNo}
          onChange={handleInputChange}
          placeholder="File reference number attributed by the contracting authority or contracting entity (if applicable):"
        />
        <br />

        <div className="button">
          <Button value={"Previous"} step={2} />
          <Button value={"Next"} step={2} />
        </div>
      </form>

    </div>
  );
}
