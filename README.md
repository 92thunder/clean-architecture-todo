# clean-todo

## Layer

### Entities
データと振る舞い
* Task

### UseCases
EntitiesのビジネスロジックやRepositoryやAPIのInterfaceを組み合わせてアプリケーションロジックを組む
* Interactors

### Interface Adapter
外界(infra、UI、Storageなど）とのinterface
* Store
* Repository
* Vue Components

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
