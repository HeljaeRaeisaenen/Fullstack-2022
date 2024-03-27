const parseArguments = (args: string[]): [number | number[], number] => {
    args.slice(2).forEach((arg) => {
      if (isNaN(Number(arg))) {
        throw new Error('Provided values were not numbers!');
      }
    });
    const numArgs: Array<number> = args.slice(2).map(Number);
    if (args[1].match("exercise")) {
      if (args.length < 4) throw new Error('Not enough arguments');
      const dailyTarget = numArgs[0];
      const a = numArgs.slice(1);
      //console.log(a, dailyTarget);
      return [a, dailyTarget];

    } else if (args[1].match("bmi")) {
      if (args.length < 4) throw new Error('Not enough arguments');
      if (args.length > 4) throw new Error('Too many arguments');
      return [numArgs[0], numArgs[1]];
    }
    else {return [NaN, NaN];}
    
  };

  /*
const parseRequestParams = (params: string[]): number[] => {
  let parsed = params.map(Number)
  return parsed
}*/

export default parseArguments;