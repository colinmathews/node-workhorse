# node-workhorse
`node-workhorse` is a flexible framework for executing tasks. Break up small or huge tasks into bite-sized chunks and use this framework to run through the processing. Each bit of work can have children, run finalizers, and each mechanism of the processing engine can easily be extended or replaced. 

One example: use AWS Lambda to parallelize many intensive tasks and stitch their results back together. 

## Installation
```
npm install node-workhorse --save
```

## Development
Follow instructions here to enable globstar so that you can use `tslint` with paths like `**/*.ts`.
https://gist.github.com/samnang/1759336
