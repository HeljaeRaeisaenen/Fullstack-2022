interface Props {
  name?:string;
  contents?:Array<CoursePart>;
  total?: number;
  part?: CoursePart;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartRequirements extends CoursePartDescription {
  requirements: Array<string>;
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;

const Header = (props: Props) => {
  return <h1>{props.name}</h1>
}

const Content = (props: Props) => {
  const contents = props.contents;
  if (!contents) return <></>
  
  return <>
    {contents.map(part => (
      Part(part)
    ))}
  </>
}

const Part = (part: CoursePart) => {
  switch (part.kind) {
    case "basic":
      return <div>
        <b><p> {part.name} {part.exerciseCount}</p></b>
        <i><p>{part.description}</p></i>
      </div>
    case "group":
      return <div>
        <b><p> {part.name} {part.exerciseCount}</p></b>
        <p>project exercises {part.groupProjectCount}</p>
      </div>
    case "background":
      return <div>
        <b><p> {part.name} {part.exerciseCount}</p></b>
        <i><p>{part.description}</p></i>
        <p>{part.backgroundMaterial}</p>
      </div>
    case "special":
      return <div>
        <b><p> {part.name} {part.exerciseCount}</p></b>
        <i><p>{part.description}</p></i>
        <p>required skils: {part.requirements.join(", ")}</p>
      </div>
    default:
      return <></>
  }
}

const Total = (props: Props) => {
  return <p>
  Number of exercises {props.total}
</p>
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName}/>
      <Content contents={courseParts}/>
      <Total total={totalExercises}/>
    </div>
  );
};

export default App;