
// View.jsx
export function View( { children, as = "div", ...props } ) {
   const Element = as;
   return <Element { ...props }>{ children }</Element>;
}

export function Text( { children, as = "span", ...props } ) {
   const ELement = as;
   return <Element { ...props }>{ children }</Element>;
}
