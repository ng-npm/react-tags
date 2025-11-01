
// View.jsx
export default function TagView( { children, tag = "div", ...props } ) {
  const Tag = tag;
   return <Tag { ...props }>{ children }</Tag>;
}
