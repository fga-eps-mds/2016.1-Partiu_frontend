# Partiu

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://choosealicense.com/licenses/mit/)
[![Code Climate](https://codeclimate.com/github/fga-gpp-mds/2016.1-Partiu_frontend/badges/gpa.svg)](https://codeclimate.com/github/fga-gpp-mds/2016.1-Partiu_frontend)
[![Test Coverage](https://codeclimate.com/github/fga-gpp-mds/2016.1-Partiu_frontend/badges/coverage.svg)](https://codeclimate.com/github/fga-gpp-mds/2016.1-Partiu_frontend/coverage)
[![Build Status](https://travis-ci.org/fga-gpp-mds/2016.1-Partiu_frontend.svg?branch=devel)](https://travis-ci.org/fga-gpp-mds/2016.1-Partiu_frontend)

Aplicativo multiplataforma que permite pessoas com amigos em comum combinarem caronas.

## Dependências

- Node.js (v5.9.0)
  - Recomendamos a utilização do [NVM](https://github.com/creationix/nvm)

## Ambiente de Desenvolvimento

Na raiz do repositório, execute:

```bash
npm install
npm install -g cordova ionic
gulp dev
ionic serve --lab
```

## Executando os Testes

```bash
npm test
```

O resultado da cobertura de testes gerado após a execução dos testes encontra-se em: coverage/lcov-report/index.html

### Testes Funcionais

É necessário ter o [Partiu - Backend](https://github.com/fga-gpp-mds/2016.1-Partiu_backend) rodando para que os testes funcionais possam ser executados.

```bash
gulp dev
npm install -g protractor
webdriver-manager update --standalone
webdriver-manager start
npm run func-test
```

### Build de desenvolvimento Android

#### Pré-requisitos

- JDK (v8)
- Android SDK
- ADB
- Celular Android com "USB debugging" ativado e conectado ao PC
  - Verifique se o celular foi reconhecido pelo adb com o comando **adb devices**

#### Gerando a build e instalando

```bash
gulp prod
ionic build android
adb install -r platforms/android/build/outputs/apk/android-debug.apk
```
