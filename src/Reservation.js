import React, { useState } from 'react';

const Reservation = () => {
  const [hour, setHour] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [activity, setActivity] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [submittedData, setSubmittedData] = useState(null); // State to store submitted data

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const reservationData = {
      hour: parseInt(hour),
      day: parseInt(day),
      month: parseInt(month),
      year: parseInt(year),
      activity: activity
    };

    try {
      const response = await fetch("https://localhost:7277/addReservation", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData)
      });
      console.log(reservationData);

      if (!response.ok) {
        throw new Error('Failed to add reservation');
      }

      console.log('Reservation added');
      console.log(reservationData);
      setSubmittedData(reservationData); // Store submitted data
      setIsPending(false);
      // Handle successful reservation, maybe redirect or show a success message
    } catch (error) {
      console.error('Error adding reservation:', error);
      setError('Failed to add reservation');
      setIsPending(false);
    }
  }; 

  return (
    <div className="d-flex justify-content-center align-items-center bg-image vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Reservation</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields for hour, day, month, year, and activity */}
          {/* Error message if there is an error */}
          {/* Button to submit the form */}
          <div className="mb-3">
            <label htmlFor="hourInput"><strong>Hour</strong></label>
            <input
              type="text"
              id="hourInput"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              placeholder="Enter Hour"
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dayInput"><strong>Day</strong></label>
            <input
              type="text"
              id="dayInput"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="Enter Day"
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="monthInput"><strong>Month</strong></label>
            <input
              type="text"
              id="monthInput"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="Enter Month"
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="yearInput"><strong>Year</strong></label>
            <input
              type="text"
              id="yearInput"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter Year"
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="activityInput"><strong>Activity</strong></label>
            <input
              type="text"
              id="activityInput"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="Enter Activity"
              className="form-control rounded-0"
            />
          </div>
          {/* Display error message if exists */}
          {error && <p className="text-danger">{error}</p>}
          {!isPending && (
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Submit Reservation
            </button>
          )}
          {isPending && (
            <button type="button" className="btn btn-success w-100 rounded-0" disabled>
              Submitting...
            </button>
          )}
        </form>
        {/* Display submitted data */}
        {submittedData && (
          <div className="mt-3">
            <h3>Submitted Data:</h3>
            <p>Hour: {submittedData.hour}</p>
            <p>Day: {submittedData.day}</p>
            <p>Month: {submittedData.month}</p>
            <p>Year: {submittedData.year}</p>
            <p>Activity: {submittedData.activity}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservation;
