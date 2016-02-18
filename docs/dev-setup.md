# Developer setup
## 1. Install typings package globally
```
npm install -g typings
```

## 2. Install typings
```
typings install node --save --ambient
typings install mocha --save --ambient
typings install chai --save --ambient
typings install source-map-support --save --ambient
typings install es6-promise --save --ambient
```


### Sublime Text
Suggested tweaks to your project workspace to hide files:

```javascript
{
	"folders":
	[
		{
			"path": "node-workhorse",
			"folder_exclude_patterns":
			[
				".git",
				"node_modules",
				"dist",
				"bower_components",
				"tmp",
				"typings"
			]
		}
	]
}
```

##3. To run tests:
```
npm test
```

To run specific tests
```
npm test -- --grep Calc
```