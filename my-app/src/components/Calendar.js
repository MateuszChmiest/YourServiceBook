import React from 'react'
import { OverlayTrigger, Tooltip, Button, Image } from 'react-bootstrap';
import calendarImage from "../images/calendar.png"
const Calendar = () => {

const calendar = new Date();
const weekDay = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'may', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const day = weekDay[calendar.getDay()];
const month = months[calendar.getMonth()];
const date = calendar.getDate();
const year = calendar.getFullYear();

  return (
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip id="button-tooltip-2">{day}.{month} {date}.{year}</Tooltip>}
        >
          {({ ref, ...triggerHandler }) => (
            <Button
              variant="link"
              {...triggerHandler}
              className="d-inline-flex align-items-center"
            >
              <Image
                ref={ref}
                roundedCircle
                src={calendarImage}
              />
            </Button>
          )}
        </OverlayTrigger>
  )
}

export default Calendar;