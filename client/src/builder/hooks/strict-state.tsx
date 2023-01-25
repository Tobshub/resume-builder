import { useState } from "react";

export default function useStrictObjectArrayState<
  S extends { id: string }[]
>(initialState: S) {
  if (!Array.isArray(initialState)) {
    throw new Error("Type Error: State Must be An Array");
  }

  const [state, hardSetState] = useState(initialState);

  const push = <T extends S[0]>(item: T) => {
    hardSetState(state => {
      if (item) {
        // prevent duplicates
        if (state.find(one => one.id === item.id)) {
          return state;
        }
        state.push(item);
      }
      return [...state] as S;
    });
  };

  const excludeAndSet = <O extends S[0]>(
    property: "id",
    value: O["id"]
  ) => {
    hardSetState(state => {
      const filter = state.filter(val => val[property] !== value);
      return [...filter] as S;
    });
  };

  return [state, hardSetState, push, excludeAndSet] as const;
}
