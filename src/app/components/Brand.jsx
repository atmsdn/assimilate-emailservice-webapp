import { Box, Typography, styled } from '@mui/material';
import useSettings from '../../app/hooks/useSettings';
import "../../app/styles/sidebar.scss"

const ContentBox = styled(Box)(() => ({
  marginLeft: "35px",
  marginTop: "20px",
  marginBottom: "10px",
  fontSize: "20px",
  fontWeight: 500
}));

const Brand = () => {
  const { settings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;

  return (
    <Box >
      <ContentBox mode={mode}>
        <Typography style={{fontSize:15,fontWeight:'bold',color:'blue'}}>
          Assimilate Email Service
        </Typography>
      </ContentBox>
    </Box>
  );
};

export default Brand;
