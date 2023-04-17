import { useCallback, useState } from "react";

const useToggle = (initialState:boolean = false):[boolean, any] => {
  const [stateToggle, setState] = useState<boolean>(initialState);
  const toggle = useCallback(() => setState((state: boolean) => !state), []);
  return [stateToggle, toggle];
};

export { useToggle };
