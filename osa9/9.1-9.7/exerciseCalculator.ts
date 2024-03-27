import parseArguments from "./utils/parseArguments";

interface ExerciseStats {
    days: number;
    trainingDays: number;
    targetAchieved: boolean;
    rating: number;
    ratingText: string;
    dailyTarget: number;
    avgTime: number;
}

const ratings = (scalar: number): Array<string> => {
    if (scalar < 0.9) {
        return ["1", "You didn't meet your target"];
    }
    else if (scalar < 1.2) {
        return ["2", "Good job, target met"];
    }
    else return ["3", "Nice."];
};



const calculateExercises = (e_hours: Array<number>, dailyTarget: number): ExerciseStats => {
    const days = e_hours.length;
    const trainingDays = e_hours.filter((element) => element > 0 ).length;
    const avgTime = e_hours.reduce((accum,current) => accum+current) / days;
    const targetAchieved = avgTime >= dailyTarget;
    const [rating, ratingText] = ratings(avgTime/dailyTarget);
    return {
        days,
        trainingDays,
        targetAchieved,
        rating: Number(rating),
        ratingText,
        dailyTarget,
        avgTime,
    };
};

const [a, b] = parseArguments(process.argv);
if (a instanceof Array) {
    console.log(calculateExercises(a,b));

}

export default calculateExercises;