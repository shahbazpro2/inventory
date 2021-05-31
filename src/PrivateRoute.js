import { Route, Redirect } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { logoutUser } from './redux/actions'
import axios from 'axios'
import { refreshToken } from './configurations/urls'
import setAuthToken from './utils/setAuthToken';
const PrivateRoute = ({ component: Component, user, ...rest }) => {

    const dispatch = useDispatch()
    return (

        <Route
            {...rest}
            render={props => {

                const check = localStorage.getItem('userCreds')
                if (!check) {
                    dispatch(logoutUser())
                } else {
                    const { access, refresh } = JSON.parse(localStorage.getItem('userCreds'))
                    console.log('access', access)
                    const decoded = jwtDecode(access)
                    const currentTime = Date.now() / 1000;
                    if (decoded.exp < currentTime) {
                        axios.post(refreshToken, { refresh: refresh })
                            .then(res => {
                                const userCreds = {
                                    access: res.data.access,
                                    refresh: refresh
                                }
                                localStorage.setItem('userCreds', JSON.stringify(userCreds))
                                setAuthToken(res.data.access)
                            })
                            .catch(err => {
                                console.log(err)
                                dispatch(logoutUser())
                                window.location.replace('/login')
                            })
                    }
                }
                if (user.user.is_admin) {
                    return <Component {...props} />
                }
                else if (user.user.email) {
                    if (user.user.has_submitted_info === false) {
                        return <Redirect to="/register" />
                    } else
                        return <Component {...props} />

                } else {
                    return <Redirect to='/login' />
                }
            }


            }
        />
    )
}
const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(PrivateRoute)
