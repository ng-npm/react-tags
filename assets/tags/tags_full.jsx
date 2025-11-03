// src/native-web/index.js
import React, { useState, useEffect, useRef } from "react";

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

// ===============================
// == UI Components (clb version)
// ===============================

// ---------- Button_clb ----------
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

// ---------- Card_clb ----------
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

// ---------- Input_clb ----------
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

// ---------- Textarea_clb ----------
export const Textarea_clb = ({ style, ...props }) => (
  <textarea
    {...props}
    style={{
      border: "1px solid #d1d5db",
      borderRadius: 6,
      padding: "8px 10px",
      fontSize: 15,
      resize: "vertical",
      minHeight: 80,
      outline: "none",
      ...style,
    }}
  />
);

// ---------- Select_clb ----------
export const Select_clb = ({ options = [], style, ...props }) => (
  <select
    {...props}
    style={{
      border: "1px solid #d1d5db",
      borderRadius: 6,
      padding: "8px 10px",
      fontSize: 15,
      background: "white",
      ...style,
    }}
  >
    {options.map((opt, i) => (
      <option key={i} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

// ---------- Modal_clb ----------
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

// ---------- Tooltip_clb ----------
export const Tooltip_clb = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: 6,
            background: "black",
            color: "white",
            padding: "4px 8px",
            borderRadius: 4,
            fontSize: 12,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

// ---------- Tabs_clb ----------
export const Tabs_clb = ({ tabs = [], active, onChange }) => (
  <div>
    <div style={{ display: "flex", gap: 8, borderBottom: "1px solid #e5e7eb" }}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          style={{
            padding: "8px 12px",
            borderBottom:
              active === tab.value ? "2px solid #0F62FE" : "2px solid transparent",
            fontWeight: active === tab.value ? 600 : 500,
            background: "none",
            cursor: "pointer",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
    <div style={{ marginTop: 12 }}>
      {tabs.find((t) => t.value === active)?.content}
    </div>
  </div>
);

// ---------- Accordion_clb ----------
export const Accordion_clb = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 6 }}>
      {items.map((item, i) => (
        <div key={i}>
          <div
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: 500,
              borderBottom: "1px solid #e5e7eb",
              background: openIndex === i ? "#f9fafb" : "white",
            }}
          >
            {item.title}
          </div>
          {openIndex === i && (
            <div style={{ padding: "10px 14px", background: "#f9fafb" }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ---------- Alert_clb ----------
export const Alert_clb = ({ variant = "default", title, description }) => {
  const colors = {
    default: "#f3f4f6",
    success: "#dcfce7",
    warning: "#fef9c3",
    destructive: "#fee2e2",
  };
  return (
    <div
      style={{
        background: colors[variant],
        borderRadius: 6,
        padding: 12,
        border: "1px solid #e5e7eb",
      }}
    >
      {title && <strong style={{ display: "block", marginBottom: 4 }}>{title}</strong>}
      <span>{description}</span>
    </div>
  );
};

// ---------- Badge_clb ----------
export const Badge_clb = ({ variant = "default", children }) => {
  const variants = {
    default: { background: "#e5e7eb", color: "#111827" },
    success: { background: "#dcfce7", color: "#166534" },
    warning: { background: "#fef9c3", color: "#854d0e" },
    destructive: { background: "#fee2e2", color: "#991b1b" },
  };
  return (
    <span
      style={{
        borderRadius: 9999,
        padding: "4px 8px",
        fontSize: 12,
        fontWeight: 500,
        ...variants[variant],
      }}
    >
      {children}
    </span>
  );
};

// ---------- Avatar_clb ----------
export const Avatar_clb = ({ src, alt, size = 40 }) => (
  <img
    src={src}
    alt={alt}
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      objectFit: "cover",
      border: "1px solid #e5e7eb",
    }}
  />
);

// ---------- Skeleton_clb ----------
export const Skeleton_clb = ({ width = "100%", height = 16, style }) => (
  <div
    style={{
      width,
      height,
      background: "linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)",
      backgroundSize: "200% 100%",
      borderRadius: 6,
      animation: "skeleton 1.5s infinite linear",
      ...style,
    }}
  />
);

// CSS for skeleton shimmer
const skeletonStyle = document.createElement("style");
skeletonStyle.innerHTML = `
@keyframes skeleton {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`;
document.head.appendChild(skeletonStyle);

// ---------- Separator_clb ----------
export const Separator_clb = ({ orientation = "horizontal" }) => (
  <div
    style={{
      width: orientation === "horizontal" ? "100%" : 1,
      height: orientation === "horizontal" ? 1 : "100%",
      background: "#e5e7eb",
      margin: orientation === "horizontal" ? "8px 0" : "0 8px",
    }}
  />
);

// ---------- Toast_clb ----------
export const Toast_clb = ({ message, open, duration = 3000 }) => {
  const [visible, setVisible] = useState(open);
  useEffect(() => {
    if(open) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [open]);
  if(!visible) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        background: "black",
        color: "white",
        padding: "8px 12px",
        borderRadius: 6,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        zIndex: 2000,
      }}
    >
      {message}
    </div>
  );
};
