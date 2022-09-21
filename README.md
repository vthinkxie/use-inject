# React Hooks for injection-js

![build](https://github.com/vthinkxie/use-inject/actions/workflows/workflow.yml/badge.svg)
[![codecov](https://codecov.io/gh/vthinkxie/use-inject/branch/master/graph/badge.svg?token=61PSEDRQpv)](https://codecov.io/gh/vthinkxie/use-inject)

React Hooks for [injection-js](https://github.com/mgechev/injection-js).

## Get Started

```shell
npm install use-inject
```

[Online Demo](https://stackblitz.com/edit/use-inject?file=App.tsx)

```tsx
import * as React from 'react';
import { Injectable } from 'injection-js';
import { useInject, DIContainer } from 'use-inject';
import 'reflect-metadata';

abstract class LogService {
  name: string;
}

@Injectable()
class LogServiceOneImpl implements LogService {
  name = 'log-one';
}

@Injectable()
class LogServiceTwoImpl implements LogService {
  name = 'log-two';
}

@Injectable()
class ClientService {
  public name: string;
  constructor(private logService: LogService) {
    this.name = `client-with-${this.logService.name}`;
  }
}

function Component() {
  const name = useInject(ClientService).name;
  return <div>{name}</div>;
}

export default function App() {
  return (
    <div>
      <DIContainer
        providers={[
          ClientService,
          { provide: LogService, useClass: LogServiceOneImpl },
        ]}
      >
        <Component></Component>
      </DIContainer>
      <DIContainer
        providers={[
          ClientService,
          { provide: LogService, useClass: LogServiceTwoImpl },
        ]}
      >
        <Component></Component>
      </DIContainer>
    </div>
  );
}
```


## License
MIT