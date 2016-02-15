# Developer setup
## 1. Install typings globally
```
npm install -g typings
```

## 2. Install mocha and chai typings
```
typings install mocha --save --ambient
typings install chai --save --ambient
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
