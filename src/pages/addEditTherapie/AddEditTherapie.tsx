import {
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { useEffect, useState } from "react";
import arrowback from "../../assets/images/arrow_left_alt.png";
import "./AddEditTherapie.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import save from "../../assets/images/save.png";
import { useNavigate } from "react-router-dom";
import forward from "../../assets/images/therapie/arrow_forward_ios.png";
import cancel from "../../assets/images/appNavigation/cancel.png";
import { Medecine } from "../../models/addEditTherapie.ts";
import { IContact } from "../../models/Contact.ts";

export function AddEditTherapie() {
  const [medication, setMedication] = useState<string>("");
  const [selectMedication, setSelectMedication] = useState<boolean>(false);
  const [selectedMedication, setSelectedMedication] = useState<string[]>([]);
  const [medecines, setMedecines] = useState<Medecine[]>([]);
  const [therapyName, setTherapyName] = useState<string>("");
  const [doctorName, setDoctorName] = useState<IContact[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [selectDoctor, setSelectDoctor] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    const selected = event.target.value as string;

    if (!selectedMedication.includes(selected)) {
      setSelectedMedication((prev) => [...prev, selected]);
      setSelectMedication(true);
    }
    setMedication("");
  };
  const handleDoctorChange = (event: SelectChangeEvent) => {
    const selected = event.target.value as string;
    const selectedDoctor = doctorName.find(
      (doctor) => doctor.name === selected
    );
    if (selectedDoctor) {
      setSelectDoctor(selected);
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchMedecines = async () => {
      try {
        const response = await fetch("http://localhost:3000/medicines");
        const data = await response.json();
        setMedecines(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching", error);
        setMedecines([]);
      }
    };
    fetchMedecines();
  }, []);

  useEffect(() => {
    const fetchDoctorName = async () => {
      try {
        const response = await fetch("http://localhost:3000/contacts");
        const data = await response.json();
        setDoctorName(data);
        console.log(data);
      } catch (error) {
        console.error("error fetching contact", error);
        setDoctorName([]);
      }
    };
    fetchDoctorName();
  }, []);

  const handleRemoveClick = (medicationToRemove: string) => {
    setSelectedMedication((prev) =>
      prev.filter((medication) => medication !== medicationToRemove)
    );
    if (selectedMedication.length <= 1) {
      setSelectMedication(false);
    }
  };

  useEffect(() => {
    if (therapyName && selectedMedication.length > 0 && doctorName) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [therapyName, selectedMedication, doctorName]);

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
            fontFamily="open sans"
            fontSize={14}
            fontWeight={700}
            fontStyle="normal"
          >
            New Therapy
          </Typography>
          <div>
            <TextField
              fullWidth
              required
              placeholder="therapy name"
              value={therapyName}
              onChange={(e) => setTherapyName(e.target.value)}
              error={!therapyName && !isFormValid}
              helperText={!isFormValid ? "therapy name is required" : ""}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      {selectMedication ? <img src={cancel} alt="" /> : null}
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
        </div>

        <div className="panel21">
          {selectMedication ? (
            <>
              <div className="medicationINformation">
                {selectedMedication.map((medication, index) => (
                  <div key={index} className="medicationinfName">
                    <div className="medicationinfNamecontent">
                      <Typography
                        fontSize={16}
                        fontWeight={700}
                        fontFamily="open sans"
                        fontStyle="normal"
                      >
                        {medication}
                      </Typography>

                      <img src={forward} alt="" height={24} width={24} />
                    </div>
                    <div className="medicationaction">
                      <div
                        className="medicationaction1"
                        onClick={() => handleRemoveClick(medication)}
                      >
                        <Typography
                          textTransform="uppercase"
                          fontFamily="opens sans"
                          fontWeight={700}
                          fontSize={14}
                          fontStyle="normal"
                          sx={{ color: "white", textAlign: "right" }}
                        >
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
                ))}
              </div>
              <Typography
                fontFamily="open sans"
                fontSize={14}
                fontWeight={700}
                fontStyle="normal"
              >
                select one or more medecines
              </Typography>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    search here your medication
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Medication"
                    placeholder="search here your medication"
                    onChange={handleChange}
                    className="selectButton"
                  >
                    {medecines.map((medecine) => {
                      return (
                        <MenuItem key={medecine.id} value={medecine.name}>
                          {medecine.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div>
                <Typography
                  className="typo1"
                  fontFamily="open sans"
                  fontSize={14}
                  fontWeight={700}
                  fontStyle="normal"
                >
                  Select a doctor
                </Typography>
                <div>
                  <FormControl fullWidth error={!doctorName && !isFormValid}>
                    <InputLabel id="demo-simple-select-label">
                      select a doctor
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="select a doctor"
                      placeholder="select a doctor"
                      onChange={handleDoctorChange}
                      className="selectButton"
                    >
                      {doctorName.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.name}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {!doctorName && !isFormValid && (
                      <FormHelperText>
                        Please select at least one doctor
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
              </div>

              <div className="panel21">
                <Typography
                  className="typo1"
                  fontFamily="open sans"
                  fontSize={14}
                  fontWeight={700}
                  fontStyle="normal"
                >
                  Notes
                </Typography>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Write your notes here"
                    variant="outlined"
                    multiline
                    rows={3}
                    fullWidth
                    className="notes"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="panel21">
              <Typography
                fontFamily="open sans"
                fontSize={14}
                fontWeight={700}
                fontStyle="normal"
              >
                select one or more medecines
              </Typography>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    search here your medication
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Medication"
                    placeholder="search here your medication"
                    onChange={handleChange}
                    className="selectButton"
                  >
                    {medecines.map((medecine) => {
                      return (
                        <MenuItem key={medecine.id} value={medecine.name}>
                          {medecine.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={
          selectMedication && isFormValid ? "saveButtonActive" : "saveButton"
        }
      >
        <Button
          disabled={!isFormValid}
          onClick={() => {
            console.log("therapy save");
          }}
        >
          <img src={save} alt="" height={24} width={24} />
          <Typography className="saveName">Save</Typography>
        </Button>
      </div>
    </div>
  );
}
