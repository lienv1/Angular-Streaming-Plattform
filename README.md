# My-Streaming-Plattform

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.2.

# First Step

To use this application you need to set up your own server-side API first.

Your API should to be capable of retrieving data with properties according to the models Actor, Genre, Movie and Participant.
Properties can be found in `/src/app/model/`

Your Server-side application further supports REST API requests to pass files and data to the front-end.
Requests example can be found in

`/src/app/service/movie-service.service.ts`
and
`/src/app/service/actor-service.service.ts`

# Configure

Setup your API URL and port in `src/environments` by editing `apiBaseUrl`

Add the following packages to the project by running the following commands

> ng add @ng-bootstrap/ng-bootstrap

> npm install ngx-pagination --save

## Development

To deploy this application on your server natively, run:
> ng serve

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

To deploy this application on a docker container, run the following commands:
> docker build -t my-streaming-plattform .

> docker run -rm -it -p 4200:4200 

To save the application as an docker image, run:
> docker save --output my-streaming-plattform-app.tar my-streaming-plattform-app

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

