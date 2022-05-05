# React Angular Wrapper

Useful for injecting React components to AngularJS.

## How to use

1. Install package
```sh
npm install --save react-angular-wrapper
```

2. Import reactAngularWrapper function
```js
import { reactAngularWrapper } from 'react-angular-wrapper'; 
```

3. Create component

```js
const ExampleComponent = (props) => (
    <div>
        <p>{props.name} works!<p>
        <p>{props.injected} also!</p>
    </div>
);
```

4. Render it!

```angularjs
angular
    .module('exampleModule')
    .constant('injected', 'value')
    .component('exampleComponent', reactAngularWrapper(ExampleComponent, ['foo', 'bar'], ['injected']));
```

Note: Angular bindings (`foo`,`bar`) are automatically passed as props to React component. You can use Dependency Injection by giving 3rd argument (`injected` above). 
