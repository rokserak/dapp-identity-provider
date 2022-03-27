import React from "react";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

interface Props {

}

interface IFormInput {
  nickname: string
  given_name: string
  family_name: string
  email: string
}

export const IdentityForm: React.FC<Props> = () => {
  const { control, handleSubmit } = useForm<IFormInput>({
    // TODO fill from smart contract
    defaultValues: {
      nickname: '',
      given_name: '',
      family_name: '',
      email: ''
    }
  })

  const submitData = (data: IFormInput) => console.log(data)

  return (
    <div>
      <form onSubmit={handleSubmit(submitData)} className="grid-container">
        <Controller name="nickname"
                    control={control}
                    render={({ field }) => <TextField className="grid-row" variant="standard" label="Username" {...field} />} />
        <Controller name="given_name"
                    control={control}
                    render={({ field }) => <TextField className="grid-row" variant="standard" label="First Name" {...field} />} />
        <Controller name="family_name"
                    control={control}
                    render={({ field }) => <TextField className="grid-row" variant="standard" label="Last Name" {...field} />} />
        <Button variant="outlined" type="submit" className="grid-row">
          Submit
        </Button>
      </form>
    </div>
  )
}
