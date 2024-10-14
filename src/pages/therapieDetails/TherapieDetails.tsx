import "./TherapieDetails.css";

import {
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
  Box,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import arroback from "../../assets/images/arrow_left_alt.png";
import menu from "../../assets/images/therapie/more_vert.png";
import arrowForward from "../../assets/images/therapie/arrow_forward_ios.png";
import stethoscope from "../../assets/images/contact/stethoscope.svg";
import Header from "../../components/header/Header.tsx";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Therapie } from "../../models/Therapie.ts";
import { Therapies } from "../therapies/Therapies.tsx";
import { IContact } from "../../models/Contact.ts";
import AddEditTherapie from "../addEditTherapie/AddEditTherapie.tsx";

export function TherapieDetails() {
  const [showOption, setShowOptions] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const optionsMenuRef = useRef<HTMLDivElement>(null);
  const [therapies, setTherapies] = useState<Therapie>({
    id: 1,
    name: "conjunctivitis",
    userId: 2,
    contact: 6,
    notes: "hard therapie",
  });

  const [doctor, setDoctor] = useState<IContact>({
    id: 1,
    name: "albert",
    notes: "this is a note",
    qualification: "Dr",
    profession: "genycologue",
    phone: "kskcak",
    email: "ajcsj",
    address: "jscks",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { value } = location.state;

  const getTherapie = async (id: number) => {
    try {
      const result = await fetch(`http://localhost:3000/therapies?id=${id}`);

      const data = await result.json();
      setTherapies(data[0]);
      getContact(data[0].contact);
    } catch (error) {
      console.error("error fetching", error);
    }
  };
  const getContact = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/contacts?id=${id}`);
      const data = await response.json();
      setDoctor(data[0]);
    } catch (error) {
      console.error("eror fetching", error);
    }
  };
  useEffect(() => {
    getTherapie(value);
  }, []);

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsMenuRef.current &&
        !optionsMenuRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    if (showOption) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOption]);

  const handleRightButtonClick = () => {
    setShowOptions((prev) => !prev);
  };
  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate("/Therapies");
    } else {
      navigate("/");
    }
  };
  const handleEdit = () => {
    optionsMenuRef;
    navigate("/Therapies/addEditTherapie");
  };

  return (
    <div>
      <Header
        showBackButton
        title={therapies.name}
        showRightButton
        onBackButtonClick={handleGoBack}
        onRightButtonClick={handleRightButtonClick}
      />
      {showOption && (
        <>
          <div className="optionsMenu" ref={optionsMenuRef}>
            <Button onClick={handleEdit}>
              {" "}
              <EditIcon /> edit
            </Button>
            <Button onClick={handleDeleteClick}>
              {" "}
              <ClearIcon /> delete
            </Button>
          </div>
          <div>
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              PaperProps={{
                style: {
                  minHeight: "200px",
                  maxHeight: "400px",
                  width: "300px",
                },
              }}
              className="dialogAlert"
            >
              <div className="image">
                <ReportGmailerrorredIcon />
              </div>
              <DialogTitle id="alert-dialog-title">
                {"Deletion Confirmation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you really want to delete this contact? All entered data
                  will be lost and cannot be recovered.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>
                  {" "}
                  <ChevronLeftIcon /> Back
                </Button>
                <Button
                  onClick={handleCloseDialog}
                  autoFocus
                  style={{ color: "red" }}
                >
                  <ClearIcon style={{ height: 24 }} /> Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </>
      )}

      <div className="panelElement">
        <Typography
          fontFamily="open sans"
          fontSize={16}
          fontWeight={700}
          fontStyle="normal"
        >
          Medecines
        </Typography>
        <div className="medecineName">
          <Typography>Drop sept</Typography>
          <IconButton type="button" sx={{ p: "10px" }} aria-label="arrowBack">
            <img src={arrowForward} alt="arrowForward icon" />
          </IconButton>
        </div>

        <Divider style={{ color: "black" }}></Divider>

        <Typography
          fontFamily="open sans"
          fontSize={16}
          fontWeight={700}
          fontStyle="normal"
        >
          {" "}
          Doctor
        </Typography>
        <div className="doctorDetails">
          <IconButton type="button" sx={{ p: "10px" }} aria-label="stethoscope">
            <img src={stethoscope} alt="stethoscope icon" />
          </IconButton>

          <div className="contactName">
            <Typography
              sx={{ fontSize: 17, fontWeight: 700 }}
              className="typography1"
            >
              {doctor.name}
            </Typography>
          </div>

          <IconButton type="button" sx={{ p: "10px" }} aria-label="arrowBack">
            <img src={arrowForward} alt="arrowForward icon" />
          </IconButton>
        </div>

        <Typography
          className="typo1"
          fontFamily="open sans"
          fontSize={16}
          fontWeight={700}
          fontStyle="normal"
        >
          Notes
        </Typography>
        <div>
          <Box className="notes" >
             {therapies.notes} </Box>
        </div>
      </div>
    </div>
  );
}
