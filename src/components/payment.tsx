import React from "react";
import { usePaystackPayment } from "react-paystack";

type Props = {
  configs: { amount: number; email?: string };
  children: any;
  disabled?: boolean;
  onSuccess: (reference) => void;
  onClose: () => void;
};

function Payment(Props: Props) {
  const config = {
    reference: new Date().getTime().toString(),
    publicKey: "pk_test_859b6f03960efb1702afcd149d483ac8a7a2ac95",
  };
  const allConfig: any = { ...config, ...Props.configs };
  const initializePayment = usePaystackPayment(allConfig);
  return (
    <div onClick={() => initializePayment(Props.onSuccess, Props.onClose)}>
      {Props.children}
    </div>
  );
}

export default Payment;
