import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import moment from 'moment';

interface IProps {
  maxDate?: moment.Moment;
  minDate?: moment.Moment;
  selectedDateStyle?: TextStyle;
  font?: string;
  selectedDate: moment.Moment;
  onSelectDate: (date: moment.Moment) => void;
  firstDate: moment.Moment | null;
  secondDate: moment.Moment | null;
}

export default ({
  selectedDate,
  onSelectDate,
  firstDate,
  secondDate,
  maxDate,
  minDate,
  font,
}: IProps) => {
  const weekDayShort = moment.weekdaysShort();
  const weekDayShortName = weekDayShort.map(day => {
    return (
      <View key={`${day}_week_days`} style={styles.dayNameContainer}>
        <Text style={{...styles.dayNameStyle, fontFamily: font}}>{day}</Text>
      </View>
    );
  });

  const firstDayOfMonth = (): number => {
    let dateObject = selectedDate;
    let firstDay = dateObject.startOf('month').format('d');
    return Number(firstDay);
  };

  const getRows = () => {
    const blanks = [];
    for (let index = 0; index < firstDayOfMonth(); index++) {
      blanks.push(
        <View
          key={`${index}_days_blanks`}
          style={styles.emptyDayNameContainer}
        />,
      );
    }

    const daysInMonth = [];
    for (let d = 1; d <= selectedDate.daysInMonth(); d++) {
      const date = moment(selectedDate).date(d);
      const isDisabledMAXD = maxDate ? date.isAfter(maxDate, 'days') : false;
      const isDisabledMIND = minDate ? date.isBefore(minDate, 'days') : false;

      const isToday = date.isSame(moment(), 'day');
      const iddd = secondDate?.isBefore(firstDate);
      const isSelected =
        (iddd
          ? date.isBetween(secondDate, firstDate)
          : date.isBetween(firstDate, secondDate)) ||
        date.isSame(firstDate, 'day') ||
        date.isSame(secondDate, 'day');

      const isIncluded =
        date.isBetween(firstDate, secondDate) ||
        date.isBetween(secondDate, firstDate);
      const isFirstNumber = date.isSame(firstDate);
      const isSecondNumber = date.isSame(secondDate);
      const bothSelected = firstDate && secondDate;
      daysInMonth.push(
        <TouchableOpacity
          key={`${d}_date_month`}
          disabled={isDisabledMAXD || isDisabledMIND}
          onPress={() => onSelectDate(date)}
          style={[styles.dayNameContainer]}>
          <View
            style={[
              isIncluded ? styles.includedDate : null,
              isSelected && isFirstNumber
                ? styles.selectedAndFirstNumber
                : null,
              isSelected && isSecondNumber
                ? styles.selectedAndSecondNumber
                : null,
              isSelected && bothSelected ? styles.bothSelected : null,
            ]}>
            <Text
              style={[
                isSelected
                  ? styles.selectedDate
                  : isToday
                  ? styles.today
                  : styles.noneSelectedDate,
                {opacity: isDisabledMAXD || isDisabledMIND ? 0.2 : 1},
                isFirstNumber ? styles.firstNumberStyle : null,
                isSecondNumber ? styles.secondNumberStyle : null,
              ]}>
              {d}
            </Text>
          </View>
        </TouchableOpacity>,
      );
    }

    var totalSlots = [...blanks, ...daysInMonth];
    let rows: any[] = [];
    let cells: any[] = [];

    totalSlots.forEach((row, index) => {
      if (index % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(
          <View key={`${index}_week`} style={styles.weekRow}>
            {cells}
          </View>,
        );
        cells = [];
        cells.push(row);
      }
      if (index === totalSlots.length - 1) {
        const remain = 7 - cells.length;
        for (let indexRemain = 0; indexRemain < remain; indexRemain++) {
          cells.push(
            <View
              key={`${indexRemain}_remain_dates`}
              style={styles.emptyDayNameContainer}
            />,
          );
        }
        rows.push(
          <View
            key={`${index}_week_${selectedDate.format('MMMM')}`}
            style={styles.weekRow}>
            {cells}
          </View>,
        );
      }
    });
    return rows;
  };

  return (
    <View>
      <View style={styles.weekRow}>{weekDayShortName}</View>
      {getRows()}
    </View>
  );
};

const styles = StyleSheet.create({
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayNameContainer: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  selectedAndFirstNumber: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 100,
    height: 50,
  },
  bothSelected: {
    backgroundColor: '#FFCCA7',
  },
  selectedAndSecondNumber: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FFCCA7',
    borderBottomEndRadius: 100,
    borderTopEndRadius: 100,
    height: 50,
  },
  includedDate: {
    width: '100%',
    height: 50,
    borderRadius: 0,
    backgroundColor: '#FFCCA7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyDayNameContainer: {
    flex: 1,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDate: {
    color: 'white',
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  noneSelectedDate: {
    color: 'black',
  },
  today: {
    color: 'blue',
  },
  dayNameStyle: {
    fontSize: 12,
    textAlign: 'center',
  },
  firstNumberStyle: {
    borderRadius: 110,
    backgroundColor: '#ED673E',
    width: 55,
    height: 50,
    paddingTop: 15,
  },
  secondNumberStyle: {
    borderRadius: 110,
    backgroundColor: '#ED673E',
    width: 55,
    height: 50,
    paddingTop: 15,
  },
});
