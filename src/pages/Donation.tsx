import { useFormik } from "formik";
import { z } from "zod";

// Define the Zod schema
const schema = z.object({
  name: z.string().min(2, "Name is required"),
  contactNumber: z.string().optional().nullable(),
  amount: z
    .number({ required_error: "Amount is required" })
    .positive("Amount must be positive"),
  province: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  file: z.string().optional(),
});
type donationFormValues = z.infer<typeof schema>;

const Donation = () => {
  const validate = (values: donationFormValues) => {
    try {
      schema.parse(values);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.flatten().fieldErrors;
      }
      throw error;
    }
  };

  const formik = useFormik<donationFormValues>({
    initialValues: {
      name: "",
      contactNumber: "",
      amount: 0,
      province: "",
      city: "",
      postalCode: "",
      file: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      console.log("Submitted Values:", values);
      resetForm();
    },
  });

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <form className="w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
        {/* Name */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className={`block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 ${
              formik.errors.name ? "border-red-500" : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-blue-600"
          >
            Name
          </label>
          {formik.errors.name && (
            <div className="text-red-500">{formik.errors.name}</div>
          )}
        </div>

        {/* Contact Number */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="contactNumber"
            placeholder="03000000000"
            value={formik.values.contactNumber ?? ""}
            onChange={formik.handleChange}
            className={`block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 ${
              formik.errors.contactNumber ? "border-red-500" : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          />

          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-blue-600">
            Contact Number
          </label>
          {formik.errors.contactNumber && (
            <div className="text-red-500">{formik.errors.contactNumber}</div>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="file"
            name="file"
            placeholder=""
            value={formik.values.file ?? ""}
            onChange={formik.handleChange}
            className={`block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 ${
              formik.errors.contactNumber ? "border-red-500" : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          />

          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-blue-600">
            Image
          </label>
          {formik.errors.contactNumber && (
            <div className="text-red-500">{formik.errors.contactNumber}</div>
          )}
        </div>

        {/* Province */}
        <div className="relative z-0 w-full mb-5 group">
          <select
            name="province"
            value={formik.values.province}
            onChange={formik.handleChange}
            className={`block appearance-none py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 ${
              formik.errors.province ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
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
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-blue-600">
            Province
          </label>
          {formik.errors.province && (
            <div className="text-red-500">{formik.errors.province}</div>
          )}
        </div>

        {/* City */}
        <div className="relative z-0 w-full mb-5 group">
          <select
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            className={`block appearance-none py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 ${
              formik.errors.city ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          >
            <option value="">Select City</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Gujranwala">Gujranwala</option>
            <option value="Gujrat">Gujrat</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Peshawar">Peshawar</option>
          </select>
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-blue-600">
            City
          </label>
          {formik.errors.city && (
            <div className="text-red-500">{formik.errors.city}</div>
          )}
        </div>

        {/* Postal Code */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="postalCode"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            className={`block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 ${
              formik.errors.postalCode ? "border-red-500" : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-blue-600">
            Postal Code
          </label>
          {formik.errors.postalCode && (
            <div className="text-red-500">{formik.errors.postalCode}</div>
          )}
        </div>

        {/* Amount */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            className={`block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 ${
              formik.errors.amount ? "border-red-500" : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-blue-600">
            Amount
          </label>
          {formik.errors.amount && (
            <div className="text-red-500">{formik.errors.amount}</div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Donation;
