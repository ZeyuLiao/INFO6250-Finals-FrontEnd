import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";
import { apiLH } from "../axios/api";

const validationSchema = Yup.object({
  flight_number: Yup.string()
    .required("Flight number is required.")
    .matches(/^\d{4}$/, "Flight number must be a four-digit number."),
  departure: Yup.string().required("Departure airport is required."),
  destination: Yup.string()
    .required("Destination airport is required.")
    .notOneOf(
      [Yup.ref("departure"), null],
      "Destination airport must be different from departure airport."
    ),
  departure_time: Yup.date().required("Departure time is required."),
  duration: Yup.number().required("Duration is required."),
  price: Yup.number().required("Price is required."),
  passengers: Yup.number().required("Number of passengers is required."),
});

const initialValues = {
  flight_number: "",
  departure: "",
  destination: "",
  departure_time: null,
  duration: "",
  price: "",
  available_seats: "",
  passengers: "0",
};

const airports = [
  { code: "PEK", name: "Beijing Capital International Airport" },
  { code: "PVG", name: "Shanghai Pudong International Airport" },
  { code: "HND", name: "Tokyo Haneda International Airport" },
  { code: "YYZ", name: "Toronto Pearson International Airport" },
  { code: "JFK", name: "New York JFK" },
  { code: "BOS", name: "Boston Logan International Airport" },
];

const LHAddFlight = () => {
  const navigate = useNavigate();

  return (
    <div className="container pt-5">
      <div className="modal-header p-5 pb-4 border-bottom-0">
        <h1 className="text-primary fw-bold mb-0 fs-2">Add Flight</h1>
        <Link
          to="/LHADmin"
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></Link>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          values.flight_number = "LH" + values.flight_number;
          apiLH
            .post("/outsideApi/addFlight", values)
            .then((response) => {
              window.alert("Flight added successfully.");
              setSubmitting(false);
              navigate(`/LHAdmin`);
            })
            .catch((error) => {
              window.alert(error);
              setSubmitting(false);
            });
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="container pt-5">
            <div className="mb-3 col-4">
              <label htmlFor="flight_number" className="form-label">
                Flight Number
              </label>
              <Field
                type="text"
                name="flight_number"
                id="flight_number"
                className={`form-control ${
                  touched.flight_number && errors.flight_number
                    ? "is-invalid"
                    : ""
                }`}
              />
              <ErrorMessage
                name="flight_number"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="mb-3 col-4">
              <label htmlFor="departure" className="form-label">
                Departure Airport
              </label>
              <Field
                as="select"
                name="departure"
                id="departure"
                className={`form-select ${
                  touched.departure && errors.departure ? "is-invalid" : ""
                }`}
              >
                <option value="">-- Select --</option>
                {airports.map((airport) => (
                  <option value={airport.code} key={airport.code}>
                    {airport.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="departure"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="mb-3 col-4">
              <label htmlFor="destination" className="form-label">
                Destination Airport
              </label>
              <Field
                as="select"
                name="destination"
                id="destination"
                className={`form-select ${
                  touched.destination && errors.destination ? "is-invalid" : ""
                }`}
              >
                <option value="">-- Select --</option>
                {airports
                  .filter((airport) => airport.code !== values.departure)
                  .map((airport) => (
                    <option value={airport.code} key={airport.code}>
                      {airport.name}
                    </option>
                  ))}
              </Field>
              <ErrorMessage
                name="destination"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="mb-3 col-4">
              <label htmlFor="departure_time" className="form-label">
                Departure Time
              </label>
              <DatePicker
                selected={values.departure_time}
                onChange={(date) => setFieldValue("departure_time", date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm"
                className={`form-control ${
                  touched.departure_time && errors.departure_time
                    ? "is-invalid"
                    : ""
                }`}
              />
              <ErrorMessage
                name="departure_time"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="mb-3 col-4">
              <label htmlFor="duration" className="form-label">
                Duration (in hours)
              </label>
              <Field
                type="number"
                name="duration"
                id="duration"
                className={`form-control ${
                  touched.duration && errors.duration ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="duration"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="mb-3 col-4">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <Field
                type="number"
                name="price"
                id="price"
                className={`form-control ${
                  touched.price && errors.price ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="price"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="mb-3 col-4">
              <label htmlFor="available_seats" className="form-label">
                Number of available_seats
              </label>
              <Field
                type="number"
                name="available_seats"
                id="available_seats"
                className={`form-control ${
                  touched.available_seats && errors.available_seats
                    ? "is-invalid"
                    : ""
                }`}
              />
              <ErrorMessage
                name="available_seats"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LHAddFlight;
