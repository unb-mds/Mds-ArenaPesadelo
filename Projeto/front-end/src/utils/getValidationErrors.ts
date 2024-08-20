import { ValidationError } from "yup";

interface IErrors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): IErrors {
  const errors = err.inner.reduce<IErrors>(
    (acc, cur) => {
      const { name, message } = cur;

      acc[name] = message;

      return acc;
    },
    {}
  );

  return errors;
}
