import { Link } from 'react-router-dom'
import logo from '../logo.png'
import { useSelector,useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions';

const Navbar = () => {
    const user=useSelector(state=>state.user.user)
    const dispatch=useDispatch()
    const clearStorage=()=>{
        dispatch(logoutUser())
        window.location.replace('/login')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <div className="navbar-brand" ><img src={logo} height="50px" width="50px" alt="logo" /></div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {console.log('user',user)}
                        {
                        user?.email?<li className="nav-item" onClick={clearStorage}>
                            <Link to="/" className="nav-link">Logout</Link>
                        </li>:
                        <>
                        <li className="nav-item">
                            <Link  className="nav-link" to="/login">Login</Link>
                        </li>
                        
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            </>
}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
