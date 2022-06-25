import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import DateRangePicker from '../example/src/components/DateRangePicker';

const App = () => {
  const [selectedRange, setRange] = useState({});
  const [pressClear, setPressClear] = useState(false);
  useEffect(() => {
    console.log(pressClear);
  }, [pressClear]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <DateRangePicker
          onSelectDateRange={range => {
            setRange(range);
          }}
          responseFormat="YYYY-MM-DD"
          maxDate={moment()}
          minDate={moment().subtract(60, 'days')}
          font={'Roboto'}
        />
      </View>
      <View style={styles.container}>
        <Text>first date: {selectedRange.firstDate}</Text>
        <Text>second date: {selectedRange.secondDate}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
});

export default App;
