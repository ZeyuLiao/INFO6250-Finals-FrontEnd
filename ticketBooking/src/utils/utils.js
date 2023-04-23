import { Alert } from 'react-bootstrap';

function getAirlineName(code) {
  const airlines = [
    { code: "AC", name: "Air Canada" },
    { code: "EK", name: "Emirates" },
    { code: "CA", name: "Air China" },
    { code: "LH", name: "Lufthansa" },
    { code: "DL", name: "Delta Air Lines" },
  ];

  if (code == null) return "";
  const airline = airlines.find((airline) => airline.code === code.slice(0, 2));
  return airline ? airline.name : "";
}

const timeFormat = (time) => {
  const date = new Date(time);
  return date.toLocaleString();
};


function Banner({ message }) {
  return (
    <Alert variant="info">
      {message}
    </Alert>
  );
}


export { getAirlineName, timeFormat, Banner };
