import React from 'react';

const Spinner = ({ message="Loading data...", size = "50px", color = "#007bff", thickness = "4px" }) => {
  const spinnerStyle = {
    display: "inline-block",
    width: size,
    height: size,
    border: `${thickness} solid ${color}`,
    borderRadius: "50%",
    borderTopColor: "transparent",
    animation: "spin 1s linear infinite"
  };

  return (
    <div>

    <div style={spinnerStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      

    </div>
    <p>{message}</p>
    </div>
  );
};

export default Spinner;
