interface Runnable {
  run: (input: any) => Promise<any>;
  catch?: (err: Error) => Promise<any>;
}

export default Runnable
