
// --- [ Text ] ---
export default function Text( { children, as = "p", ...props } ) {
  const Tag = as;
  return( <Tag { ...props }>{ children }</Tag> );
}
