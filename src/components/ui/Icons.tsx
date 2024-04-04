import React from "react";

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
}

export const Icons = {
    logo: (props: LogoProps) => (
        <img {...props} alt="Logo" />
    )
};
