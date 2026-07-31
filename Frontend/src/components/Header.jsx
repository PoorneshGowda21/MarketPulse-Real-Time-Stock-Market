import React from "react";
import { Typography, Box } from "@mui/material";

const Header = ({ title = "Market Overview", subtitle }) => {
  const renderTitle = () => {
    if (typeof title === "string" && title.includes(" ")) {
      const words = title.split(" ");
      const first = words[0];
      const rest = words.slice(1).join(" ");
      return (
        <Typography
          variant="h4"
          fontWeight="900"
          sx={{
            fontSize: "26px",
            mb: 0.5,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#ffffff", fontWeight: "900" }}>{first} </span>
          <span style={{ color: "#60a5fa", fontWeight: "900" }}>{rest}</span>
        </Typography>
      );
    }
    return (
      <Typography
        variant="h4"
        fontWeight="900"
        sx={{
          color: "#ffffff",
          fontSize: "26px",
          mb: 0.5,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>
    );
  };

  return (
    <Box sx={{ mb: 2.5 }}>
      {renderTitle()}
      {subtitle && (
        <Typography
          variant="body2"
          sx={{
            color: "#4cceac",
            fontWeight: 600,
            fontSize: "14.5px",
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default Header;