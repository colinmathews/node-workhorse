export default class Calculator {
    add(x : number, y : number) : Promise<number> {
    	return new Promise<number>(function(ok, fail) {
    		// throw new Error("This is a test");
    		ok(x + y);
    	});
    }
}
