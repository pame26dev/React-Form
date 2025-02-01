
# React Form with Validation using React Hook Form and Zod

This project is an example of a form in React that uses `react-hook-form` to manage form state and `zod` for field validation. The form includes fields for name, email, password, and password confirmation, with custom validations for each field.

## Features

- **Form Validation**: Uses `zod` to define a validation schema that ensures the entered data meets the specified requirements.
- **Form Handling**: Utilizes `react-hook-form` to manage form state, making it easier to handle fields and errors.
- **Reusable Components**: The `InputForm` component is reusable and can be used for any form field.

## Installation

To clone and run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the application**:
   ```bash
   npm start
   ```

   The application should automatically open in your browser at `http://localhost:3000`.

## Project Structure

Below is the folder and file structure of the `src/` directory:

```
src/
├── components/
│   ├── customForm/
│   │   └── CustomForm.tsx
│   └── CustomInput/
│       └── CustomInput.tsx
├── models.ts
├── App.tsx
├── App.css
├── index.tsx
├── index.css
└── ...
```

### Explanation of the Structure

- **`components/`**: Contains reusable components for the application.
  - **`customForm/`**: Houses the `CustomForm` component, which handles the form logic and validation.
  - **`CustomInput/`**: Contains the `CustomInput` component, a reusable input field for the form.
- **`models.ts`**: Defines the validation schema using `zod` and exports the `FormValues` type.
- **`App.tsx`**: The main component that renders the form.
- **`App.css`**: Styles for the `App` component.
- **`index.tsx`**: The entry point for the React application.
- **`index.css`**: Global styles for the application.

## Usage

The form consists of four fields, each with specific validations implemented using **Zod**. Below is a description of each field and how it integrates with the validation schema.

### Zod Schema Example

The validation schema is defined in the `models.ts` file using **Zod**. Here is the complete schema code:

```typescript
import { z } from "zod";

// Validation schema definition
export const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirmation must be at least 6 characters"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Associates the error with the confirmPassword field
});

// TypeScript type derived from the Zod schema
export type FormValues = z.infer<typeof schema>;
```

#### Schema Explanation

- **`z.string()`**: Defines that the field must be a string.
- **`min(1, "message")`**: Ensures the field is not empty and displays a custom error message.
- **`email("message")`**: Validates that the field is a valid email address.
- **`refine`**: Allows custom validations. In this case, it compares `password` and `confirmPassword` to ensure they match.
- **`path`**: Specifies which field the error message is associated with if the custom validation fails.

### How the Schema Integrates with the Form

The schema is integrated with `react-hook-form` via the Zod resolver (`@hookform/resolvers/zod`). Here is the relevant code from the `CustomForm` component:

```typescript
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormValues, schema } from "../models";

const CustomForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema), // Integrates Zod with react-hook-form
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data); // Logs form data to the console
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm name="name" control={control} label="Name" type="text" error={errors.name} />
      <InputForm name="email" control={control} label="Email" type="email" error={errors.email} />
      <InputForm name="password" control={control} label="Password" type="password" error={errors.password} />
      <InputForm name="confirmPassword" control={control} label="Confirm Password" type="password" error={errors.confirmPassword} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### Example of Valid Data

If the user enters the following data:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

The form will submit successfully, and the data will be logged to the console.

### Example of Errors

If the user makes mistakes, such as:

- Leaving the **Name** field empty.
- Entering an invalid email (`john@example`).
- Using a password that is too short (`123`).
- Not matching the passwords.

The form will display error messages below the corresponding fields, guiding the user to correct the errors.

## Dependencies

- **React**: JavaScript library for building user interfaces.
- **react-hook-form**: Library for managing forms in React.
- **zod**: TypeScript-first schema validation library.
- **@hookform/resolvers**: Connects `react-hook-form` with `zod` for validation.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.