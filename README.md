# bugbash
A bugbashing tool

## Resources
https://www.valentinog.com/blog/error/

## JavaScript client, capable of sending errors to the server
``` 
class Logger {

    constructor() {
        super.constructor(...arguments);

        window.addEventListener('error', this.onError.bind(this));
    }

    onError(errorEvent) {
        const errorData = {
            message  : errorEvent.message,
            stack    : errorEvent.error.stack,
            date     : new Date(),
            language : navigator.language
        };
        
        fetch('/error-log/', errorData);
    }
}
```

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

### Decide what error meta data to send

## Backend (Node JS)
### 

## Data storage (Mongo ?)
### Decide what error meta data to store


## Dummy app with button throwin an error
```
<!DOCTYPE html>
<html lang="en">
<head>
	<script src="./Logger.js"></script>
</head>
<body>
<button id="button"> HEJ </button>
<script>
	document.getElementById('button').addEventListener('click', ()=>{
		foo();
	})
</script>
</body>
</html>

```

## Dashboard app with error overview (Nuxt + Vue)

### Grid with errors

### Grid with high score
