import React, { useEffect, useState } from "react";
import { Avatar, Button, DialogTitle, TextField } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from "react-hook-form";
import { useIdentityProvider, useNftStorage } from "../hooks";

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
  const storage = useNftStorage()

  const [loading, setLoading] = useState<boolean>(false)

  const { control, handleSubmit, setValue, getValues } = useForm<IFormInput>({
    defaultValues: {
      given_name: '',
      middle_name: '',
      family_name: '',
      nickname: '',
      email: '',
      picture: '',
    }
  })

  const [pictureFile, setPictureFile] = useState<File>()
  const [picture, setPicture] = useState<string>()

  const addFile = async (file: File): Promise<string> => {
    if (!storage) {
      return '#'
    }

    const metadata = await storage.store({
      name: getValues('nickname') + '.profile-pic',
      description: "Profile picture of " + getValues('nickname'),
      image: file,
    })
    return metadata.data.image.href.replace('ipfs://', 'https://nftstorage.link/ipfs/')
  }

  const submitData = async (data: IFormInput) => {
    if (!identityProvider) {
      return
    }
    setLoading(true)

    // @ts-ignore
    data.picture = await addFile(pictureFile)
    identityProvider.add_user(data)
      .then(tx => {
        console.log('User added')
        tx.wait().then(() => {
          setLoading(false)
        })
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!identityProvider) {
      return
    }

    identityProvider.get_user_info().then((userInfo: IFormInput) => {
      const _userInfo = Object.assign({}, userInfo)
      console.log(userInfo.picture)

      const _picture = userInfo.picture
      if (_picture) {
        _userInfo.picture = ''
        setPicture(_picture)
      }

      // @ts-ignore
      Object.entries(_userInfo).forEach(([key, value]) => setValue(key, value))
      console.log(userInfo)
    }).catch(console.log)
  }, [identityProvider, setValue])

  // @ts-ignore
  const onFileUpload = event => {
    console.log(event)
    if (event.target.files) {
      setPictureFile(event.target.files[0])
      setPicture(URL.createObjectURL(event.target.files[0]))
    }
  }

  return (
    <div>
      <DialogTitle>Permanently store your Identity on Ethereum</DialogTitle>

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
        <Controller name="picture"
                    control={control}
                    render={({ field }) => <>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        onChange={onFileUpload}
                        type="file"
                        value={field.value}
                        name={field.name}
                        onBlur={field.onBlur}
                        ref={field.ref} />
                      <label htmlFor="raised-button-file">
                        <Button variant="outlined"
                                component="span"
                                disabled={loading}
                                className="grid-row">
                          Add Profile Picture
                        </Button>
                      </label>
                      </>} />

        {picture && <div>
          <Avatar src={picture} sx={{ width: 500, height: 500 }} />
        </div>}

        <LoadingButton variant="outlined"
                       type="submit"
                       className="grid-row"
                       loading={loading}>
          Submit
        </LoadingButton>
      </form>
    </div>
  )
}
