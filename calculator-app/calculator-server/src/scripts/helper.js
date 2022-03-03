const axios = require("axios");
const base_url = "http://www.dneonline.com/calculator.asmx?op=";
let req_config = {
  headers: { "Content-Type": "application/soap+xml" },
};

const requestCalculator = async ([intA, intB], query) => {
  let req_data = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <${query} xmlns="http://tempuri.org/">
          <intA>${intA}</intA>
          <intB>${intB}</intB>
        </${query}>
      </soap12:Body>
    </soap12:Envelope>`;

  try {
    const response = await axios.post(base_url + query, req_data, req_config);
    return { status: true, data: response.data };
  } catch (error) {
    return { status: false, data: error };
  }
};

module.exports = requestCalculator;
