import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import InputForm from "./components/CustomInput";
import { FormValues, schema } from "./models";

const CustomForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onBlur"
    });

    // que sucede cuando hacemos un submit
    // el tipado del submit para nosotros es un SubmitHandler de react-hook-forms que devuelve el FormValues
    // forma correcta porque se asocia con el método handleSubmit 
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
    }

    return (
        // cuando el formulario haga submit, se va a manejar con handleSubmit
        // y le vamos a decir que ejecute onSubmit
        <form onSubmit={handleSubmit(onSubmit)}>
         <InputForm name="name" control={control} label="Name" type="text" error={errors.name} />
         <InputForm name="email" control={control} label="Email" type="email" error={errors.email} />
         <InputForm name="password" control={control} label="Password" type="password" error={errors.password} />
         <InputForm name="confirmPassword" control={control} label="Confirm Password" type="password" error={errors.confirmPassword} />
         <button type="submit">Submit</button>
        </form>
    )
}

export default CustomForm;