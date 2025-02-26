"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import authStore from "@/app/store/AuthStore";

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const router = useRouter();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  };

  const validationSchema = [
    Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    Yup.object({
      phone: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
    }),
  ];

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      await authStore.signup(values.email, values.password, values.name, values.phone, values.address);
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
    setSubmitting(false);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <div className="mt-6 text-center">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                  Step {step} of 2
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
              <div
                style={{ width: `${(step / 2) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema[step - 1]}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                {step === 1 && (
                  <>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="mt-1">
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <div className="mt-1">
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="mt-1 relative">
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="new-password"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <div className="mt-1 relative">
                        <Field
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          autoComplete="new-password"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="mt-1">
                        <Field
                          id="phone"
                          name="phone"
                          type="text"
                          autoComplete="phone"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <div className="mt-1">
                        <Field
                          id="address"
                          name="address"
                          type="text"
                          autoComplete="address"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>
                  </>
                )}

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex justify-between">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Previous
                    </button>
                  )}
                  {step < 2 && (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Next
                    </button>
                  )}
                  {step === 2 && (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign up
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center">
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;