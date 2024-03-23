import {Link} from 'react-router-dom';

export default function ErrorPage(){

return (
    <div className='App-header'>
      <h1 style={{textAlign: 'center'}}>Oops...<br/>Page not found</h1>
      <Link to="/" style={{
        backgroundColor: '#3366FF', 
        padding: '10px',
        paddingInline: '20px', 
        borderRadius: '5px',
        color: 'white'}}>Go home</Link>
    </div>
)
      }   