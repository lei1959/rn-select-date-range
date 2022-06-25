import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import Month from './Month';
import Button from './Button';
require('moment/min/locales.min');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

interface IResponse {
  firstDate: string | moment.Moment;
  secondDate: string | moment.Moment;
}

interface IProps {
  onSelectDateRange: (response: IResponse) => void;
  responseFormat?: string;
  maxDate?: moment.Moment;
  minDate?: moment.Moment;
  font?: string;
  ln?: string;
  handleAgree: () => void;
  handleAgree: () => void;
}

const DateRangePicker = ({
  onSelectDateRange,
  responseFormat,
  maxDate,
  minDate,
  font,
  ln = 'en',
  handleAgree,
}: IProps) => {
  const [selectedDate, setSelectedDate] = useState(moment());

  const [firstDate, setFirstDate] = useState<moment.Moment | null>(null);
  const [secondDate, setSecondDate] = useState<moment.Moment | null>(null);

  const lastMonth = selectedDate.clone().subtract(1, 'months');
  const nextMonth = selectedDate.clone().add(1, 'months');

  moment.locale(ln);

  const returnSelectedRange = (fd: moment.Moment, ld: moment.Moment) => {
    const isWrongSide = ld?.isBefore(fd);
    if (responseFormat) {
      onSelectDateRange({
        firstDate: isWrongSide
          ? ld.format(responseFormat)
          : fd.format(responseFormat),
        secondDate: isWrongSide
          ? fd.format(responseFormat)
          : ld.format(responseFormat),
      });
    } else {
      onSelectDateRange({
        firstDate: isWrongSide ? ld : fd,
        secondDate: isWrongSide ? fd : ld,
      });
    }
  };

  const onSelectDate = (date: moment.Moment) => {
    if (firstDate?.isSame(date, 'dates') || secondDate?.isSame(date, 'dates')) {
      return;
    }

    if (!firstDate) {
      setFirstDate(date);
    } else {
      if (date?.isBefore(firstDate)) {
        setFirstDate(date);
      } else {
        if (!secondDate) {
          setSecondDate(date);
          returnSelectedRange(firstDate, date);
        } else {
          setFirstDate(secondDate);
          setSecondDate(date);
          returnSelectedRange(secondDate, date);
        }
      }
    }
  };

  const onPressClear = () => {
    setFirstDate(null);
    setSecondDate(null);
    onSelectDateRange({
      firstDate: '',
      secondDate: '',
    });
  };

  return (
    <View>
      <View style={styles.titleRow}>
        <Text style={{...styles.title, fontFamily: font}}>
          {selectedDate.locale(ln).format('MMMM')}{' '}
          {selectedDate.locale(ln).format('YYYY')}
        </Text>
        <Button
          font={font}
          disabled={minDate ? lastMonth.isBefore(minDate, 'months') : false}
          label={'less-than'}
          onPress={() => setSelectedDate(lastMonth)}
        />
        <Button
          font={font}
          disabled={maxDate ? nextMonth.isAfter(maxDate, 'months') : false}
          onPress={() => setSelectedDate(nextMonth)}
          label={'greater-than'}
          align="right"
        />
      </View>
      <Month
        font={font}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        firstDate={firstDate}
        secondDate={secondDate}
        maxDate={maxDate}
        minDate={minDate}
      />
      <View>
        <TouchableOpacity onPress={onPressClear}>
          <Text style={styles.cancel}>ยกเลิก</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAgree}>
          <Text style={styles.agree}>ตกลง</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DateRangePicker;

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    padding: 5,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    flex: 1,
    fontWeight: '600',
    textAlign: 'left',
  },
  clearBtn: {
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  clearContainer: {
    flexDirection: 'row-reverse',
    paddingVertical: 5,
  },
  commentNavButton: {
    borderWidth: 3,
  },
  modalFooter: {
    width: width * 0.9,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  agree: {
    marginLeft: 15,
    fontSize: 14,
    fontWeight: '700',
    color: 'orange',
  },
  cancel: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '700',
    color: 'orange',
  },
});
