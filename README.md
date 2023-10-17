![2023-10-17 09 02 45](https://github.com/technoplato/StatelySkyShimDemoReactNative2/assets/6922904/a2877808-e4be-4193-8f76-6b44017eaac2)

Too distracted to modify the docs but here's the code for addressing this from a mobile app:

```

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
```

USAGE of the above code 

```
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
```

NOTE that the app will crash if that hook does not return true and you attempt to invoke `useStatelyActor`
