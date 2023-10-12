import React, { useState, useEffect } from "react";
import { FormContext } from "./FormContext";
import Button from "./Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";

export default function Finish() {
  const { testFormData } = React.useContext(FormContext);

  const [formData, setFormData] = testFormData;
  console.log("Finish is: ", formData);

  const [test, setTest] = useState(null);

  useEffect(() => {
    // POST request using fetch inside useEffect React hook

    const requestOptionsJSON = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    fetch(
      "http://localhost:8081/api/v2/espd/request/xml?language=EN",
      requestOptionsJSON
    )
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => setTest(data));

    // Save the updated formData back to the JSON file
    // I'm using a simple saveData function using localStorage:

    const saveData = (updatedData) => {
      localStorage.setItem("data", JSON.stringify(updatedData));
    };

    saveData(formData);
  }, [formData]);

  const handleDownload = () => {
    if (test) {
      const xmlString = new XMLSerializer().serializeToString(test);
      const blob = new Blob([xmlString], { type: "text/xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "espd-request-v2.xml";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <p>
        <h2 className="header-info main-header">Part V: Reduction of the number of qualified candidates</h2>
        <h4 className="sub-header">
          The economic operator should only provide information where the
          contracting authority or contracting entity has specified the
          objective and non discriminatory criteria or rules to be applied in
          order to limit the number of candidates that will be invited to tender
          or to conduct a dialogue. This information, which can be accompanied
          by requirements concerning the (types of) certificates or forms of
          documentary evidence, if any, to be produced, is set out in the
          relevant notice or in the procurement documents referred to in the
          notice. For restricted procedures, competitive procedures with
          negotiation, competitive dialogue procedures and innovation
          partnerships only:
        </h4>
        <h4 className="sub-header">
          Please select the following checkbox for restricted procedures,
          competitive procedures with negotiation, competitive dialogue
          procedures and innovation partnerships only, it doesn't concern open
          procedures
        </h4>

        <h2 className="header-info main-header">Part VI: Concluding statements</h2>
        <h4 className="sub-header">
          The undersigned formally declare that the information stated under
          Parts II - V above is accurate and correct and that it has been set
          out in full awareness of the consequences of serious
          misrepresentation. The undersigned formally declare to be able, upon
          request and without delay, to provide the certificates and other forms
          of documentary evidence referred to, except where: a) The contracting
          authority or contracting entity has the possibility of obtaining the
          supporting documentation concerned directly by accessing a national
          database in any Member State that is available free of charge (on
          condition that the economic operator has provided the necessary
          information (web address, issuing authority or body, precise reference
          of the documentation) allowing the contracting authority or
          contracting entity to do so. Where required, this must be accompanied
          by the relevant consent to such access), or b) As of 18 October 2018
          at the latest (depending on the national implementation of the second
          subparagraph of Article 59(5) of Directive 2014/24/EU), the
          contracting authority or contracting entity already possesses the
          documentation concerned. The undersigned formally consent to [identify
          the contracting authority or contracting entity as set out in Part I,
          Section A], gaining access to documents supporting the information,
          which has been provided in [identify the Part/Section/Point(s)
          concerned] of this European Single Procurement Document for the
          purposes of [identify the procurement procedure: (summary description,
          reference of publication in the Official Journal of the European
          Union, reference number)]. Date, place and, where required or
          necessary, signature(s):
        </h4>

        <h2 className="header-info main-header">Save</h2>
        <h4 className="sub-header">
          You can now click on 'Export' to download and save the ESPD file on
          your computer. Contracting authorities must ensure that this ESPD file
          is available to the economic operators alongside the other tender
          documents.
        </h4>
      </p>
      <div className="button">
        {console.log("Test is: ", test)}

        <Button value={"Previous"} step={5} />
        <br />
        <br />
      </div>
      <form>
        <button
          className="btn btn-success"
          onClick={handleDownload}
        >
          Download XML
        </button>
      </form>
    </div>
  );
}
