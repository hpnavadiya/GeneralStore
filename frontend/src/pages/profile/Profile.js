import React, { useEffect, useState } from 'react'
import "./Profile.scss";
import PageMenu from '../../components/pageMenu/PageMenu';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card/Card';
import { getUser, updateUser } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';
import { shortenText } from '../../utils';


const Profile = () => {

    const { isLoading, user } = useSelector((state) => state.auth);

    const initialState = {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        address: {
            address: user?.address?.address || "",
            state: user?.address?.state || "",
            country: user?.address?.country || "",
        },
    }

    const [profile, setProfile] = useState(initialState);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user === null) {
            dispatch(getUser());
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (user) {
            setProfile({
                name: user?.name || "",
                email: user?.email || "",
                phone: user?.phone || "",
                role: user?.role || "",
                address: {
                    address: user?.address?.address || "",
                    state: user?.address?.state || "",
                    country: user?.address?.country || "",
                },
            })
        }
    }, [dispatch, user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value })
    }

    const saveProfile = async (e) => {
        e.preventDefault()

        const userData = {
            name: profile.name,
            phone: profile.phone,
            address: {
                address: profile.address,
                state: profile.state,
                country: profile.country,
            }
        }
        await dispatch(updateUser(userData))
    }

    return (
        <>
            <section>
                {isLoading && <Loader />}
                <div className="container">
                    <PageMenu />
                    <h2>Profile</h2>
                    <div className='--flex-start profile'>
                        <Card cardClass={"card"}>
                            {!isLoading && (
                                <>
                                    <div className="profile-photo">
                                        <img src="/images/user_icon.png" alt="" />
                                    </div>
                                    <form onSubmit={saveProfile}>
                                        <p>
                                            <label>Name:</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={profile?.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </p>
                                        <p>
                                            <label>Email:</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={profile?.email}
                                                onChange={handleInputChange}
                                                disabled
                                            />
                                        </p>
                                        <p>
                                            <label>Phone:</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={profile?.phone}
                                                onChange={handleInputChange}
                                            />
                                        </p>
                                        <p>
                                            <label>Address:</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={profile?.address?.address}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </p>
                                        <p>
                                            <label>State:</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={profile?.address?.state}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </p>
                                        <p>
                                            <label>Country:</label>
                                            <input
                                                type="text"
                                                name="country"
                                                value={profile?.address?.address}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </p>
                                        <button className="--btn --btn-primary --btn-block">
                                            Update Profile
                                        </button>
                                    </form>
                                </>
                            )}
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}

export const UserName = () => {
    const { user } = useSelector((state) => state.auth);

    const username = user?.name || "..."

    return <span style={{ color: "#ff7722" }}>Hello, {shortenText(username, 9)} | </span>;
}

export default Profile
