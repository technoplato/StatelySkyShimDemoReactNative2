/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Event, EventTarget} from 'event-target-shim';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

if (!globalThis.event) {
  globalThis.event = Event;
}

if (!globalThis.eventTarget) {
  globalThis.eventTarget = EventTarget;
}

export const useEnsureEventShimsAreLoaded = () => {
  const [shimIsSet, setShimIsSet] = React.useState(false);

  useEffect(() => {
    if (shimIsSet) {
      return;
    }

    if (!globalThis.Event) {
      globalThis.Event = Event;
    }

    if (!globalThis.EventTarget) {
      globalThis.EventTarget = EventTarget;
    }

    console.log({event: globalThis.Event, eventTarget: globalThis.EventTarget});
    if (!globalThis.EventTarget || !globalThis.Event) {
      throw new Error(
        'Event Target or Event not set properly and everything is gonna suck',
      );
    }
    setShimIsSet(true);
  }, [shimIsSet]);

  return shimIsSet;
};

const Loading = () => {
  return <Text>Loading shims</Text>;
};

const GoodStuff = () => {
  const event = globalThis.Event;
  const eventTarget = globalThis.EventTarget;
  return (
    <Section title="Check event-target and set">
      <Text>Event Target: {JSON.stringify(eventTarget)}</Text>
      <Text>Event: {JSON.stringify(event)}</Text>
    </Section>
  );
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const shimsAreLoaded = useEnsureEventShimsAreLoaded();

  const Content = shimsAreLoaded ? GoodStuff : Loading;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Content />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'column',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
