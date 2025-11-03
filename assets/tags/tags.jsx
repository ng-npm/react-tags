
// src/native-web/index.js
import React, { useState } from "react";

// ==-==-==-==-== Layout ==-==-==-==-==
export function View( { style, children, as = "div", ...props } ) {
   const Element = as;
   return(
      <Element style={{ display: "flex", ...style }} { ...props }>
         { children }
      </Element>
   );
};

export const SafeAreaView = ({ style, children, ...props }) => (
  <div style={{ padding: "env(safe-area-inset)", ...style }} {...props}>
    {children}
  </div>
);

export const ScrollView = ({ style, children, ...props }) => (
  <div
    style={{ overflowY: "auto", maxHeight: "100%", ...style }}
    {...props}
  >
    {children}
  </div>
);

export const FlatList = ({ data = [], renderItem, keyExtractor }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    {data.map((item, index) => (
      <div key={keyExtractor ? keyExtractor(item, index) : index}>
        {renderItem({ item, index })}
      </div>
    ))}
  </div>
);

// ========== Texto ==========
export const Text = ( { style, children, as = "span", ...props } ) => {
   const Element = as;
   return(
      <Element style={{ fontFamily: "sans-serif", ...style }} { ...props }>
         { children }
      </Element>
   );
};

// ========== Mídia ==========
export const Image = ({ source, style, ...props }) => {
  const src = source?.uri || source;
  return <img src={src} style={{ maxWidth: "100%", ...style }} {...props} />;
};

export const Video = ({ source, style, controls = true, ...props }) => {
  const src = source?.uri || source;
  return (
    <video
      src={src}
      style={{ maxWidth: "100%", ...style }}
      controls={controls}
      {...props}
    />
  );
};

// ========== Interações ==========
export const Pressable = ({ onPress, style, children, ...props }) => {
  const [pressed, setPressed] = useState(false);

  // Se style for função, chamamos com { pressed }
  const resolvedStyle =
    typeof style === "function" ? style({ pressed }) : style;

  return (
    <button
      onClick={onPress}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
        opacity: pressed ? 0.6 : 1,
        transition: "opacity 0.15s, background-color 0.15s",
        ...resolvedStyle,
      }}
      {...props}
    >
      {typeof children === "function" ? children({ pressed }) : children}
    </button>
  );
};

export const Button = ({ title, onPress, style, ...props }) => (
  <button
    onClick={onPress}
    style={{
      background: "#007AFF",
      color: "white",
      border: "none",
      borderRadius: 6,
      padding: "10px 16px",
      cursor: "pointer",
      fontWeight: "bold",
      ...style,
    }}
    {...props}
  >
    {title}
  </button>
);

// ========== Entrada ==========
export const TextInput = ({ value, onChangeText, style, ...props }) => (
  <input
    value={value}
    onChange={(e) => onChangeText && onChangeText(e.target.value)}
    style={{ padding: "6px 8px", ...style }}
    {...props}
  />
);

export const Switch = ({ value, onValueChange, style, ...props }) => (
  <input
    type="checkbox"
    checked={value}
    onChange={(e) => onValueChange && onValueChange(e.target.checked)}
    style={style}
    {...props}
  />
);

// ========== Extras ==========
export const ActivityIndicator = ({ size = 24, color = "#007AFF", style }) => (
  <div
    style={{
      width: size,
      height: size,
      border: `${size / 8}px solid #ccc`,
      borderTop: `${size / 8}px solid ${color}`,
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      ...style,
    }}
  />
);

export const StatusBar = ({ style, backgroundColor }) => (
  <div
    style={{
      height: 24,
      backgroundColor: backgroundColor || "transparent",
    }}
  />
);

// CSS para ActivityIndicator
const styleEl = document.createElement("style");
styleEl.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(styleEl);

