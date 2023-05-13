# Overview

An type-safe extension of [dotenv-safe](https://www.npmjs.com/package/dotenv-safe) that loads all environment variables from `.env`. There muse be a `.env.example` file in the project that declares the names of these vars and it should be committed along with your project.

# Type-Safety

Passing the generic to the loader function is not required however without it the properties on the resulting object will be `unknown` type and will require futher type narrowing.

```txt
# .env.example, committed to repo
SOMESTRING=
SOMENUMBER=
SOMEBOOL=
```

```
# .env, private
SOMESTRING=topsecret
SOMENUMBER=123
SOMEBOOL=TRUE
```

```ts
// index.ts
import config from "./index";

type envVars = {
    SOMESTRING: string;
    SOMENUMBER: number;
    SOMEBOOL: boolean;
};

const myEnv = config<envVars>();

console.log(myEnv);
```
