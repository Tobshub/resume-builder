import { useState } from "react";

export default function useFormErrors<T extends string>(
  ...fields: { name: T; errorState: boolean }[]
) {
  const [errorState, setErrorState] = useState(fields);

  const updateErrorState = (name: T, newState: boolean) => {
    const index = errorState.findIndex((field) => field.name === name);
    if (index !== undefined && errorState[index].errorState !== newState) {
      errorState[index] = { name, errorState: newState };
      setErrorState([...errorState]);
    }
  };

  const getErrorState = (name: T) => {
    const field = errorState.find((field) => field.name === name);
    return field;
  };

  return [getErrorState, updateErrorState] as const;
}
