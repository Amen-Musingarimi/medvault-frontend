import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPatients } from '../../redux/patientsSlice';
import classes from './AssessPatient.module.css';

const PatientAssessmentForm = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.pat.patients);

  // console.log(patients);
  const initialFormData = {
    patient: '',
    temperature: '',
    bloodPressure: '',
    weight: '',
    reasonForVisit: '',
    currentSymptoms: '',
    pastMedicalHistory: '',
    previousTestResults: '',
    currentMedications: '',
    lifestyleAndHabits: '',
    familyMedicalHistory: '',
    diagnosis: '',
    prescription: '',
    recommendedTests: '',
    referral: '',
    checkupDate: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [input, setInput] = useState('');
  const [patientSearchResult, setPatientSearchResult] = useState([]);

  const handleSearchChange = (value) => {
    setInput(value);
    dispatch(fetchPatients());

    const searchResult = patients.filter((patient) => {
      return (
        value &&
        patient &&
        patient.firstName &&
        patient.firstName.toLowerCase().includes(value.toLowerCase())
      );
    });

    console.log(searchResult);
    setPatientSearchResult(searchResult);
  };

  const handleSearchResultClick = (patient) => {
    // Set the selected patient ID in the form data
    setFormData((prevState) => ({
      ...prevState,
      patient: patient._id,
      // Populate other fields with patient details
      // Example: If you have a field named firstName in the form data, you can populate it like this:
      firstName: patient.firstName,
      lastName: patient.lastName,
      // Populate other fields accordingly
    }));

    // Set the input field value with the clicked patient's details
    setInput(`${patient.firstName} ${patient.lastName} ${patient.idNumber}`);
    setPatientSearchResult([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    console.log(formData);
    // Dispatch action to create patient assessment
    // dispatch(createPatientAssessment(formData));
    // Reset form data
    setFormData(initialFormData);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className={classes.patient_assessment_form}>
      <div className={classes.personal_details}>
        <h2 className={classes.form_section_heading}>Patient Assessment</h2>
        <div className={classes.personal_details_inputs}>
          <div className={classes.form_control}>
            <label className={classes.input_label}>Patient:</label>
            <input
              type="text"
              name="patient"
              placeholder="Select Patient. Enter Patient ID..."
              value={input}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={classes.input_area}
            />
            <div className={classes.search_result_container}>
              {patientSearchResult.map((patient) => (
                <div
                  className={classes.search_result}
                  onClick={() => handleSearchResultClick(patient)}
                  key={patient._id}
                >
                  {patient.firstName} {patient.lastName} {patient.idNumber}
                </div>
              ))}
            </div>
          </div>
          <div className={classes.form_control}>
            <label className={classes.input_label}>Temperature:</label>
            <input
              type="text"
              name="temperature"
              placeholder="Enter temperature..."
              value={formData.temperature}
              onChange={handleChange}
              className={classes.input_area}
            />
          </div>
          <div className={classes.form_control}>
            <label className={classes.input_label}>Blood Pressure:</label>
            <input
              type="text"
              name="bloodPressure"
              placeholder="Enter blood pressure..."
              value={formData.bloodPressure}
              onChange={handleChange}
              className={classes.input_area}
            />
          </div>
          <div className={classes.form_control}>
            <label className={classes.input_label}>Weight:</label>
            <input
              type="decimal"
              name="weight"
              placeholder="Enter weight..."
              value={formData.weight}
              onChange={handleChange}
              className={classes.input_area}
            />
          </div>
          <div className={classes.form_control}>
            <label className={classes.input_label}>Reason for Visit:</label>
            <textarea
              name="reasonForVisit"
              placeholder="Enter reason for visit..."
              value={formData.reasonForVisit}
              onChange={handleChange}
              className={classes.input_area}
            />
          </div>
          <div className={classes.form_control}>
            <label className={classes.input_label}>Current Symptoms:</label>
            <textarea
              name="currentSymptoms"
              placeholder="Describe current symptoms..."
              value={formData.currentSymptoms}
              onChange={handleChange}
              className={classes.input_area}
            />
          </div>
          <div className={classes.form_control}>
            <label className={classes.input_label}>Past Medical History:</label>
            <textarea
              name="pastMedicalHistory"
              placeholder="Enter past medical history..."
              value={formData.pastMedicalHistory}
              onChange={handleChange}
              className={classes.input_area}
            />
          </div>
          <div className={classes.form_control}>
            <label className={classes.input_label}>
              Previous Test Results:
            </label>
            <textarea
              name="previousTestResults"
              placeholder="Enter previous test results..."
              value={formData.previousTestResults}
              onChange={handleChange}
              className={classes.input_area}
            />
          </div>
          <div className={classes.form_control}>
            <label className={classes.input_label}>Current Medications:</label>
            <textarea
              name="currentMedications"
              placeholder="Enter current medications..."
              value={formData.currentMedications}
              onChange={handleChange}
              className={classes.input_area}
            />
          </div>
          <div className={classes.form_control}>
            <label className={classes.input_label}>Lifestyle and Habits:</label>
            <textarea
              name="lifestyleAndHabits"
              placeholder="Enter lifestyle and habits..."
              value={formData.lifestyleAndHabits}
              onChange={handleChange}
              className={classes.input_area}
            />
          </div>
          <div className={classes.form_control}>
            <label className={classes.input_label}>
              Family Medical History:
            </label>
            <textarea
              name="familyMedicalHistory"
              placeholder="Enter family medical history..."
              value={formData.familyMedicalHistory}
              onChange={handleChange}
              className={classes.input_area}
            />
          </div>
          <div className={classes.form_control}>
            <label className={classes.input_label}>Diagnosis:</label>
            <textarea
              name="diagnosis"
              placeholder="Enter diagnosis..."
              value={formData.diagnosis}
              onChange={handleChange}
              className={classes.input_area}
            />
          </div>

          <div className={classes.form_control}>
            <label className={classes.input_label}>Recommended Tests:</label>
            <textarea
              name="recommendedTests"
              placeholder="Enter recommended tests..."
              value={formData.recommendedTests}
              onChange={handleChange}
              className={classes.input_area}
            />
          </div>
          <div className={classes.form_control}>
            <label className={classes.input_label}>Prescription:</label>
            <textarea
              name="prescription"
              placeholder="Enter prescribed medications..."
              value={formData.prescription}
              onChange={handleChange}
              className={classes.input_area}
            />
          </div>
          <div className={classes.form_control}>
            <label className={classes.input_label}>Refer To Specialist:</label>
            <input
              type="text"
              name="referral"
              placeholder="Enter specialist name and select..."
              value={formData.referral}
              onChange={handleChange}
              className={classes.input_area}
            />
          </div>
          <div className={classes.form_control}>
            <label className={classes.input_label}>Schedule a Checkup:</label>
            <input
              type="datetime-local"
              name="checkupDate"
              value={formData.checkupDate}
              onChange={handleChange}
              className={classes.input_area}
            />
          </div>
        </div>
      </div>
      <button type="submit" className={classes.submit_btn}>
        Submit Assessment
      </button>
    </form>
  );
};

export default PatientAssessmentForm;
