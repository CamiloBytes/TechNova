import { InputText } from "primereact/inputtext";
import { IInputProps } from "../types/ComponentsType";



export const Input = (props: IInputProps) => {
    const { ...inputProps } = props;
    return (
        <>
            <InputText {...inputProps} />
        </>
    );
};
