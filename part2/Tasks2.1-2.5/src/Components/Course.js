
  const Header = (props) => {
  
    return (
        <h1>
          {props.name}
        </h1>
      
    )
    }
    
    const Content = ({parts}) => {
    return (
      <div>
        
          {parts.map(part => 
            <Part key={part.id} name={part.name} exersices={part.exercises}/>
          )}
       
      </div>
    )
    }
    
    const Part = (props) => {
    
    return (
        <div>{props.name} {props.exersices}</div>
    )
    }
    
    
    const Total = ({parts}) => {
    const total = parts.reduce((s,p) => s+p.exercises,0)
    return (
      <div>
        <b>
        Total of {total} exercises
        </b>
      </div>
    )
    }

const Course = ({course}) => {
    return (
      <div>
        <Header name ={course.name}/>
        <Content parts = {course.parts}/>
        <Total parts = {course.parts} />
      </div>
    )
  }

  export default Course