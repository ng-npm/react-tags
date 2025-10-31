
// --- [ useRef ] --- 
import { useRef } from "react";

export function UseRef() {
  const inputRef = useRef( null );

  function handleFocus() {
    inputRef.current.focus();
  }

  return( <>
    <input type="text" ref={ inputRef } value=""/>
    <button onClick={ handleFocus }>Focus input</button>
  </> );
}
