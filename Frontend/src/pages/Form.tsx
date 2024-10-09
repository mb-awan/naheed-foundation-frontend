// DonationForm.tsx

import React from "react";
import { useFormik } from "formik";
import { z } from "zod";

// Define the form values type
type FormValues = {
  name: string;
  contactNumber?: number | null;
  amount: number;
  province: string;
  city: string;
  postalCode?: string;
};

// Define the Zod schema
const schema = z.object({
  name: z.string().min(2, "Name is required"),
  contactNumber: z.number().optional().nullable(),
  amount: z
    .number({ required_error: "Amount is required" })
    .positive("Amount must be positive"),
  province: z.string().nonempty("Province is required"),
  city: z.string().nonempty("City is required"),
  postalCode: z.string().optional(),
});

const Form: React.FC = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      contactNumber: null,
      amount: 0,
      province: "",
      city: "",
      postalCode: "",
    },
    validate: (values) => {
      try {
        schema.parse(values);
        return {};
      } catch (error) {
        if (error instanceof z.ZodError) {
          return error.flatten().fieldErrors; // Adjust type as needed
        }
        throw error;
      }
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values); // Log the values
      resetForm(); // Reset the form
    },
  });

  return (
    <div className="donation-form">
      <h2>Donation Form</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>

        <div>
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="number"
            name="contactNumber"
            id="contactNumber"
            value={formik.values.contactNumber ?? ""}
            onChange={formik.handleChange}
          />
        </div>

        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
          />
          {formik.errors.amount && (
            <div className="error">{formik.errors.amount}</div>
          )}
        </div>

        <div>
          <label htmlFor="province">Province</label>
          <select
            name="province"
            id="province"
            value={formik.values.province}
            onChange={formik.handleChange}
          >
            <option value="">Select Province</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
            <option value="Balochistan">Balochistan</option>
            <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
            <option value="Azad Jammu & Kashmir">Azad Jammu & Kashmir</option>
            <option value="Islamabad">Islamabad</option>
          </select>
          {formik.errors.province && (
            <div className="error">{formik.errors.province}</div>
          )}
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
          />
          {formik.errors.city && (
            <div className="error">{formik.errors.city}</div>
          )}
        </div>

        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
          />
        </div>

        <button type="submit">Submit Donation</button>
      </form>
    </div>
  );
};

export default Form;
