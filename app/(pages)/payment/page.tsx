"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Invalid card number"),
  expiry: z.string().length(5, "Invalid expiry date"),
  cvv: z.string().length(3, "Invalid CVV"),
});

const PaymentPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    try {
      paymentSchema.parse(data);
      alert("Payment successful");
    } catch (error) {
      const parsedError = error as { errors: { message: string }[] };
      alert(parsedError.errors[0].message);
    }
  };

  return (
    <div className="container mx-auto text-black flex flex-col w-full h-screen items-center justify-center">
      <h1 className="text-3xl font-bold my-8 text-center">Payment</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <input
          type="text"
          {...register("cardNumber")}
          placeholder="Card Number"
          className="my-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
        {errors?.cardNumber?.message && (
          <span className="text-red-500">
            {errors.cardNumber.message.toString()}
          </span>
        )}

        <input
          type="text"
          {...register("expiry")}
          placeholder="Expiry (MM/YY)"
          className="my-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
        {errors?.expiry?.message && (
          <span className="text-red-500">
            {errors.expiry.message.toString()}
          </span>
        )}

        <input
          type="text"
          {...register("cvv")}
          placeholder="CVV"
          className="my-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
        {errors?.cvv?.message && (
          <span className="text-red-500">{errors.cvv.message.toString()}</span>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-3 px-6 mt-6 w-full rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
