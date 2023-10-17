import React, {useEffect} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {useStatelyActor} from '@statelyai/sky-react';
import {skyConfig} from './app.sky';

/**
 * Ensures that the necessary event shims are loaded.
 *
 * Required to use Stately Sky on React Native.
 *
 * MUST to be called at the top level of the app BEFORE `useStatelyActor` is invoked.
 * You MUST prevent any component that uses the `useState hook from being mounted before this is called.
 *
 * Required via Stately Sky -> PartySocket
 * - https://github.com/statelyai/sky/blob/main/packages/sky-core/src/actorFromStately.ts#L1
 * - Related issue from Party Kit explaining need for event-target-shim: https://github.com/partykit/partykit/issues/232
 *
 * @return {boolean} The value indicating whether the event shims are set or not.
 */
/**
 * Install `event-target-shim`
 */
import {Event, EventTarget} from 'event-target-shim';
export const useEnsureEventShimsAreLoaded = () => {
  const [shimIsSet, setShimIsSet] = React.useState(
    [globalThis.Event, globalThis.EventTarget].every(
      requiredGlobal => requiredGlobal !== undefined,
    ),
  );

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
  return <Text>Checking & potentially setting shims</Text>;
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

function App(): JSX.Element {
  const shimsAreLoaded = useEnsureEventShimsAreLoaded();

  const Content = shimsAreLoaded ? GoodStuff : Loading;

  return (
    <SafeAreaView>
      <View>
        <Content />
      </View>
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
