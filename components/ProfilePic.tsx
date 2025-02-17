import useProfile from "@/hooks/useProfile"
import { Image, ImageStyle } from "react-native";
const DEFAULT_PROFILE_PIC = require("@/assets/images/default-profile.png");

export const ProfilePic = (tab: boolean) => {
    const { profile } = useProfile()

    return (
        <Image source={
            profile?.user?.profile_pic ||
            DEFAULT_PROFILE_PIC
        }
        style={tab ? $profilePic : {
            width: 10,
            height: 10
        }}
        />
    )
}

const $profilePic: ImageStyle = {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
}