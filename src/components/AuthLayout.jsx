import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Protected = ({children,authentication=true}) => {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)
   
    useEffect(() => {
      // true && true !== true
      // if(authentication && authStatus !== authentication){
      //   navigate('/')
      // }else{
      //   navigate('/home')
      // }

       if (authStatus === false) {
          navigate("/")
        }
    
      
    }, [authStatus,authentication,navigate])
    
    return children
    
}

export default Protected