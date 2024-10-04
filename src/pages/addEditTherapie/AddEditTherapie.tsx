import { Typography, TextField, Button, IconButton } from "@mui/material";
import { useState } from "react";
import arrowback from "../../assets/images/arrow_left_alt.png";
import "./AddEditTherapie.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { Medications } from "../medications/Medications";
import save from "../../assets/images/save.png";
import { useNavigate } from "react-router-dom";
import forward from "../../assets/images/therapie/arrow_forward_ios.png";

export function AddEditTherapie() {
  const [Medication, setMedication] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setMedication(event.target.value as string);
  };
  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="content">
      <div className="arrowback">
        <IconButton onClick={handleGoBack}>
          <img src={arrowback} alt="" />
        </IconButton>
      </div>

      <div className="panel2">
        <div className="panel21">
          <Typography
            className="typo1"
            fontFamily="open sans"
            fontSize={14}
            fontWeight={700}
            fontStyle="normal"
          >
            New Therapy
          </Typography>
          <div className="selectButton">
            <TextField
              id="outlined-basic"
              label="therapy name"
              variant="outlined"
              fullWidth
            />
          </div>
        </div>

        <div className="panel22">
          <Typography
            className="typo1"
            fontFamily="open sans"
            fontSize={14}
            fontWeight={700}
            fontStyle="normal"
          >
            {" "}
            select one or more medecinnes
          </Typography>
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {" "}
                Medication{" "}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Medication"
                onChange={handleChange}
                className="selectButton"
              >
                <MenuItem value="Diprivan">Diprivan</MenuItem>
                <MenuItem value="Drontal">Drontal</MenuItem>
                <MenuItem value="Drop SEPT">Drop SEPT</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="medicationINformation">
            <div className="medicationinfName">
              <div className="medicationinfNamecontent">
                <Typography
                  fontSize={16}
                  fontWeight={700}
                  fontFamily="open sans"
                  fontStyle="normal"
                >
                  {" "}
                  Drop SEPT
                </Typography>
                <img src={forward} alt="" height={24} width={24} />
              </div>
            </div>
            <div className="medicationaction">
              <div className="medicationaction1">
                <Typography
                  textTransform="uppercase"
                  fontFamily="opens sans"
                  fontWeight={700}
                  fontSize={14}
                  fontStyle="normal"
                  sx={{ color: "white", textAlign: "right" }}
                >
                  {" "}
                  REMOVE
                </Typography>
              </div>
              <div className="medicationaction1">
                <Typography
                  textTransform="uppercase"
                  fontFamily="opens sans"
                  fontWeight={700}
                  fontSize={14}
                  fontStyle="normal"
                  sx={{ color: "white", textAlign: "right" }}
                >
                  ADD PROGRAM
                </Typography>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="adddanothertherapie">
          <ControlPointOutlinedIcon />
          <Typography
            fontSize={14}
            fontWeight={200}
            fontStyle="normal"
            sx={{ color: "gray" }}
          >
            ADD ANOTHER MEDICATION{" "}
          </Typography>
        </div> */}
      </div>
      <div className="panel23">
        <div className="saveButton">
          <IconButton>
            <img src={save} alt="" height={24} width={24} />
            <Typography className="saveName">Save</Typography>
          </IconButton>
        </div>
      </div>
    </div>
  );
}
