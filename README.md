# rxbf
Reactive bitFlyer Lightning Library

## Install

### `yarn`

```
yarn add rxbf
```

### `npm`

```
npm i -S rxbf
```

## How to use

### HTTP Private API

```typescript
import { HttpAuthClient } from 'rxbf';
const client = new HttpAuthClient(API_KEY, API_SECRET);
client.permissions().then((permissions) => console.log(permissions));
```

### Realtime API

```typescript
import { RealtimeAuthClient } from 'rxbf';
const client = new RealtimeAuthClient(API_KEY, API_SECRET);
client.childOrderEvents().subscribe((event) => console.log('Child order event:', event));
client.ticker('BTC_JPY').subscribe((ticker) => console.log('Ticker:', ticker));
```
