import { Typography, Button} from "@mui/material";
import "./Program.css";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";

function Program() {
  const navigate = useNavigate();
  const [date, setDate] = React.useState<Dayjs | null>(dayjs("mm/dd/yyyy"));
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs("mm/dd/yyyy")
  );

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    }
  };

  return (
    <div>
      <Header
        showBackButton
        title="Drop SEPT"
        showRightButton
        onBackButtonClick={handleGoBack}
      />

      <div className="programContent">
        <div className="programDate">
          <Typography> What is the duration of the therapy?</Typography>
          <div className="DateReturn">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["MobileDatePicker", "MobileDatePicker"]}
              >
                <div className="date">
                  <DemoItem>
                    <MobileDatePicker
                      label="Date"
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                    />
                  </DemoItem>
                </div>
                <div className="endDate">
                  <DemoItem>
                    <MobileDatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                    />
                  </DemoItem>
                </div>
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
        <div className="programTime">
          <Typography>How often do you have to take this medicine?</Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["MobileTimePicker"]}>
              <DemoItem>
                <MobileTimePicker defaultValue={dayjs("hh:mm")} label="Time" />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <div className="addReminderTime">12h:00</div>
        </div>

        <div className="addTReminder">
          <AddCircleOutlineIcon /> <Typography> Add Reminder</Typography>
        </div>
      </div>

      <div className="panelSave">
<Button className="">

</Button>
      </div>
    </div>
  );
}

export default Program;
