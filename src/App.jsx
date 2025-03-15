import React from 'react';
import { useForm } from 'react-hook-form';

const validCustomerIds = ["customer123", "customer456"]; // Example valid IDs

const App = ({ customerId }) => {
  // Check if the provided customerId is valid.
  const isValidCustomer = validCustomerIds.includes(customerId);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Appointment booked:", data);
    alert("Appointment booked! Check console for details.");
  };

  if (!isValidCustomer) {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h2>Error</h2>
        <p>Invalid Customer ID. Please contact support.</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name: </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span style={{ color: 'red' }}>{errors.name.message}</span>
          )}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Appointment Date: </label>
          <input
            type="date"
            {...register("appointmentDate", {
              required: "Appointment date is required",
              validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate > today || "Appointment date must be in the future";
              }
            })}
          />
          {errors.appointmentDate && (
            <span style={{ color: 'red' }}>{errors.appointmentDate.message}</span>
          )}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && (
            <span style={{ color: 'red' }}>{errors.email.message}</span>
          )}
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default App;
