import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button } from "@mui/material";
import "./../Styles/auth.css";
import { MultiStepContext } from "../StepContext";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
// import { updateReplyMessage } from "../redux/features/shopUpdateSlice";
import { updateFormData } from "../redux/features/shopUpdateSlice";
import { useTranslation } from "react-i18next";

export default function StepTwoPage() {
  const { t } = useTranslation();
  const stepTwo = t("stepTwo");
  const stepTwoDes = t("stepTwoDes");
  const stepTwoBtn = t("stepTwoBtn");
  const stepTwoBtn2 = t("stepTwoBtn2");

  const { setStep } = useContext(MultiStepContext);

  const dispatch = useDispatch();
  const [auto_reply, setMessage] = useState("");

  const onChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const handleOnclick = () => {
    console.log("Setup Reply Message", auto_reply);
    dispatch(updateFormData({ auto_reply }));
    // dispatch(updateReplyMessage({message}))
    setStep(3);
  };
  // console.log(message);
  return (
    <>
      <Box>
        <Grid item xs={12}>
          <p className="textheader">{stepTwo}</p>
        </Grid>
        <Grid item xs={12}>
          {/* for desktop users */}
          <Box component="div">
            <p className="textbody">
              {/* Set up your page auto reply message <br /> to reply user in a
              minute.
              <br /> */}
              <span style={{ fontSize: "12px" }}>{stepTwoDes}</span>
            </p>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form>
            <TextField
              id="outlined-multiline-static"
              label={
                <div className="input-field-label">
                  <SendIcon color="primary" />
                  <span>Auto Reply Message</span>
                </div>
              }
              multiline
              rows={11}
              sx={{ width: "35ch" }}
              color="primary"
              onChange={onChangeHandler}
              value={auto_reply}
            />
          </form>
          <Box component="div" sx={{ display: { xs: "none", sm: "block" } }}>
            <div className="smartphone">
              <div className="content">
                {auto_reply ? (
                  <div>
                    <div className="text">
                      <span style={{ fontSize: "12px" }}>
                        12A လေးယူမယ်နော်အမ
                      </span>
                    </div>
                    <div className="message">
                      <TextField
                        variant="standard"
                        className="messageText"
                        multiline
                        value={auto_reply}
                        inputProps={{
                          style: { color: "white", fontSize: "12px" },
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button
            // variant="contained"
            color="primary"
            onClick={() => {
              setStep(1);
            }}
            sx={{
              marginTop: "5px",
              marginRight: "5px",
              textDecoration: "underline",
            }}
          >
            {stepTwoBtn}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOnclick}
            sx={{ marginTop: "5px" }}
          >
            {stepTwoBtn2}
          </Button>
        </Grid>
      </Box>
    </>
  );
}
