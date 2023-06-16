import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0EA5E9",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 150;

export default function MinimumDistanceSlider(props) {
  const [value1, setValue1] = React.useState([props.minVal, props.maxVal]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  return (
    <div className="flex  items-center rounded-lg bg-white border border-gray-300 p-5 font-Nunito">
      <div className="">
        <div className="flex flex-row justify-between">
          <p className="font-semibold">{value1[0] + " kr."}</p>
          <p className="font-semibold">{value1[1] + " kr."}</p>
        </div>

        <div>
          <ThemeProvider theme={theme}>
            <Box sx={{ width: 200 }}>
              <Slider
                getAriaLabel={() => "Minimum distance"}
                value={value1}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                min={props.minval}
                max={props.maxVal}
              />
            </Box>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
