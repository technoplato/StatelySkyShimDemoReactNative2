/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import React, {useEffect} from 'react';
import {
  Button,
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
  const [snapshot, send, actor] = useStatelyActor(
    {
      apiKey: 'sta_e922f7a4-809c-4eb0-8311-0a1142dd3c57',
      url: skyurl,
      sessionId: sessionKey,
    },
    skyConfig,
  );
  const color = snapshot.value.toString();
  return (
    <View style={{padding: 12}}>
      <Text style={styles.sectionTitle}>
        stuff: {JSON.stringify(snapshot, null, 4)}
      </Text>

      <Text>{color}</Text>
      <View style={{height: 50, width: 50, backgroundColor: color}} />
      <View
        style={{height: 100, flexDirection: 'column', backgroundColor: 'red'}}>
        {actor?.getSnapshot().nextEvents.map(event => (
          <Button
            key={event}
            onPress={() => {
              send({type: event});
            }}
            title={event}
          />
        ))}
      </View>
    </View>
  );
};

const skyurl = 'https://sky.stately.ai/5hIBJk';
const sessionKey = 'shared';

import {useStatelyActor} from '@statelyai/sky-react';
import {skyConfig} from './app.sky';

const useFoo = () => {
  const [snapshot, send, actor] = useStatelyActor(
    {
      apiKey: 'sta_e922f7a4-809c-4eb0-8311-0a1142dd3c57',
      url: skyurl,
      sessionId: sessionKey,
    },
    skyConfig,
  );

  return [snapshot, send, actor];
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
