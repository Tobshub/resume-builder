import { useState } from "react";

export default function useStrictStateArray<
  S extends ({ id: string } | string)[]
>(initialState: S) {
  if (!Array.isArray(initialState)) {
    throw new Error("Type Error: State Must be An Array");
  }

  const [state, hardSetState] = useState(initialState);

  const push = <T extends S[0]>(item: T) => {
    hardSetState(state => {
      if (item) {
        if (
          state.find(one => JSON.stringify(one) === JSON.stringify(item))
        ) {
          return state;
        }
        state.push(item);
      }
      return [...state] as S;
    });
  };

  const excludeAndSet = <O extends S[0]>(
    property: "id" | undefined,
    value: O
  ) => {
    hardSetState(state => {
      const filter = state.filter(val => {
        if (typeof val === "object" && property && property in val) {
          return val[property] !== value;
        } else {
          return val !== value;
        }
      });

      return [...filter] as S;
    });
  };

  return [state, hardSetState, push, excludeAndSet] as const;
}
