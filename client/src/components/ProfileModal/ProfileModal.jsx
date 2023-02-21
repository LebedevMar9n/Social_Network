import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateUser } from "../../actions";

function ProfileModal({ modalOpen, setModalOpen, data }) {
    const theme = useMantineTheme();
    // prepering req
    const { password,_id,email,isAdmin,createdAt,followers,following,updatedAt,__v, ...other } = data; 
    const [formData, setFormData] = useState(other);
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const dispatch = useDispatch();

    const handlleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            e.target.name === 'profilePicture'
                ? setProfileImage(img)
                : setCoverImage(img);
        }
        e.target.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        if(profileImage){data.append('profilePicture',profileImage)}
        if(coverImage){data.append('coverPicture',coverImage)}
        try {
            dispatch(updateUser(_id, data));
        } catch (error) {
            console.log(error);
        }
        setModalOpen(false);
        setProfileImage(null)
        setCoverImage(null)
    };

    return (
        <Modal
            overlayColor={
                theme.colorScheme === "dark"
                    ? theme.colors.dark[9]
                    : theme.colors.gray[2]
            }
            overlayOpacity={0.55}
            overlayBlur={3}
            size="55%"
            opened={modalOpen}
            onClose={() => setModalOpen(false)}
        >
            <form className="infoForm">
                <h3>Your info</h3>

                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="firstname"
                        placeholder="First Name"
                        onChange={handlleChange}
                        value={formData.firstname}
                    />

                    <input
                        type="text"
                        className="infoInput"
                        name="lastname"
                        placeholder="Last Name"
                        onChange={handlleChange}
                        value={formData.lastname}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="worksAt"
                        placeholder="Works at"
                        onChange={handlleChange}
                        value={formData.worksAt}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="livesin"
                        placeholder="LIves in"
                        onChange={handlleChange}
                        value={formData.livesin}
                    />

                    <input
                        type="text"
                        className="infoInput"
                        name="country"
                        placeholder="Country"
                        onChange={handlleChange}
                        value={formData.country}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="relationship"
                        placeholder="RelationShip Status"
                        onChange={handlleChange}
                        value={formData.relationship}
                    />
                </div>


                <div>
                    Profile Image
                    <input type="file" name='profilePicture' onChange={onImageChange} />
                    Cover Image
                    <input type="file" name="coverPicture" onChange={onImageChange} />
                </div>

                <button className="button infoButton" onClick={handleSubmit}>Update</button>
            </form>
        </Modal>
    );
}

export { ProfileModal };