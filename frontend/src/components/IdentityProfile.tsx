import React, { useEffect, useState } from "react";
import { useIdentityProvider } from "../hooks";
import { BigNumber } from "ethers";
import { Avatar, Grid, IconButton, Tooltip } from "@mui/material";
import { CheckCircle, Edit, Warning } from "@mui/icons-material";
import { toTitleCase } from "../helpers";

interface Props {

}

interface IProfile {
  sub: string
  name: string
  given_name: string
  middle_name: string
  family_name: string
  nickname: string
  picture: string
  updated_at: BigNumber
  email: string
  email_verified: boolean
}

export const IdentityProfile: React.FC<Props> = () => {
  const identityProvider = useIdentityProvider()
  const [profile, setProfile] = useState<IProfile>()
  const [fullName, setFullName] = useState<string>("")

  useEffect(() => {
    identityProvider?.get_user_info().then(info => setProfile(info))
  }, [identityProvider])

  useEffect(() => {
    if (!profile) {
      return
    }

    if (profile.middle_name) {
      setFullName(`${toTitleCase(profile.given_name)} ${toTitleCase(profile.middle_name)} ${toTitleCase(profile.family_name)}`)
    } else {
      setFullName(`${toTitleCase(profile.given_name)} ${toTitleCase(profile.family_name)}`)
    }
  }, [profile])

  return (
    <div className="profile-card">
      <Grid container spacing={2}>
        <Grid container xs={4} />

        <Grid container xs={4}>
          <Grid item xs={12} className="profile-item">
            <div>Profile <Tooltip title="Edit">
              <IconButton>
                <Edit />
              </IconButton>
            </Tooltip>
            </div>
          </Grid>

          <Grid item xs={10} className="profile-item">
            <div>{profile?.nickname}</div>
          </Grid>
          <Grid item xs={2} className="profile-item">
            <Avatar src={profile?.picture} alt={profile?.nickname} />
          </Grid>

          <Grid item xs={12} spacing={1} className="profile-item">
            <div className="address-text">{profile?.sub}</div>
          </Grid>

          <Grid item xs={12} spacing={1} className="profile-item">
            <div>{fullName}</div>
          </Grid>

          <Grid item xs={12} spacing={1} className="profile-item">
            <div className="email-text">{profile?.email} {profile?.email_verified
              ? <Tooltip title="Email verified">
                <CheckCircle />
              </Tooltip>
              : <Tooltip title="Email not verified">
                <Warning />
              </Tooltip> }</div>
          </Grid>
        </Grid>

        <Grid container xs={4} />
      </Grid>
    </div>
  )
}
