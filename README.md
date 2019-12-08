# Toy Robot Simulator

- This application is a simulation of a toy robot moving on a square tabletop.
- This application can read in commands of the textual within a text file:

`commands.txt` example:

    PLACE 1,2,EAST
    MOVE
    MOVE
    LEFT
    MOVE
    REPORT

For more details, please read this [feature description document](DESCRIPTION.md).

## Directory Structure

```bash
.
├── src                         <-- Source code for this application
│   ├── constant                <-- constant values for this application
│   │   └──  config.ts          <-- Constant value of the game config
│   │   └──  enums.ts           <-- Enums for this application
│   ├── interface               <-- Interfaces and types
│   │   └──  position.ts        <-- Interface Position
│   ├── repository              <-- Classes and repositorys with functions
│   │   └──  action.ts          <-- Class of Action
│   │   └──  robot.ts           <-- Class of Robot
│   │   └──  simulator.ts       <-- Class of Simulator
│   │   └──  tabletop.ts        <-- Class of Tabletop
│   └── index.ts                <-- Entry of the application with CLI function
├── test                        <-- All unit tests
│   ├── action.spec.ts          <-- Test for action.ts
│   ├── cli.spec.ts             <-- Test for index.ts
│   ├── robot.spec.ts           <-- Test for robot.ts
│   ├── simulator.spec.ts       <-- Test for simulator.ts
│   ├── tabletop.spec.ts        <-- Test for tabletop.ts
├── DESCRIPTION.md              <-- Feature descriptions
├── README.md                   <-- This instructions file
├── package.json                <-- NodeJS dependencies and scripts
├── tsconfig.json               <-- Typescript config file
├── tslint.json                 <-- Lint config
├── .env                        <-- Environment variables
├── .gitignore                  <-- gitignore
├── .nycrc.json                 <-- Unit test coverage config
└
```

## Git branches

- feature/* - Branches for developing features, not used at the moment.
- develop - The branch for integration, all feature branches should be merged back into `develop` branch when it is done.
- master - The branch for deployment, merging from `develop` branch to `master` branch happens when the code is ready.

## Environment Variable

You can set `WIDTH`, `LENGTH` and `COMMANDS_FILE` in `.env` file.

- `WIDTH`: Represents the width of the tabletop, please put a positive integer otherwise the application will use the default value.
- `LENGTH`: Represents the length of the tabletop, please put a positive integer otherwise the application will use the default value.
- `COMMANDS_FILE`: Represents relative position of the file with all commands
- By default, `WIDTH` and `LENGTH` will be `5`, and `COMMANDS_FILE` will be `commands.txt`.

`.env` Example:

    WIDTH=5
    LENGTH=5
    COMMANDS_FILE=commands.txt

You can also set these environment variables in the npm script:

    COMMANDS_FILE=commands.txt npm run start


## Command Lines

- `npm i` please run this first to install all dependencies.
- `npm run start` will start this application and read all commonds in the `commands.txt` by default.
You can change the commands in the `commands.txt` file directly.
You can set to your own file path in the `.env` file.
You can set the filename directly by run `COMMANDS_FILE=yourFileName npm run start`.
- `npm run build` compile the src to javascript and output to `./dist`.
- `npm run clean` remove the compiled files.
- `npm run test` run all unit tests.
- `npm run coverage` run the unit tests with coverage report.
