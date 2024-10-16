import { Typography, Button, IconButton, TextField } from "@mui/material";
import "./Program.css";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as React from "react";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LoadingButton from "@mui/lab/LoadingButton";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

import SaveIcon from "@mui/icons-material/Save";

import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

function Program() {
  const navigate = useNavigate();
  const [date, setDate] = React.useState<Dayjs | null>(dayjs("mm/dd/yyyy"));
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs("mm/dd/yyyy")
  );
  const [isDateValid, setIsDateValid] = useState<boolean>(true);
  const [showReminder, setShowReminder] = useState<boolean>(false);
  const [reminders, setReminders] = useState<Dayjs[]>([]);
  const [loading, setLoading] = React.useState(true);

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    }
  };
  const handleReminderShow = () => {
    setShowReminder(true);
    setReminders([...reminders, dayjs()]);
  };

  const handleTimeChange = (newTime: Dayjs, index: number)=> {
    const updateReminders = [...reminders];
    updateReminders[index] = newTime;
    setReminders(updateReminders);
  }


  const validateDates = (startDate: Dayjs | null, endDate: Dayjs | null) => {
    if (startDate && endDate && endDate.isSameOrAfter(startDate)) {
      setIsDateValid(true);
    } else {
      setIsDateValid(false);
    }
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
    validateDates(newValue, endDate);
  };

  const handleEndDateChange = (newVaue: Dayjs | null) => {
    setEndDate(newVaue);
    validateDates(date, newVaue);
  };

  const today = dayjs();
  const tomorrow = dayjs().add(1, "day");
  const savePrescription = () => {
    const prescription = {
        startDate: date?.format("MM/DD/YYYY"),
        endDate: endDate?.format("MM/DD/YYYY"),
        reminders: reminders.map((reminder)=> reminder.format("HH:mm")),
    };
    const existingPrescription = JSON.parse(localStorage.getItem("prescriptions") || "[]");
    existingPrescription.push(prescription);
    localStorage.setItem("prescriptions", JSON.stringify(existingPrescription));

    setLoading(false)
    alert("Prescription Save")

  }
  const handleClick = () => {
    setLoading(true);
    savePrescription()
  }

 

  return (
    <div className="addProgram">
      <Header
        showBackButton
        title="Drop SEPT"
        onBackButtonClick={handleGoBack}
      />

      <div className="programContent">
        <div className="programDate">
          <Typography> What is the duration of the therapy?</Typography>
          <div className="DateReturn">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["MobileDatePicker", "MobileDatePicker"]}
                sx={{ width: "100%" }}
              >
                <div className="programItem">
                  <div className="date">
                    <DemoItem sx={{ width: "100%" }}>
                      <MobileDatePicker
                        label="start Date"
                        value={date}
                        defaultValue={today}
                        minDate={today}
                        onChange={handleDateChange}
                        sx={{ width: "100%" }}
                      />
                    </DemoItem>
                  </div>
                  <div className="date">
                    <DemoItem sx={{ width: "100%" }}>
                      <MobileDatePicker
                        label="End Date"
                        defaultValue={tomorrow}
                        minDate={date || tomorrow}
                        value={endDate}
                        onChange={handleEndDateChange}
                        sx={{ width: "100%" }}
                      />
                    </DemoItem>
                  </div>
                </div>
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
        <div className="programTime">
          <Typography>How often do you have to take this medicine?</Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["MobileTimePicker"]}
              sx={{ width: "100%" }}
            >
              <div className="programHours">
                <DemoItem sx={{ width: "100%" }}>
                  <MobileTimePicker
                    defaultValue={dayjs("hh:mm")}
                    label="Time"
                    sx={{ width: "100%" }}
                  />
                </DemoItem>
              </div>
            </DemoContainer>
          </LocalizationProvider>

          { reminders.map((reminder, index)=>( 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["MobileTimePicker"]}
                sx={{ width: "100%" }}
              >
                <div key={index} className="programHoursReminder">
                  <DemoItem sx={{ width: "100%" }}>
                    <MobileTimePicker
                      defaultValue={dayjs("hh:mm")}
                    //   label={`Reminder Time ${index + 1}`}
                      value={reminder}
                      onChange={(newTime) => handleTimeChange(newTime, index)}
                      sx={{ width: "100%" }}
                    />
                  </DemoItem>
                </div>
              
              </DemoContainer>
            </LocalizationProvider>
          
        ))}
        </div>
        <div className="addReminder" onClick={handleReminderShow} style={{ width: "49.2%" , height: "50px", alignItems: "center"}}  >
            <AddCircleOutlineIcon /> <Typography> Add Reminder</Typography>
          </div>
      </div>

      <div className="btnSave">
        <Button fullWidth onClick={handleClick} sx={{ color: "white", gap: 1 }}>
          <SaveIcon style={{ height: 24, width: 24 }} />{" "}
          <Typography> SAVE</Typography>
        </Button>
      </div>
    </div>
  );
}

export default Program;
