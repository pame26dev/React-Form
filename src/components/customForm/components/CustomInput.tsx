import { Control, Controller, FieldError } from "react-hook-form";
import './CustomInput.css'
import { FormValues } from "../models";

interface Props {
    name: keyof FormValues; //es el nombre del input
    control: Control<FormValues>; // el el control del formulario
    label: string; // como se va a llamar el input
    type?: string;
    error?: FieldError;
}


const InputForm = ({name, control, label, type, error}: Props) => {
    return (
        <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <Controller 
            name={name} 
            control={control} 
            render={ ({field}) => 
                <input id={name} type={type} {...field} className={`form-control ${error ? "is-invalid":""}`} />
            }
        />
        {error && <p className="error">{error.message}</p>}
    </div>
    )
}

export default InputForm;