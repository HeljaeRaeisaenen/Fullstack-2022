import parseArguments from "./utils/parseArguments";

const calculateBmi = (height: number, weight: number): string =>  {
    const bmi = weight/(height*0.01)**2;
    let message: string;
    if (bmi < 18.5) { message = "Bad (Underweight)";}
    else if (bmi < 25) { message = "Normal (healthy weight))";}
    else { message = "Bad (Overrweight)";}
    return message;
};

const [a, b] = parseArguments(process.argv);
if (typeof a === "number") {
    console.log(calculateBmi(a, b));

}

export default calculateBmi;