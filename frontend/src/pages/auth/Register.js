import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom/client" 
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from 'react-router-dom';
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, register } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const initialState = {
    name: "",
    email: "",
    password: "",
    cPassword: ""
}
console.log("object",initialState)

const Register = () => {

    const [formData, setFormData] = useState(initialState);
    const { name, email, password, cPassword } = formData;

    // register user
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, isLoggedIn, isSuccess} = useSelector((state) => state.auth);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    // register user
    const registerUser = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return toast.error("All fields are required");
        }
        if (password.length < 6) {
            return toast.error("Password with 6 character");
        }
        if (!validateEmail(email)) {
            return toast.error("Please enter valid email");
        }
        if (password !== cPassword) {
            return toast.error("Password not match");
        }
        const userData = {
            name,
            email,
            password
        }
        await dispatch(register(userData));
    };

    useEffect(() => {
        if(isSuccess && isLoggedIn){
            navigate("/");
        }
        dispatch(RESET_AUTH())
    }, [isSuccess, isLoggedIn, dispatch, navigate])

    // -------

    return (
        <>
        {isLoading && <Loader/>} 
            <section className={`container ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <h2>
                            Register
                        </h2>
                        <form onSubmit={registerUser}>
                            <input
                                type="text"
                                placeholder="name"
                                required
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                                name="cPassword"
                                value={cPassword}
                                onChange={handleInputChange}
                            />
                            <button type="submit" className="--btn --btn-primary --btn-block">Register</button>
                        </form>
                        <span className={styles.register}>
                            <p>Already have an account?</p>
                            <Link to="/login">Login</Link>
                        </span>
                    </div>
                </Card>
                <div className={styles.img}>
                    <img src={loginImg} alt="Loading..." width={400} />
                </div>
            </section>
        </>
    )
}

export default Register
