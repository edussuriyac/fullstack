
  const Header = (props) => {
  
    return (
        <h2>
          {props.name}
        </h2>
      
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
        total of {total} exercises
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