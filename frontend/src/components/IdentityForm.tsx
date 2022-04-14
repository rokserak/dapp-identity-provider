import React, { useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useIdentityProvider } from "../hooks";

interface Props {

}

interface IFormInput {
  given_name: string
  middle_name: string
  family_name: string
  nickname: string
  email: string
  picture: string
}

export const IdentityForm: React.FC<Props> = () => {
  const identityProvider = useIdentityProvider()

  const { control, handleSubmit, setValue } = useForm<IFormInput>({
    defaultValues: {
      given_name: '',
      middle_name: '',
      family_name: '',
      nickname: '',
      email: '',
      picture: '',
    }
  })

  const submitData = (data: IFormInput) => {
    console.log(data)
    if (!identityProvider) {
      return
    }

    identityProvider.add_user(data).then(() => console.log('User added'))
  }

  useEffect(() => {
    if (!identityProvider) {
      return
    }

    identityProvider.get_user_info().then((userInfo: IFormInput) => {
      // @ts-ignore
      Object.entries(userInfo).forEach(([key, value]) => setValue(key, value))
      console.log(userInfo)
    })
  }, [identityProvider, setValue])

  return (
    <div>
      <form onSubmit={handleSubmit(submitData)} className="grid-container">
        <Controller name="nickname"
                    control={control}
                    render={({ field }) => <TextField className="grid-row"
                                                          variant="standard"
                                                          label="Username" {...field} />} />
        <Controller name="given_name"
                    control={control}
                    render={({ field }) => <TextField className="grid-row"
                                                          variant="standard"
                                                          label="First Name" {...field} />} />
        <Controller name="middle_name"
                    control={control}
                    render={({ field }) => <TextField className="grid-row"
                                                          variant="standard"
                                                          label="Middle Name" {...field} />} />
        <Controller name="family_name"
                    control={control}
                    render={({ field }) => <TextField className="grid-row"
                                                          variant="standard"
                                                          label="Last Name" {...field} />} />
        <Controller name="email"
                    control={control}
                    render={({ field }) => <TextField className="grid-row"
                                                          variant="standard"
                                                          label="Email" {...field} />} />
        <Button variant="outlined" type="submit" className="grid-row">
          Submit
        </Button>
      </form>
    </div>
  )
}
