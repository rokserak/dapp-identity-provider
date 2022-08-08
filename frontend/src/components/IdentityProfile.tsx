import React, { useEffect, useState } from "react";
import { useIdentityProvider } from "../hooks";
import { BigNumber } from "ethers";
import { Avatar, Box, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import { AccountBox, Email, Badge, Code, Edit } from "@mui/icons-material";
import { toTitleCase } from "../helpers";

interface Props {
  onEditClicked: () => void
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

export const IdentityProfile: React.FC<Props> = (props: Props) => {
  const identityProvider = useIdentityProvider()
  const [profile, setProfile] = useState<IProfile>()
  const [fullName, setFullName] = useState<string>("")

  useEffect(() => {
    identityProvider?.get_user_info()
      .then(info => setProfile(info))
      .catch(error => console.log(error))
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
    <Card variant="outlined">
      <CardHeader title="Your Ethereum Profile" action={<IconButton onClick={props.onEditClicked}>
        <Edit />
      </IconButton>} />

      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", paddingY: 0.5 }}>
          <Code style={{ paddingRight: 5 }} />
          <Typography>{profile?.sub}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", paddingY: 0.5 }}>
          <Avatar src={profile?.picture} sx={{ width: 500, height: 500 }} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", paddingY: 0.5 }}>
          <Badge style={{ paddingRight: 5 }} />
          <Typography>{profile?.nickname}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", paddingY: 0.5 }}>
          <AccountBox style={{ paddingRight: 5 }} />
          <Typography>{fullName}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", paddingY: 0.5 }}>
          <Email style={{ paddingRight: 5 }} />
          <Typography>{profile?.email}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
