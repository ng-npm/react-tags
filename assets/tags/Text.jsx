
// --- [ Text ] ---
export default function TagText( { children, tag = "p", ...props } ) {
  const Tag = tag;
  return( <Tag { ...props }>{ children }</Tag> );
}
