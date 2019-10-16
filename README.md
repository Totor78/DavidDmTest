# Erzo

This application was generated using JHipster 6.4.1, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v6.4.1](https://www.jhipster.tech/documentation-archive/v6.4.1).

This is a "microservice" application intended to be part of a microservice architecture, please refer to the [Doing microservices with JHipster][] page of the documentation for more information.

This application is configured for Service Discovery and Configuration with the JHipster-Registry. On launch, it will refuse to start if it is not able to connect to the JHipster-Registry at [http://localhost:8761](http://localhost:8761). For more information, read our documentation on [Service Discovery and Configuration with the JHipster-Registry][].

## Development

To start your application in the dev profile, simply run:

    ./mvnw

For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].

## Building for production

### Packaging as jar

To build the final jar and optimize the Erzo application for production, run:

    ./mvnw -Pprod clean verify

To ensure everything worked, run:

    java -jar target/*.jar

Refer to [Using JHipster in production][] for more details.

### Packaging as war

To package your application as a war in order to deploy it to an application server, run:

    ./mvnw -Pprod,war clean verify

## Testing

To launch your application's tests, run:

    ./mvnw verify

For more information, refer to the [Running tests page][].

### Code quality

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

You can run a Sonar analysis with using the [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) or by using the maven plugin.

Then, run a Sonar analysis:

```
./mvnw -Pprod clean verify sonar:sonar
```

If you need to re-run the Sonar phase, please be sure to specify at least the `initialize` phase since Sonar properties are loaded from the sonar-project.properties file.

```
./mvnw initialize sonar:sonar
```

or

For more information, refer to the [Code quality page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.

For example, to start a postgresql database in a docker container, run:

    docker-compose -f src/main/docker/postgresql.yml up -d

To stop it and remove the container, run:

    docker-compose -f src/main/docker/postgresql.yml down

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

    ./mvnw -Pprod verify jib:dockerBuild

Then run:

    docker-compose -f src/main/docker/app.yml up -d

For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`jhipster docker-compose`), which is able to generate docker configurations for one or several JHipster applications.

## Continuous Integration (optional)

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Consult the [Setting up Continuous Integration][] page for more information.

[jhipster homepage and latest documentation]: https://www.jhipster.tech
[jhipster 6.4.1 archive]: https://www.jhipster.tech/documentation-archive/v6.4.1
[doing microservices with jhipster]: https://www.jhipster.tech/documentation-archive/v6.4.1/microservices-architecture/
[using jhipster in development]: https://www.jhipster.tech/documentation-archive/v6.4.1/development/
[service discovery and configuration with the jhipster-registry]: https://www.jhipster.tech/documentation-archive/v6.4.1/microservices-architecture/#jhipster-registry
[using docker and docker-compose]: https://www.jhipster.tech/documentation-archive/v6.4.1/docker-compose
[using jhipster in production]: https://www.jhipster.tech/documentation-archive/v6.4.1/production/
[running tests page]: https://www.jhipster.tech/documentation-archive/v6.4.1/running-tests/
[code quality page]: https://www.jhipster.tech/documentation-archive/v6.4.1/code-quality/
[setting up continuous integration]: https://www.jhipster.tech/documentation-archive/v6.4.1/setting-up-ci/

Natalie Portman /ˈnætəli ˈpɔɹtmən/1, née Neta-Lee Hershlag le 9 juin 1981 à Jérusalem, est une actrice et productrice israélo-américaine.

Elle fait ses débuts au cinéma en 1993, à douze ans, en interprétant le rôle de Mathilda dans le film Léon de Luc Besson, au côté de Jean Reno. Elle devient une vedette internationale à part entière en 1999, lors de la sortie de Star Wars, épisode I : La Menace fantôme dans lequel elle joue Padmé Amidala aux côtés de Liam Neeson et Ewan McGregor. Elle reprend ce rôle dans les épisodes II et III, sortis respectivement en 2002 et 2005.

Natalie Portman alterne des apparitions dans des blockbusters hollywoodiens avec des rôles dramatiques qui lui valent d'être reconnue pour la justesse de son jeu2. Elle tourne avec de célèbres réalisateurs tels que Woody Allen (Tout le monde dit I love you), Michael Mann (Heat), Tim Burton (Mars Attacks!) ou encore Darren Aronofsky (Black Swan). En 2005, elle obtient le Golden Globe de la meilleure actrice dans un second rôle pour son rôle dans Closer, entre adultes consentants de Mike Nichols ; ce rôle lui vaut également une nomination aux Oscars. Elle est récompensée par le Saturn Award de la meilleure actrice en 2007 pour son rôle dans V pour Vendetta. Elle remporte un deuxième Golden Globe en 2011 dans la catégorie meilleure actrice de film dramatique puis l'Oscar de la meilleure actrice, cette fois pour sa performance dans Black Swan.

En plus de ses activités artistiques, Natalie Portman est engagée aux côtés de la Foundation for International Community Assistance, une association à but non lucratif qui propose des solutions de microcrédit dans les pays en développement. En juin 2003, elle obtient un diplôme de psychologie sanctionnant quatre années d’études à l’université Harvard. 

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Natalie_Portman_Cannes_2015_5.jpg/220px-Natalie_Portman_Cannes_2015_5.jpg">
