import { InputWithLabel, SelectWithLabel } from "@components/Inputs";
import { PrimarySubmitButton } from "@components/Buttons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, reset } from "@features/auth/authSlice";
import Avatar from "@components/avatar";
import { toast } from "react-toastify";
import axios from "@libs/axios";

export default function ProfileForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    if (isSuccess) {
      toast.success(message);
    }
    dispatch(reset());
  }, [user, isError, message, router, isSuccess, dispatch]);

  const [full_name, setFullName] = useState(user?.full_name);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [email, setEmail] = useState(user?.email);
  const [gender, setGender] = useState(user?.gender);
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [id, setId] = useState(user?._id);

  const [contactNumber, setContactNumber] = useState(user?.contactNumber);

  const appendImage = (img) => {
    setAvatar(img);
  };

  const updateUserProfile = async () => {
    const formData = new FormData();
    avatar && formData.append("avatar", avatar);
    formData.append("full_name", full_name);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("contactNumber", contactNumber);
    formData.append("id", id);
    dispatch(updateProfile(formData));
  };

  const updateUserPassword = async () => {
    const data = {
      old_password: currentPassword,
      new_password: newPassword,
      user_id: id,
    };
    await axios
      .post(`/api/v1/user/changeUserPassword`, data)
      .then((res) => {
        toast.success(res.data.remarks);
        setCurrentPassword("");
        setNewPassword("");
      })
      .catch((e) => toast.error(e.response.data.remarks));
  };

  if (!user) {
    return null;
  } else
    return (
      <div className="flex flex-col w-full items-center">
        <div className="w-full max-w-2xl p-4 lg:p-8 bg-white rounded-lg shadow-lg">
          <div className="tex-lg text-center font-semibold uppercase py-3">My Profile</div>
          <p className="border-b w-full max-w-3xl mb-3"></p>
          <Avatar appendImage={(img) => appendImage(img)} />
          <div className="flex flex-col w-full max-w-2xl py-2">
            <InputWithLabel
              label="Full Name"
              defaultValue={full_name}
              onChange={(e) => setFullName(e.target.value)}
            />
            <InputWithLabel
              label="Email ID"
              disabled
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputWithLabel
              label="Phone No"
              disabled
              defaultValue={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />

            <SelectWithLabel onChange={(e) => setGender(e.target.value)}>
              <option value="" selected={user.gender == ""}>
                Select Gender
              </option>
              <option value="Male" selected={user.gender === "Male"}>
                Male
              </option>
              <option value="Female" selected={user.gender === "Female"}>
                Female
              </option>
            </SelectWithLabel>

            <div className="flex mt-6 justify-center">
              <PrimarySubmitButton onClick={() => updateUserProfile()}>
                Update Information
              </PrimarySubmitButton>
            </div>
          </div>

          <div className="tex-lg text-center font-semibold uppercase py-3">Password</div>

          <p className="border-b w-full max-w-xl mb-3"></p>

          <div className="flex flex-col w-full max-w-2xl py-2">
            <InputWithLabel
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <InputWithLabel value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>

          <div className="flex mt-6 justify-center">
            <PrimarySubmitButton
              disabled={!currentPassword || !newPassword}
              onClick={() => updateUserPassword()}
            >
              Update Password
            </PrimarySubmitButton>
          </div>
        </div>
      </div>
    );
}
