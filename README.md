# opean-api-merge-tools
supported type  
openapi version 3

## usage
Install the node tool  
```$bash
npm install opean-api-merge-tools
$ or
yarn add opean-api-merge-tools
```
  
Run the command  
```
opean-api-merge-tools {main openapi yaml file} {env yaml file} -TARGET_ENV {output target file}
```


### example
openapi.yaml directory constitution
```
├── components                  split components files
│   ├── schemas
│   ├── securitySchemes
│   └── .....
├── paths                       split path files
│   └── ....
├── env.yaml
└── openapi.yaml                main yaml file 
```
  
  
env.yaml
```
local:
  url: "https://local.com/{basePath}"
  test: {API_URL}                   replace environment variable
staging:
  url: {API_URL}                    replace environment variable
  test: {API_URL}
production:
  url: {API_URL}                    replace environment variable
  test: {API_URL}
```

openapi.yaml  
```
openapi: "3.0.1"
info:
  title: '{env.test}'               replace environment file variable
  version: "2018-10-25T09:56:02Z"
servers:
- url: '{env.url}'                  replace environment file variable
  variables:
    basePath:
      default: "/xxxx"
...
```  

## directory
```
.
├── README.md
├── package.json
├── spec
│   └── merge.spec.js
├── src
│   ├── index.js
│   └── merge.js
├── test_yaml
│   ├── components
│   ├── env.yaml
│   ├── openapi.yaml
│   └── paths
└── yarn.lock

```

#### License
MIT