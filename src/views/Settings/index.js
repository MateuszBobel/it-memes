import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import AvaratSettingsForm from '../../components/AvatarSettingsForm';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import ProfileInfoForm from '../../components/ProfileInfoForm';
import RemoveProfileForm from '../../components/RemoveProfileForm';

export default function Settings() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  return (
    <Box
      sx={{
        width: matches ? '50%' : '100%',
      }}
    >
      <ProfileInfoForm />
      <Divider />
      <AvaratSettingsForm />
      <Divider />
      <ChangePasswordForm />
      <Divider />
      <RemoveProfileForm />
    </Box>
  );
}
