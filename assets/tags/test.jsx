

// test.jsx
import React, { useState } from "react";
import { createRoot } from "react-dom/client";

export const StatusBar = ({ style, backgroundColor }) => (
  <div
    style={{
      height: 56,
      backgroundColor: backgroundColor || "transparent",
    }}
  />
);

export const Card_clb = ({ children, style }) => (
  <div
    style={{
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      padding: 16,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Input_clb = ({ label, error, style, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    {label && <label style={{ fontSize: 14, fontWeight: 500 }}>{label}</label>}
    <input
      {...props}
      style={{
        border: "1px solid #d1d5db",
        borderRadius: 6,
        padding: "8px 10px",
        fontSize: 15,
        outline: "none",
        transition: "border-color 0.2s",
        ...style,
      }}
      onFocus={(e) => (e.target.style.borderColor = "#0F62FE")}
      onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
    />
    {error && <span style={{ color: "#DC2626", fontSize: 12 }}>{error}</span>}
  </div>
);

export const Modal_clb = ({ open, onClose, children }) => {
  if(!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: 8,
          padding: 20,
          maxWidth: 400,
          width: "90%",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const Button_clb = ({ variant = "default", size = "md", children, ...props }) => {
  const variants = {
    default: { background: "#0F62FE", color: "white", border: "1px solid transparent" },
    outline: { background: "transparent", color: "#0F62FE", border: "1px solid #0F62FE" },
    ghost: { background: "transparent", color: "#0F62FE", border: "none" },
    destructive: { background: "#DA1E28", color: "white", border: "1px solid transparent" }
  };
  const sizes = {
    sm: { padding: "6px 10px", fontSize: 14 },
    md: { padding: "8px 14px", fontSize: 15 },
    lg: { padding: "10px 18px", fontSize: 16 }
  };
  return (
    <button
      {...props}
      style={{
        borderRadius: 6,
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s",
        ...variants[variant],
        ...sizes[size],
      }}
    >
      {children}
    </button>
  );
};


function App() {
  const [ modalObserver, setModalObserver ] = useState( false );

  return( <>
    <StatusBar backgroundColor='#27f'/>
    <Card_clb>
      <p>oi</p>
      <Input_clb label="oi"/>
    </Card_clb>
    <Button_clb label='btn' onClick={ () => setModalObserver( !modalObserver ) }/>
    <Modal_clb open={ modalObserver }
      children={<>
        children
        <Button_clb onClick={ () => setModalObserver( !modalObserver ) }
          variant="default"
        />
      </>}
    />
  </> );
}

const appRoot = document.querySelector( "#app_root" );
if( appRoot ) {
  createRoot( appRoot ).render( <App /> );
} else {
  console.error( "appRoot not found" );
}

