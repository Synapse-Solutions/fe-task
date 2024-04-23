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
    <div className="container mx-auto text-black">
      <h1 className="text-3xl font-bold my-8">Payment</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("cardNumber")}
          placeholder="Card Number"
          className="my-2 p-2"
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
          className="my-2 p-2"
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
          className="my-2 p-2"
        />
        {errors?.cvv?.message && (
          <span className="text-red-500">{errors.cvv.message.toString()}</span>
        )}

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
