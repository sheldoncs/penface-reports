import React, { Component } from "react";
import Button from "../../components/UI/Buttons/Calendar/Button";
import classes from "./Calendar.module.css";

class Calendar extends Component {
  state = {
    months: [
      { January: 31, mthCount: 0 },
      { February: 29, mthCount: 1 },
      { March: 31, mthCount: 2 },
      { April: 30, mthCount: 3 },
      { May: 31, mthCount: 4 },
      { June: 30, mthCount: 5 },
      { July: 31, mthCount: 6 },
      { August: 31, mthCount: 7 },
      { September: 30, mthCount: 8 },
      { October: 31, mthCount: 9 },
      { November: 30, mthCount: 10 },
      { December: 31, mthCount: 11 },
    ],
    daysInWeek: {
      Sun: 0,
      Mon: 1,
      Tues: 2,
      Wed: 3,
      Thurs: 4,
      Fri: 5,
      Sat: 6,
    },
    isleapYear: true,
    withoutBorder: "WithoutBorder",
    withBorder: "WithBorder",
  };
  handleDaysInWeek = () => {};
  handlePadding = () => {};
  ButtonHandler = (dayValue) => {
    console.log(dayValue);
  };
  activeButtonHandler = () => {
    return "WithBorder";
  };
  componentWillMount() {
    this.handleDaysInWeek();

    const months = this.state.months;
    months.map((pair, i) => {
      return Object.keys(months[i]).map((key, index) => {
        let leap = new Date().getFullYear() % 400;

        let isLeapYear = this.state.isleapYear;
        if (leap !== 0) {
          isLeapYear = false;
        }
        if (index === 0) {
          if (isLeapYear === false) {
            if (key === "February") {
              pair[key] = 28;
              this.setState({ isLeapYear: isLeapYear });
            }
          }
        }
      });
    });
    this.setState({ months: months });
  }

  componentDidMount() {
    const months = this.state.months;
    months.map((pair, i) => {
      Object.keys(months[i]).map((key) => {});
    });
  }

  render() {
    const mths = [...this.state.months];
    let strMonth = mths.map((pair, i) => {
      var d = new Date();

      if (d.getMonth() === i) {
        return Object.keys(pair).map((monthValue, index) => {
          if (index === 0) {
            return (
              <div className={classes.Header} key={i}>
                {monthValue.toUpperCase()}
              </div>
            );
          }
        });
      }
    });

    let strDaysInMonth = mths.map((pair, i) => {
      var d = new Date();
      if (d.getMonth() === i) {
        return Object.keys(pair).map((monthValue, index) => {
          if (index === 0) {
            let days = pair[monthValue];
            let dayArray = [];
            let firstDay = d
              .getFullYear()
              .toString()
              .concat("/")
              .concat(
                (Number(d.getMonth()) + 1).toString().concat("/").concat("1")
              );

            let dte = new Date(firstDay);

            for (var pad = 0; pad < dte.getDay(); pad++) {
              dayArray.push("");
            }
            for (var j = 1; j <= days; j++) {
              dayArray.push(j);
            }
            return dayArray.map((k, index) => {
              let buttonStatus = this.state.withoutBorder;
              if (new Date().getDate() === k) {
                buttonStatus = this.state.withBorder;
              }
              return (
                <Button
                  key={index}
                  clicked={() => this.ButtonHandler(k)}
                  btntype={buttonStatus}
                >
                  {k}
                </Button>
              );
            });
          }
        });
      }
    });
    let daysInWeek = this.state.daysInWeek;
    const dispDaysInWeek = Object.keys(daysInWeek).map((index) => {
      return (
        <div className={classes.textMonth} key={daysInWeek[index]}>
          {index.toUpperCase()}
        </div>
      );
    });
    return (
      <React.Fragment>
        <div className={classes.Header}>
          <div className={classes.cont}>
            <div className={classes.arrow}>
              <div className={classes.leftarrowhead}></div>
            </div>
            <h1>{strMonth}</h1>
            <div className={classes.flip}>
              <div className={classes.rightarrowhead}></div>
            </div>
          </div>
        </div>
        <div className={classes.Days}>{dispDaysInWeek}</div>
        <div className={classes.Main}>{strDaysInMonth}</div>
      </React.Fragment>
    );
  }
}

export default Calendar;
